import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface FindUsersQuery {
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(query: FindUsersQuery = {}): Promise<PaginatedResult<User>> {
    const {
      email,
      role,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    // Build filter object
    const filter: Record<string, any> = {};
    if (email) {
      filter.email = { $regex: email, $options: 'i' }; // Case insensitive search
    }
    if (role) {
      filter.role = role;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute queries in parallel
    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .populate('profile')
        .select('-password') // Exclude password from results
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();
    return this.userModel
      .findById(savedUser._id)
      .populate('profile')
      .select('-password')
      .exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel
      .findById(id)
      .populate('profile')
      .select('-password')
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('profile')
      .select('-password')
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  // Additional helper methods
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).populate('profile').exec();
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel
      .find({ role })
      .populate('profile')
      .select('-password')
      .exec();
  }
}
