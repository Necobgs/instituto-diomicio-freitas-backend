import { OmitType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class UserWithoutPassDto extends OmitType(User, ['password']) { }