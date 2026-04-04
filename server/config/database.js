import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/creators-platform';
    const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the application if database connection fails
  }
};

export default connectDB;
// database connection to MongoDB