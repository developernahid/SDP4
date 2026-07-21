import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipientEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    senderEmail: {
        type: String,
        trim: true,
        lowercase: true,
        default: '',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    bookingId: {
        type: String,
        default: '',
    },
    providerId: {
        type: String,
        default: '',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
