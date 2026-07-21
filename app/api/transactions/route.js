import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { Transaction } from '@/Model/Transaction';

export const GET = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const providerId = searchParams.get('providerId') || '';

        const query = providerId ? { providerId } : {};
        const transactions = await Transaction.find(query).sort({ createdAt: -1 });

        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch transactions', error: error.message }, { status: 500 });
    }
};
