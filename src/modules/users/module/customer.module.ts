import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerProfile,
  CustomerProfileSchema,
} from '../schemas/customer.schema';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerProfile.name, schema: CustomerProfileSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
