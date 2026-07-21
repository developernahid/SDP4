import { BookedService } from '@/Model/BookedService';
import { Provider } from '@/Model/Provider';
import { Transaction } from '@/Model/Transaction';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        await connect();
        const data = await req.json();

        const bookingPayload = {
            service: data.service || {
                id: data.serviceId || 'service',
                title: data.serviceTitle || 'Service',
                description: data.description || 'Home service booking',
                image: data.image || 'https://placehold.co/600x400',
            },
            name: data.name || data.customerName || '',
            email: data.email || data.customerEmail || '',
            location: data.location || '',
            contact: data.contact || '',
            comment: data.comment || '',
            providerId: data.providerId || '',
            providerName: data.providerName || '',
            category: data.category || '',
            serviceDate: data.serviceDate || '',
            serviceTime: data.serviceTime || '',
            amount: data.amount || 0,
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
};

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
