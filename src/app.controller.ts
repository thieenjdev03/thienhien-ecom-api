import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { buildResponse } from './common/utils/response';
import { BaseResponseDto } from './common/dto/base-response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application is running',
    type: BaseResponseDto<string>,
  })
  getHello() {
    const message = this.appService.getHello();
    return buildResponse(message, 'Ứng dụng đang hoạt động');
  }
}
