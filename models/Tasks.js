import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    urgency: {
        type: Number,
        required: [true, 'Urgency is required.']
    },
    createdBy: {
        type: String,
        required: [true, 'userID is required']
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;