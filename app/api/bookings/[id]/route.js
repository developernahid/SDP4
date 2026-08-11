import { BookedService } from '@/Model/BookedService';
import { Provider } from '@/Model/Provider';
import { Transaction } from '@/Model/Transaction';
import { Product } from '@/Model/Product';
import connect from '@/utils/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    await connect();
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
        return NextResponse.json({ message: 'Missing booking parameter' }, { status: 400 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const providerId = searchParams.get('providerId') || '';

        if (providerId) {
            const bookings = await BookedService.find({ providerId }).sort({ createdAt: -1 });
            return NextResponse.json(bookings, { status: 200 });
        }

        if (id.includes('@')) {
            const bookings = await BookedService.find({ email: id }).sort({ createdAt: -1 });
            return NextResponse.json(bookings, { status: 200 });
        }

        const booking = await BookedService.findById(id);
        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(booking, { status: 200 });
    } catch (err) {
        console.error('Failed to fetch bookings:', err);
        return NextResponse.json({ message: 'Failed to fetch bookings', error: err.message || String(err) }, { status: 500 });
    }
};

export const PUT = async (req, { params }) => {
    await connect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();

    try {
        const booking = await BookedService.findById(id);
        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        const previousStatus = booking.status;

        const updateData = { ...body };
        if (body.status) updateData.status = body.status;
        if (body.paymentStatus) updateData.paymentStatus = body.paymentStatus;
        // Fetch original service price instead of using request amount
        if (booking.service?.id) {
            const serviceId = booking.service.id;
            let product = null;
            if (mongoose.Types.ObjectId.isValid(serviceId)) {
                product = await Product.findById(serviceId).catch(() => null);
            } else {
                // fallback: try searching by SKU or other unique string fields
                product = await Product.findOne({ sku: serviceId }).catch(() => null);
            }

            if (product) {
                updateData.amount = product.price || product.originalPrice || 0;
            }
        }
        if (body.transactionId) updateData.transactionId = body.transactionId;
        if (body.customerId) updateData.customerId = body.customerId;
        if (body.providerId) updateData.providerId = body.providerId;
        if (body.providerName) updateData.providerName = body.providerName;
        if (body.review) updateData.review = body.review;
        if (body.rating) updateData.rating = body.rating;
        if (body.reviewed !== undefined) updateData.reviewed = body.reviewed;

        Object.assign(booking, updateData);

        const shouldCreateTransaction = booking.paymentStatus === 'Paid' && booking.providerId && !booking.transactionId;
        if (shouldCreateTransaction) {
            const provider = await Provider.findById(booking.providerId);
            if (provider) {
                const amount = Number(booking.amount || 0);
                const providerAmount = Number(amount.toFixed(2));

                provider.walletBalance = Number(provider.walletBalance || 0) + providerAmount;
                await provider.save();

                const adminCommission = Number((amount - providerAmount).toFixed(2)) || 0;
                const transaction = await Transaction.create({
                    bookingId: booking._id,
                    providerId: provider._id,
                    customerEmail: booking.email,
                    amount,
                    providerAmount,
                    adminCommission,
                    paymentMethod: 'Cash Wallet',
                    status: 'Completed',
                    description: `Payment for ${booking.service?.title || 'service'}`,
                });

                booking.transactionId = transaction._id.toString();
                booking.providerAmount = providerAmount;
                booking.adminCommission = adminCommission;
                booking.paidAt = new Date();
            }
        }

        if (body.status === 'Completed' && booking.providerId && previousStatus !== 'Completed') {
            const provider = await Provider.findById(booking.providerId);
            if (provider) {
                provider.completedJobs = (provider.completedJobs || 0) + 1;
                await provider.save();
            }
        }

        await booking.save();
        return NextResponse.json(booking, { status: 200 });
    } catch (err) {
        console.error('Failed to update booking:', err);
        return NextResponse.json({ message: 'Failed to update booking', error: err.message || String(err) }, { status: 500 });
    }
};
