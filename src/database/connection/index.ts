import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_DB_URI } = process.env;

const connectToDatabase = () =>
  mongoose.connect(MONGO_DB_URI as string);

export default connectToDatabase;
