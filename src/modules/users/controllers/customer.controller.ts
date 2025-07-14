import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CustomerService,
  FindCustomersQuery,
  PaginatedCustomerResult,
} from '../services/customer.service';
import { CustomerProfile } from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ResponseHelper } from '../../../common/utils/response';
import { BaseResponseDto } from '../../../common/dto/base-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all customers with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Return paginated customers.',
    type: BaseResponseDto<PaginatedCustomerResult>,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by name (partial match)',
  })
  @ApiQuery({
    name: 'loyaltyLevel',
    required: false,
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    description: 'Filter by loyalty level',
  })
  @ApiQuery({
    name: 'company',
    required: false,
    description: 'Filter by company (partial match)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by field (default: createdAt)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order (default: desc)',
  })
  async findAll(
    @Query('name') name?: string,
    @Query('loyaltyLevel') loyaltyLevel?: string,
    @Query('company') company?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    const query: FindCustomersQuery = {
      name,
      loyaltyLevel,
      company,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy,
      sortOrder,
    };
    const result = await this.customerService.findAll(query);
    return ResponseHelper.list(result, 'Lấy danh sách khách hàng thành công');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a customer.',
    type: BaseResponseDto<CustomerProfile>,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.findById(id);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng');
    }
    return ResponseHelper.detail(
      customer,
      'Lấy thông tin khách hàng thành công',
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
    type: BaseResponseDto<CustomerProfile>,
  })
  @ApiResponse({ status: 400, description: 'Invalid customer data.' })
  @ApiBody({ type: CreateCustomerDto })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);
    return ResponseHelper.created(customer, 'Tạo khách hàng thành công');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully updated.',
    type: BaseResponseDto<CustomerProfile>,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @ApiResponse({ status: 400, description: 'Invalid customer data.' })
  @ApiBody({ type: UpdateCustomerDto })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customerService.update(id, updateCustomerDto);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng');
    }
    return ResponseHelper.updated(customer, 'Cập nhật khách hàng thành công');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully deleted.',
    type: BaseResponseDto<CustomerProfile>,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async remove(@Param('id') id: string) {
    const customer = await this.customerService.delete(id);
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng');
    }
    return ResponseHelper.deleted(customer, 'Xóa khách hàng thành công');
  }

  // Customer-specific endpoints
  @Get('loyalty/:level')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get customers by loyalty level' })
  @ApiResponse({
    status: 200,
    description: 'Return customers by loyalty level.',
    type: BaseResponseDto<CustomerProfile[]>,
  })
  async findByLoyaltyLevel(@Param('level') level: string) {
    const customers = await this.customerService.findByLoyaltyLevel(level);
    return ResponseHelper.list(
      customers,
      `Lấy danh sách khách hàng ${level} thành công`,
    );
  }

  @Put(':id/loyalty')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update customer loyalty level' })
  @ApiResponse({
    status: 200,
    description: 'Customer loyalty level updated successfully.',
    type: BaseResponseDto<CustomerProfile>,
  })
  async updateLoyaltyLevel(
    @Param('id') id: string,
    @Body('loyaltyLevel') loyaltyLevel: string,
  ) {
    const customer = await this.customerService.updateLoyaltyLevel(
      id,
      loyaltyLevel,
    );
    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng');
    }
    return ResponseHelper.updated(
      customer,
      'Cập nhật hạng khách hàng thành công',
    );
  }

  @Get('analytics/top')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get top customers by spending' })
  @ApiResponse({
    status: 200,
    description: 'Return top customers.',
    type: BaseResponseDto<CustomerProfile[]>,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of top customers (default: 10)',
  })
  async getTopCustomers(@Query('limit') limit?: number) {
    const customers = await this.customerService.getTopCustomers(
      limit ? Number(limit) : 10,
    );
    return ResponseHelper.list(
      customers,
      'Lấy danh sách khách hàng VIP thành công',
    );
  }
}
