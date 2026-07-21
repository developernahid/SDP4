import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookedService',
        required: true,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    customerName: {
        type: String,
        trim: true,
    },
    customerEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        default: '',
    },
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
