/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsString
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'rafa@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'rafa@example.com' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 'roles' })
  @IsArray()
  @IsString()
  @IsNotEmpty()
  roles: string[];

  @ApiProperty({ required: true, example: true })
  @IsBoolean()
  @IsNotEmpty()
  isLoading: boolean;

  @ApiProperty({ required: true, example: [{ value: '1', label: 'Option 1' }] })
  @IsArray()
  @IsNotEmpty()
  autoCompleteOptions: { value: string; label: string }[];
}
