import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T = any> {
  @ApiProperty({
    example: true,
    description: 'Trạng thái thành công hay thất bại',
  })
  success: boolean;

  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Thành công',
    description: 'Thông báo mô tả kết quả',
  })
  message: string;

  @ApiProperty({
    description: 'Dữ liệu trả về',
    required: false,
  })
  data?: T;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Thời gian response',
  })
  timestamp: string;

  constructor(data?: T, message?: string, statusCode: number = 200) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message || 'Thành công';
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}
