import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { Provider } from '@/Model/Provider';

export const GET = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const location = searchParams.get('location') || '';
        const minRating = Number(searchParams.get('rating') || 0);
        const userId = searchParams.get('userId') || '';
        const all = searchParams.get('all') === 'true';

        const query = {};
        if (userId) {
            query.userId = userId;
        } else if (!all) {
            query.isApproved = true;
            query.isSuspended = false;
        }

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { serviceCategory: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } },
                { aboutMe: { $regex: search, $options: 'i' } },
            ];
        }

        if (category) query.serviceCategory = { $regex: category, $options: 'i' };
        if (location) query.city = { $regex: location, $options: 'i' };
        if (minRating) query.rating = { $gte: minRating };

        if (category) query.serviceCategory = { $regex: category, $options: 'i' };
        if (location) query.city = { $regex: location, $options: 'i' };
        if (minRating) query.rating = { $gte: minRating };

        const providers = await Provider.find(query)
            .sort({ createdAt: -1 })
            .populate('userId', 'username email photoURL role isApproved walletBalance');

        const payload = providers.map((provider) => ({
            _id: provider._id,
            ...provider.toObject(),
            user: provider.userId || null,
        }));

        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch providers', error: error.message }, { status: 500 });
    }
};
