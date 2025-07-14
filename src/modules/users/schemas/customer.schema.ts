import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerProfileDocument = CustomerProfile & Document;

@Schema({ timestamps: true })
export class CustomerProfile {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  company?: string;

  @Prop({ default: 'bronze' })
  loyaltyLevel: string; // bronze, silver, gold, platinum

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop({ default: 0 })
  totalSpent: number;

  @Prop()
  preferredPaymentMethod?: string;

  @Prop([String])
  interests: string[]; // Array of interest categories

  @Prop({ default: true })
  emailSubscription: boolean;

  @Prop({ default: true })
  smsSubscription: boolean;

  @Prop()
  notes?: string; // Internal notes about customer
}

export const CustomerProfileSchema =
  SchemaFactory.createForClass(CustomerProfile);
