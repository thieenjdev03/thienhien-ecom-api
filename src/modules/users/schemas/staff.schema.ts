import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffProfileDocument = StaffProfile & Document;

@Schema({ timestamps: true })
export class StaffProfile {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  department?: string;

  @Prop()
  position?: string;

  @Prop()
  employeeId?: string;

  @Prop()
  manager?: string; // Manager's name or ID

  @Prop()
  hireDate?: Date;

  @Prop({ default: 'full-time' })
  employmentType: string; // full-time, part-time, contract, intern

  @Prop()
  salary?: number;

  @Prop([String])
  skills: string[]; // Array of skills

  @Prop([String])
  certifications: string[]; // Array of certifications

  @Prop({ default: 0 })
  yearsOfExperience: number;

  @Prop()
  workLocation?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: {
      name: String,
      phone: String,
      relationship: String,
    },
    required: false,
  })
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };

  @Prop()
  notes?: string; // Internal notes about staff member
}

export const StaffProfileSchema = SchemaFactory.createForClass(StaffProfile);
