import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Role {
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  _id: string;

  @Prop({ unique: true, required: true })
  @IsString()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
