import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Role } from '../../roles/models/role.model';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret.password;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true, type: Boolean, default: false })
  active: boolean;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false, default: '', type: String })
  @Exclude()
  password: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: Role.name,
  })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
