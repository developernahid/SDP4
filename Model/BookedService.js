import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { _id: false });

const bookedServiceSchema = new mongoose.Schema({
    service: {
        type: serviceSchema,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    location: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    customerId: {
        type: String,
        default: ''
    },
    providerId: {
        type: String,
        default: ''
    },
    providerName: {
        type: String,
        trim: true,
        default: ''
    },
    category: {
        type: String,
        trim: true,
        default: ''
    },
    serviceDate: {
        type: String,
        default: ''
    },
    serviceTime: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        trim: true,
        default: 'Pending',
        enum: ['Pending', 'Paid', 'Failed']
    },
    transactionId: {
        type: String,
        default: ''
    },
    adminCommission: {
        type: Number,
        default: 0,
    },
    providerAmount: {
        type: Number,
        default: 0,
    },
    paidAt: {
        type: Date,
        default: null
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ''
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        trim: true,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected', 'Completed']
    }
}, { timestamps: true });

export const BookedService = mongoose.models.BookedService || mongoose.model('BookedService', bookedServiceSchema);
