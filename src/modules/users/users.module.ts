import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// Import role modules
import { AdminModule } from './module/admin.module';
import { CustomerModule } from './module/customer.module';
import { StaffModule } from './module/staff.module';

// Import role schemas
import { AdminProfile, AdminProfileSchema } from './schemas/admin.schema';
import {
  CustomerProfile,
  CustomerProfileSchema,
} from './schemas/customer.schema';
import { StaffProfile, StaffProfileSchema } from './schemas/staff.schema';

@Module({
  imports: [
    // Register User schema with Mongoose
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AdminProfile.name, schema: AdminProfileSchema },
      { name: CustomerProfile.name, schema: CustomerProfileSchema },
      { name: StaffProfile.name, schema: StaffProfileSchema },
    ]),

    // Import role-specific modules
    AdminModule,
    CustomerModule,
    StaffModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
