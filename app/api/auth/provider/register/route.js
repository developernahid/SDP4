import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import { User } from '@/Model/User';
import { Provider } from '@/Model/Provider';

export const POST = async (request) => {
    try {
        await connect();
        const body = await request.json();
        const {
            fullName,
            email,
            phoneNumber,
            password,
            profilePicture,
            nidNumber,
            address,
            city,
            serviceCategory,
            yearsOfExperience,
            skills,
            aboutMe,
            availableDays,
            availableTime,
            startingPrice,
        } = body;

        if (!fullName || !email || !password) {
            return NextResponse.json({ message: 'Name, email and password are required' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'A provider already exists with this email' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const normalizedSkills = Array.isArray(skills)
            ? skills
            : typeof skills === 'string'
                ? skills.split(',').map((item) => item.trim()).filter(Boolean)
                : [];
        const normalizedDays = Array.isArray(availableDays)
            ? availableDays
            : typeof availableDays === 'string'
                ? availableDays.split(',').map((item) => item.trim()).filter(Boolean)
                : [];

        const user = await User.create({
            username: fullName,
            email,
            password: hashedPassword,
            role: 'provider',
            photoURL: profilePicture || '',
            phoneNumber: phoneNumber || '',
            isApproved: false,
            walletBalance: 0,
        });

        // create provider and rollback user if provider creation fails
        let provider;
        try {
            provider = await Provider.create({
                userId: user._id,
                fullName,
                phoneNumber: phoneNumber || '',
                profilePicture: profilePicture || '',
                nidNumber: nidNumber || '',
                address: address || '',
                city: city || '',
                serviceCategory: serviceCategory || '',
                yearsOfExperience: Number(yearsOfExperience) || 0,
                skills: normalizedSkills,
                aboutMe: aboutMe || '',
                availableDays: normalizedDays,
                availableTime: availableTime || '',
                startingPrice: Number(startingPrice) || 0,
                isApproved: false,
                status: 'pending',
            });
        } catch (provErr) {
            // rollback created user on provider creation failure
            await User.findByIdAndDelete(user._id).catch(() => null);
            throw provErr;
        }

        await User.findByIdAndUpdate(user._id, { providerId: provider._id, isApproved: false, walletBalance: 0 });

        return NextResponse.json({ message: 'Provider registration submitted successfully', provider }, { status: 201 });
    } catch (error) {
        console.error('Provider registration failed:', error);
        return NextResponse.json({ message: 'Provider registration failed', error: error.message || String(error) }, { status: 500 });
    }
};
