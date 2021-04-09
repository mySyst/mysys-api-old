import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Demand {
  _id?: string;
  title: string;
  describe: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// const schema = new mongoose.Schema<Demand>(
const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    describe: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
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
