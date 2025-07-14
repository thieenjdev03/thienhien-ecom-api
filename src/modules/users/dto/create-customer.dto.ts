import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '123 Đường ABC, Quận 1, TP.HCM', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: 'Công ty XYZ', required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    example: 'bronze',
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    required: false,
  })
  @IsOptional()
  @IsString()
  loyaltyLevel?: string;

  @ApiProperty({ example: 'credit_card', required: false })
  @IsOptional()
  @IsString()
  preferredPaymentMethod?: string;

  @ApiProperty({ example: ['technology', 'sports'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  emailSubscription?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  smsSubscription?: boolean;

  @ApiProperty({ example: 'VIP customer', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
