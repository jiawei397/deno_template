import { IsString } from "../../../deps.ts";

export class AddUserDto {
  @IsString()
  username!: string;

  @IsString()
  email!: string;
}

export class UpdateUserDto {
  @IsString()
  username!: string;

  @IsString()
  email!: string;


  @IsString()
  id!: string;
}
