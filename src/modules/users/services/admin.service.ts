import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminProfile, AdminProfileDocument } from '../schemas/admin.schema';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminProfile.name)
    private adminModel: Model<AdminProfileDocument>,
  ) {}

  async findAll(): Promise<AdminProfile[]> {
    return this.adminModel.find().exec();
  }

  async create(createAdminDto: CreateAdminDto): Promise<AdminProfile> {
    const createdAdmin = new this.adminModel(createAdminDto);
    return createdAdmin.save();
  }

  async findById(id: string): Promise<AdminProfile | null> {
    return this.adminModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAdminDto: Partial<CreateAdminDto>,
  ): Promise<AdminProfile | null> {
    return this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<AdminProfile | null> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }

  async findByDepartment(department: string): Promise<AdminProfile[]> {
    return this.adminModel.find({ department }).exec();
  }
}
