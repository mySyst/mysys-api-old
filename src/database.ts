require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// import config, { IConfig } from 'config';
import mongoose, { Mongoose } from 'mongoose';

// const dbConfig: IConfig = config.get('App.database');
// const mongoDB: string | undefined = process.env.MONGODB_URL || ''

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`${process.env.MONGO_URL}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

export const close = (): Promise<void> => mongoose.connection.close();
