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
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UsersService, FindUsersQuery, PaginatedResult } from './users.service';
import { User } from './user.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { buildResponse, ResponseHelper } from '../../common/utils/response';
import { ApiMessage } from '../../common/constants/api-messages';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Return paginated users.',
    type: BaseResponseDto<PaginatedResult<User>>,
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter by email (partial match)',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['admin', 'customer', 'staff'],
    description: 'Filter by role',
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
    @Query('email') email?: string,
    @Query('role') role?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    const query: FindUsersQuery = {
      email,
      role,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy,
      sortOrder,
    };
    const result = await this.usersService.findAll(query);
    return ResponseHelper.list(result, ApiMessage.USER_LIST_SUCCESS);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a user.',
    type: BaseResponseDto<User>,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(ApiMessage.USER_NOT_FOUND);
    }
    return ResponseHelper.detail(user, ApiMessage.USER_DETAIL_SUCCESS);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: BaseResponseDto<User>,
  })
  @ApiResponse({ status: 400, description: 'Invalid user data.' })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      if (!user) {
        throw new HttpException(
          'Failed to create user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return ResponseHelper.created(user, ApiMessage.USER_CREATED);
    } catch (error: any) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new HttpException(
          ApiMessage.EMAIL_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: BaseResponseDto<User>,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid user data.' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(ApiMessage.USER_NOT_FOUND);
    }
    return ResponseHelper.updated(user, ApiMessage.USER_UPDATED);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: BaseResponseDto<User>,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    if (!user) {
      throw new NotFoundException(ApiMessage.USER_NOT_FOUND);
    }
    return ResponseHelper.deleted(user, ApiMessage.USER_DELETED);
  }

  // Additional endpoints
  @Get('search/email/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find user by email' })
  @ApiResponse({
    status: 200,
    description: 'Return user by email.',
    type: BaseResponseDto<User>,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ApiMessage.USER_NOT_FOUND);
    }
    return buildResponse(user, 'Tìm người dùng theo email thành công');
  }

  @Get('filter/role/:role')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find users by role' })
  @ApiResponse({
    status: 200,
    description: 'Return users by role.',
    type: BaseResponseDto<User[]>,
  })
  async findByRole(@Param('role') role: string) {
    const users = await this.usersService.findByRole(role);
    return buildResponse(
      users,
      'Lấy danh sách người dùng theo vai trò thành công',
    );
  }
}
