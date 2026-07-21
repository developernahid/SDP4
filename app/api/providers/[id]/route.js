import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { Provider } from '@/Model/Provider';
import { User } from '@/Model/User';

export const GET = async (request, { params }) => {
    try {
        await connect();
        const provider = await Provider.findById(params.id).populate('userId', 'username email photoURL role isApproved walletBalance');

        if (!provider) {
            return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
        }

        return NextResponse.json({
            _id: provider._id,
            ...provider.toObject(),
            user: provider.userId || null,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch provider', error: error.message }, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    try {
        await connect();
        const body = await request.json();
        const provider = await Provider.findById(params.id);

        if (!provider) {
            return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
        }

        const updateData = { ...body };
        if (body.status === 'approved') {
            updateData.isApproved = true;
            updateData.status = 'approved';
        } else if (body.status === 'rejected') {
            updateData.isApproved = false;
            updateData.status = 'rejected';
        } else if (body.status === 'suspended') {
            updateData.isSuspended = true;
            updateData.status = 'suspended';
        } else if (body.status === 'pending') {
            updateData.isApproved = false;
            updateData.isSuspended = false;
            updateData.status = 'pending';
        }

        Object.assign(provider, updateData);
        await provider.save();

        if (provider.userId) {
            const userUpdate = {
                username: body.fullName || provider.fullName,
                photoURL: body.profilePicture || provider.profilePicture,
                phoneNumber: body.phoneNumber || provider.phoneNumber,
            };
            if (body.status === 'approved') {
                userUpdate.isApproved = true;
            } else if (body.status === 'rejected') {
                userUpdate.isApproved = false;
            } else if (body.status === 'suspended') {
                userUpdate.isApproved = false;
            }
            await User.findByIdAndUpdate(provider.userId, userUpdate);
        }

        return NextResponse.json(provider, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update provider', error: error.message }, { status: 500 });
    }
};
