import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log('mongodb database is connected');
  } catch (err) {
    res.send('fail to connect');
  }
};
export default connectDB;
