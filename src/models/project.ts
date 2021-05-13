import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Project {
  _id?: string;
  title: string;
  describe?: string;
  detail?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    describe: { type: String },
    detail: { type: String },
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

interface ProjectsModel extends Omit<Project, '_id'>, Document {}
export const Project: Model<ProjectsModel> = mongoose.model('Project', schema);
