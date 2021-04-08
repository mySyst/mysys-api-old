import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Demand {
  userId: string;
  title: string;
  describe: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: string;
}

// const schema = new mongoose.Schema<Demand>(
const schema = new mongoose.Schema(
  {
    title: { type: String },
    describe: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface DemandsModel extends Omit<Demand, '_id'>, Document {}
export const Demand: Model<DemandsModel> = mongoose.model('Demand', schema);
