import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { capitalizeEachWord } from '../../utils/capitalize-earch-word';
import { updateListById } from '../../utils/update-list';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entities/permission.entity';


@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository:RoleRepository,
    private readonly permissionService:PermissionService){}

  async create(dto: CreateRoleDto) {
    const name  = capitalizeEachWord(dto.name)
    const permissions: Permission[] = []

    const exists = await this.roleRepository.existsBy({name});
    if(exists) throw new BadRequestException(`O cargo '${name}' já existe`)

    await Promise.all(dto.permissions.map(async id =>{
      const permission = await this.permissionService.findOne(id);
      if(!permission) throw new BadRequestException('Uma das permissões não foram encontradas')
      permissions.push(permission)
    }))

    const role = this.roleRepository.create({name,permissions});
  
    return await this.roleRepository.save(role);
  }

  async findAll(filter:FilterDto) {
    return await this.roleRepository.filterAll(filter);
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where:{},
      relations:['permissions']
    });
    if(!role) throw new BadRequestException(`Cargo de id '${id}' não encontrado`)
    return role;
  }

  async exists(name){
    return await this.roleRepository.existsBy({name})
  }

  async update(id: number, dto: UpdateRoleDto) {
    
    const role = await this.findOne(id);
    

    if(dto.name && dto.name !== role.name){
      const name = capitalizeEachWord(dto.name)
      if (await this.exists(name)) throw new BadRequestException(`O cargo '${name}' já existe`)
        role.name = name;
    }

    if(dto.permissions && dto.permissions.length >= 0){
      role.permissions = await updateListById(role.permissions,dto.permissions,this.permissionService.findOne)
    }

    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return await this.roleRepository.softRemove(role);
  }
}
