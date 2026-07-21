import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { User } from '@/Model/User';
import connect from '@/utils/db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-change-me');

export const GET = async () => {
    await connect();
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('session_token');

    if (!tokenCookie) {
        return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
    }

    const token = tokenCookie.value;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Normalize userId in case JWT contains a binary/Object form
        let userId = payload.userId;
        if (userId && typeof userId === 'object') {
            if (userId.buffer) {
                const vals = Object.keys(userId.buffer).map((k) => Number(userId.buffer[k]));
                userId = Buffer.from(vals).toString('hex');
            } else if (userId.id && userId.id.buffer) {
                const vals = Object.keys(userId.id.buffer).map((k) => Number(userId.id.buffer[k]));
                userId = Buffer.from(vals).toString('hex');
            } else if (typeof userId.toString === 'function') {
                userId = userId.toString();
            } else {
                userId = JSON.stringify(userId);
            }
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token', error: error.message }, { status: 401 });
    }
};

export const PUT = async (req) => {
    await connect();
    const { email, username, photoURL } = await req.json();

    const query = {
        email: email
    }
    console.log(photoURL)

    try {
        const updatedUser = await User.findOneAndUpdate(query, { username, photoURL }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
    }
}
