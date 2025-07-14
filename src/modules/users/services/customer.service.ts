import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CustomerProfile,
  CustomerProfileDocument,
} from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export interface FindCustomersQuery {
  name?: string;
  loyaltyLevel?: string;
  company?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedCustomerResult {
  data: CustomerProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerProfile.name)
    private customerModel: Model<CustomerProfileDocument>,
  ) {}

  async findAll(
    query: FindCustomersQuery = {},
  ): Promise<PaginatedCustomerResult> {
    const {
      name,
      loyaltyLevel,
      company,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    // Build filter object
    const filter: Record<string, any> = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (loyaltyLevel) {
      filter.loyaltyLevel = loyaltyLevel;
    }
    if (company) {
      filter.company = { $regex: company, $options: 'i' };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute queries in parallel
    const [data, total] = await Promise.all([
      this.customerModel
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.customerModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerProfile> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findById(id: string): Promise<CustomerProfile | null> {
    return this.customerModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerProfile | null> {
    return this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CustomerProfile | null> {
    return this.customerModel.findByIdAndDelete(id).exec();
  }

  // Customer-specific methods
  async findByLoyaltyLevel(loyaltyLevel: string): Promise<CustomerProfile[]> {
    return this.customerModel.find({ loyaltyLevel }).exec();
  }

  async updateLoyaltyLevel(
    id: string,
    loyaltyLevel: string,
  ): Promise<CustomerProfile | null> {
    return this.customerModel
      .findByIdAndUpdate(id, { loyaltyLevel }, { new: true })
      .exec();
  }

  async updateOrderStats(
    id: string,
    orderAmount: number,
  ): Promise<CustomerProfile | null> {
    return this.customerModel
      .findByIdAndUpdate(
        id,
        {
          $inc: {
            totalOrders: 1,
            totalSpent: orderAmount,
          },
        },
        { new: true },
      )
      .exec();
  }

  async getTopCustomers(limit: number = 10): Promise<CustomerProfile[]> {
    return this.customerModel
      .find()
      .sort({ totalSpent: -1 })
      .limit(limit)
      .exec();
  }
}
