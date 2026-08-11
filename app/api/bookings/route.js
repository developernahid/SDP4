import { BookedService } from '@/Model/BookedService';
import { Provider } from '@/Model/Provider';
import { Transaction } from '@/Model/Transaction';
import { Product } from '@/Model/Product';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { withAuth } from '@/middleware/withAuth';

export const POST = withAuth(async (req) => {
    try {
        await connect();
        const data = await req.json();
        const user = req.user;

        let serviceObj = {
            id: data.serviceId || 'service',
            title: data.serviceTitle || 'Service',
            description: data.description || 'Home service booking',
            image: data.image || 'https://placehold.co/600x400',
            price: data.price || 0,
        };

        // If a serviceId is provided and looks like an ObjectId, try to populate from Product
        if (data.serviceId) {
            if (mongoose.Types.ObjectId.isValid(data.serviceId)) {
                const prod = await Product.findById(data.serviceId).catch(() => null);
                if (prod) {
                    serviceObj = {
                        id: prod._id.toString(),
                        title: prod.name || data.serviceTitle || 'Service',
                        description: prod.description || data.description || 'Home service booking',
                        image: (prod.images && prod.images[0] && prod.images[0].url) || data.image || 'https://placehold.co/600x400',
                        price: prod.price || data.price || 0,
                    };
                }
            } else {
                // keep provided id as-is (e.g., numeric or SKU)
                serviceObj.id = data.serviceId;
            }
        }

        const bookingPayload = {
            service: data.service || serviceObj,
            name: user?.username || data.name || data.customerName || '',
            email: user?.email || data.email || data.customerEmail || '',
            customerId: user?._id?.toString() || data.customerId || '',
            location: data.location || '',
            contact: data.contact || '',
            comment: data.comment || '',
            providerId: data.providerId || '',
            providerName: data.providerName || '',
            category: data.category || '',
            serviceDate: data.serviceDate || '',
            serviceTime: data.serviceTime || '',
            amount: data.amount || data.service?.price || serviceObj.price || data.price || 0,
            paymentStatus: data.paymentStatus || 'Pending',
            status: data.status || 'Pending',
            transactionId: data.transactionId || '',
        };

        const booking = await BookedService.create(bookingPayload);
        return NextResponse.json({ message: 'success', booking }, { status: 201 });
    } catch (err) {
        console.error('Failed to create booking:', err);
        return NextResponse.json({ message: 'Booking failed', error: err.message || err }, { status: 500 });
    }
});

export const GET = async (req) => {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const providerId = searchParams.get('providerId') || '';
        const customerEmail = searchParams.get('customerEmail') || '';

        const query = {};
        if (providerId) query.providerId = providerId;
        if (customerEmail) query.email = customerEmail;

        const bookings = await BookedService.find(query).sort({ createdAt: -1 });
        return NextResponse.json(bookings, { status: 200 });
    } catch (err) {
        console.error('Failed to fetch bookings:', err);
        return NextResponse.json({ message: 'Failed to fetch bookings', error: err.message || String(err) }, { status: 500 });
    }
};
