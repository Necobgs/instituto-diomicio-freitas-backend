import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


@Exclude()
export class PermissionDto{

    @ApiProperty({ description: 'Recurso da permissão' })
    @Expose()
    resource:string;

    @ApiProperty({ enum: ['create', 'read', 'update', 'delete'], description: 'Ação da permissão' })
    @Expose()
    action: 'create' | 'read' | 'update' | 'delete';

}