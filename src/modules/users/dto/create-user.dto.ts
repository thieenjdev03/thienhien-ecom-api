import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'customer',
    enum: ['admin', 'customer', 'staff'],
  })
  @IsEnum(['admin', 'customer', 'staff'])
  role: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsOptional()
  profile?: Types.ObjectId;
}
