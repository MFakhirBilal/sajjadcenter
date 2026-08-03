import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sajjad_center';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000 // Timeout fast if no local MongoDB service running
    });
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Unable to connect to MongoDB daemon (${error.message}).`);
    console.warn(`[Backend Notice]: Running in fallback mode. Connect a live MongoDB or set MONGO_URI in .env for persistent DB.`);
  }
};
