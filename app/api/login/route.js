
import { NextResponse } from 'next/server';
import { User } from '@/Model/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

// It's highly recommended to move this to an environment variable
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-change-me');

export const POST = async (request) => {
    try {
        await connect();
        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        // Create and sign the JWT
        const token = await new SignJWT({ userId: user._id.toString(), email: user.email, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d') // Token expires in 1 day
            .sign(JWT_SECRET);

        // Prepare user data to send back (without password)
        const userResponse = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email || '',
            role: user.role || '',
            photoURL: user.photoURL || '',
            phoneNumber: user.phoneNumber || '',
            businessName: user.businessName || '',
            businessAddress: user.businessAddress || '',
            serviceType: user.serviceType || '',
            experience: user.experience || '',
            serviceArea: user.serviceArea || '',
            workingHoursStart: user.workingHoursStart || '',
            workingHoursEnd: user.workingHoursEnd || '',
            receiveOrderType: user.receiveOrderType || '',
            documents: user.documents || [],
            ownerName: user.ownerName || '',
            nicNumber: user.nicNumber || '',
            nicExpiryDate: user.nicExpiryDate || '',
            paymentMethod: user.paymentMethod || '',
            pricingMethod: user.pricingMethod || '',
            hourlyFee: user.hourlyFee || '',
            flatFee: user.flatFee || '',
            additionalInfo: user.additionalInfo || '',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        const cookieStore = await cookies();
        cookieStore.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        console.log(userResponse);

        return NextResponse.json({ user: userResponse }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'Authentication failed', error: error.message },
            { status: 500 }
        );
    }
};
