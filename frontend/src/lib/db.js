let mongoose = null;

try {
  mongoose = require('mongoose');
} catch (e) {
  try {
    mongoose = require('../../../backend/node_modules/mongoose');
  } catch (err) {
    mongoose = null;
  }
}

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:sajjad%404445@cluster0.mongodb.net/sajjad_center?retryWrites=true&w=majority';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!mongoose) {
    console.log('Mongoose ODM fallback active');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB Connected in Serverless API');
      return mongooseInstance;
    }).catch(err => {
      console.error('MongoDB Connection Error:', err.message);
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export { mongoose };
