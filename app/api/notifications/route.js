import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { Notification } from '@/Model/Notification';

export const GET = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || '';

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const notifications = await Notification.find({ recipientEmail: email.toLowerCase() }).sort({ createdAt: -1 });
        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch notifications', error: error.message }, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connect();
        const body = await request.json();
        const notification = await Notification.create(body);
        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create notification', error: error.message }, { status: 500 });
    }
};

export const PUT = async (request) => {
    try {
        await connect();
        const { id, isRead } = await request.json();
        if (!id) {
            return NextResponse.json({ message: 'Notification id is required' }, { status: 400 });
        }
        const updated = await Notification.findByIdAndUpdate(id, { isRead }, { new: true });
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update notification', error: error.message }, { status: 500 });
    }
};
