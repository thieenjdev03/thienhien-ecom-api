import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffProfile, StaffProfileDocument } from '../schemas/staff.schema';
import { CreateStaffDto } from '../dto/create-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(StaffProfile.name)
    private staffModel: Model<StaffProfileDocument>,
  ) {}

  async findAll(): Promise<StaffProfile[]> {
    return this.staffModel.find().exec();
  }

  async create(createStaffDto: CreateStaffDto): Promise<StaffProfile> {
    const createdStaff = new this.staffModel(createStaffDto);
    return createdStaff.save();
  }

  async findById(id: string): Promise<StaffProfile | null> {
    return this.staffModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStaffDto: Partial<CreateStaffDto>,
  ): Promise<StaffProfile | null> {
    return this.staffModel
      .findByIdAndUpdate(id, updateStaffDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<StaffProfile | null> {
    return this.staffModel.findByIdAndDelete(id).exec();
  }

  async findByDepartment(department: string): Promise<StaffProfile[]> {
    return this.staffModel.find({ department }).exec();
  }
}
