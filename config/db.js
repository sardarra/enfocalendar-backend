import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use the MONGO_URI from environment variables for better security
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Test the connection
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}