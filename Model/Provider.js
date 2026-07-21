import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    nidNumber: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    serviceCategory: {
        type: String,
        trim: true,
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
    },
    skills: {
        type: [String],
        default: [],
    },
    aboutMe: {
        type: String,
        default: '',
    },
    availableDays: {
        type: [String],
        default: [],
    },
    availableTime: {
        type: String,
        default: '',
    },
    startingPrice: {
        type: Number,
        default: 0,
    },
    portfolioImages: {
        type: [String],
        default: [],
    },
    serviceDetails: {
        type: [String],
        default: [],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isSuspended: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    completedJobs: {
        type: Number,
        default: 0,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'suspended'],
        default: 'pending',
    },
}, { timestamps: true });

export const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
