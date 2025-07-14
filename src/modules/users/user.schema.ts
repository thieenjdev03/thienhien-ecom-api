import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'customer', 'staff'],
    index: true,
  })
  role: string;

  @Prop({
    type: Types.ObjectId,
    refPath: 'profileModel',
    required: false,
  })
  profile: Types.ObjectId;

  // Virtual field to determine which model to populate based on role
  @Prop({
    type: String,
    default: function () {
      switch (this.role) {
        case 'admin':
          return 'AdminProfile';
        case 'customer':
          return 'CustomerProfile';
        case 'staff':
          return 'StaffProfile';
        default:
          return 'CustomerProfile';
      }
    },
  })
  profileModel: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add a pre-save middleware to set profileModel based on role
UserSchema.pre('save', function (next) {
  if (this.role) {
    switch (this.role) {
      case 'admin':
        this.profileModel = 'AdminProfile';
        break;
      case 'customer':
        this.profileModel = 'CustomerProfile';
        break;
      case 'staff':
        this.profileModel = 'StaffProfile';
        break;
      default:
        this.profileModel = 'CustomerProfile';
    }
  }
  next();
});
