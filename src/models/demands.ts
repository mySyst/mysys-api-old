import mongoose, { Document, Model } from 'mongoose';

export interface Demand {
  _id?: string;
  title: string;
  describe: string;
}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    describe: { type: String, required: true },
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
export const Demands: Model<DemandsModel> = mongoose.model('Demand', schema);
