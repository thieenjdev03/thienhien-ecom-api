import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { AdminProfile } from '../schemas/admin.schema';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { ResponseHelper } from '../../../common/utils/response';
import { BaseResponseDto } from '../../../common/dto/base-response.dto';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'Return all admins.',
    type: BaseResponseDto<AdminProfile[]>,
  })
  async findAll() {
    const admins = await this.adminService.findAll();
    return ResponseHelper.list(admins, 'Lấy danh sách admin thành công');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an admin.',
    type: BaseResponseDto<AdminProfile>,
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findById(id);
    if (!admin) {
      throw new NotFoundException('Không tìm thấy admin');
    }
    return ResponseHelper.detail(admin, 'Lấy thông tin admin thành công');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: BaseResponseDto<AdminProfile>,
  })
  @ApiResponse({ status: 400, description: 'Invalid admin data.' })
  @ApiBody({ type: CreateAdminDto })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.create(createAdminDto);
    return ResponseHelper.created(admin, 'Tạo admin thành công');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an admin' })
  @ApiResponse({
    status: 200,
    description: 'The admin has been successfully updated.',
    type: BaseResponseDto<AdminProfile>,
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBody({ type: CreateAdminDto })
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: Partial<CreateAdminDto>,
  ) {
    const admin = await this.adminService.update(id, updateAdminDto);
    if (!admin) {
      throw new NotFoundException('Không tìm thấy admin');
    }
    return ResponseHelper.updated(admin, 'Cập nhật admin thành công');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({
    status: 200,
    description: 'The admin has been successfully deleted.',
    type: BaseResponseDto<AdminProfile>,
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  async remove(@Param('id') id: string) {
    const admin = await this.adminService.delete(id);
    if (!admin) {
      throw new NotFoundException('Không tìm thấy admin');
    }
    return ResponseHelper.deleted(admin, 'Xóa admin thành công');
  }
}
