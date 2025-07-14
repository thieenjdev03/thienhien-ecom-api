import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffProfile, StaffProfileSchema } from '../schemas/staff.schema';
import { StaffService } from '../services/staff.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StaffProfile.name, schema: StaffProfileSchema },
    ]),
  ],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
