import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().replace(/ /g, ''))
  name: string;
}
