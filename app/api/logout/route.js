
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async () => {
    try {
        // Clear the session cookie
        const cookieStore = await cookies();
        cookieStore.set('session_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // Set expiry date to the past
            path: '/',
        });

        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Logout failed', error: error.message },
            { status: 500 }
        );
    }
};
