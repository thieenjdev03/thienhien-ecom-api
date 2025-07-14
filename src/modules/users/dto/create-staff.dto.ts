import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'Nguyễn Văn Staff' })
  @IsString()
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Sales Department', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 'Sales Executive', required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ example: 'EMP002', required: false })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiProperty({ example: 'Manager Name', required: false })
  @IsOptional()
  @IsString()
  manager?: string;

  @ApiProperty({ example: '2023-01-01', required: false })
  @IsOptional()
  @IsDateString()
  hireDate?: string;

  @ApiProperty({
    example: 'full-time',
    enum: ['full-time', 'part-time', 'contract', 'intern'],
    required: false,
  })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({ example: ['sales', 'customer_service'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @ApiProperty({ example: 'Office A', required: false })
  @IsOptional()
  @IsString()
  workLocation?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
