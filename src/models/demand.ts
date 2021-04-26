import mongoose, { Document, Model, Schema } from 'mongoose';

export enum Clarify {
  none = '',
  incubation = 'incubation',
  reference = 'reference',
  fast = 'fast',
  delegate = 'delegate',
  calendar = 'calendar',
  context = 'context',
}

export enum Context {
  none = '',
  house = 'house',
  road  = 'road',
  smartphone = 'smartphone',
  computer = 'computer',
  desk = 'desk',
  any = 'any',
}

export interface Demand {
  _id?: string;
  title: string;
  describe?: string;
  detail?: string;
  trash: boolean;
  classification: Clarify;
  delegate: string;
  date: Date;
  context: Context;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// const schema = new mongoose.Schema<Demand>(
const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    describe: { type: String },
    detail: {type: String},
    trash: Boolean,
    classification: {type: String},
    delegate: {type: String},
    date: {type: String},
    context: {type: String},
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
