import { Transform } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";


export class CreateRoleDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsArray()
    @IsInt({each:true})
    @IsPositive({each:true})
    @ArrayNotEmpty()
    @Transform(({ value }) => Array.from(new Set(value)))
    @ArrayUnique()
    permissions: number[]

}