import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Nguyễn Văn Admin' })
  @IsString()
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'IT Department', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'super_admin',
    enum: ['super_admin', 'admin', 'moderator'],
    required: false,
  })
  @IsOptional()
  @IsString()
  adminLevel?: string;

  @ApiProperty({
    example: ['user_management', 'order_management'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiProperty({ example: 'EMP001', required: false })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  accessLevel?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
