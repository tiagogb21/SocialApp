import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_DB_URL } = process.env;

const connectToDatabase = (mongoDatabaseURI = MONGO_DB_URL as string) =>
  mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
