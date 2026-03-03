import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Criar role' })
  @ApiOkResponse({ type: RoleDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos, nome de cargo já existe ou permissão não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  @ApiOkResponse({ type: [RoleDto] })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  findAll(@Query() filter: FilterDto) {
    return this.roleService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar role por ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: RoleDto })
  @ApiBadRequestResponse({ description: 'Cargo não encontrado para o ID informado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar role' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: RoleDto })
  @ApiBadRequestResponse({ description: 'Cargo não encontrado, dados inválidos ou nome já em uso' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover role' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Role removida com sucesso' })
  @ApiBadRequestResponse({ description: 'Cargo não encontrado para o ID informado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
