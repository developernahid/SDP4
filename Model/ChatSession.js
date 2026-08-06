import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'assistant', 'system'],
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });

const chatSessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    messages: {
        type: [chatMessageSchema],
        default: [],
    },
}, { timestamps: true });

export const ChatSession = mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema);
