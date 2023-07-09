import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Mongo_URI missing');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.log('Unexpected error', err);
    }
    process.exit(1);
  }
};

export default connectDb;
