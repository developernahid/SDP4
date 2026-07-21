import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'vendor', 'provider'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    photoURL: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
    },
    businessName: {
        type: String,
    },
    businessAddress: {
        type: String,
    },
    serviceType: {
        type: String,
    },
    experience: {
        type: String,
    },
    serviceArea: {
        type: String,
    },
    workingHoursStart: {
        type: String,
    },
    workingHoursEnd: {
        type: String,
    },
    receiveOrderType: {
        type: String,
    },
    documents: {
        type: [String],
    },
    ownerName: {
        type: String,
    },
    nicNumber: {
        type: String,
    },
    nicExpiryDate: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    pricingMethod: {
        type: String,
    },
    hourlyFee: {
        type: String,
    },
    flatFee: {
        type: String,
    },
    additionalInfo: {
        type: String,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
