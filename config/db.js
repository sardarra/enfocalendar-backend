import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Key: mongodb+srv://sardarrah:T24i221N@calendar.x4ubwof.mongodb.net/calendar?retryWrites=true&w=majority&appName=calendar
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://sardarrah:T24i221N@calendar.x4ubwof.mongodb.net/calendar?retryWrites=true&w=majority&appName=calendar");
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Test the connection
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}