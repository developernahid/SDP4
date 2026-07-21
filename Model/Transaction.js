import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
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
    customerEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    providerAmount: {
        type: Number,
        required: true,
    },
    adminCommission: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        default: 'Demo Wallet',
    },
    status: {
        type: String,
        default: 'Completed',
        enum: ['Pending', 'Completed', 'Failed'],
    },
    description: {
        type: String,
        default: 'Demo payment for booked service',
    },
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
