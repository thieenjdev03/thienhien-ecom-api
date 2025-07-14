import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminProfileDocument = AdminProfile & Document;

@Schema({ timestamps: true })
export class AdminProfile {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  department?: string;

  @Prop({ default: 'super_admin' })
  adminLevel: string; // super_admin, admin, moderator

  @Prop([String])
  permissions: string[]; // Array of permission strings

  @Prop()
  employeeId?: string;

  @Prop()
  accessLevel: number; // 1-10, 10 being highest access

  @Prop()
  lastLogin?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const AdminProfileSchema = SchemaFactory.createForClass(AdminProfile);
