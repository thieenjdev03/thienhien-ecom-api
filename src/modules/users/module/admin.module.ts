import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminProfile, AdminProfileSchema } from '../schemas/admin.schema';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminProfile.name, schema: AdminProfileSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
