import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, 'User ID is required'],
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    viewPreference: {
        type: String, 
        required: false,
        default: 'week' // Default view preference
    }
});

const User = mongoose.model('User', userSchema);
export default User;
