import mongoose from 'mongoose';

let isConnected = false;

const DEFAULT_MONGO_URI = 'mongodb+srv://admin:sajjad%404445@cluster0.mongodb.net/sajjad_center?retryWrites=true&w=majority';

export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = !!conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Unable to connect to MongoDB (${error.message}). Running in fallback mode.`);
  }
};
