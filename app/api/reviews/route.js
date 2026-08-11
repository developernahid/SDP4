import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import { BookedService } from '@/Model/BookedService';
import { Provider } from '@/Model/Provider';
import { Review } from '@/Model/Review';
import { Notification } from '@/Model/Notification';

export const POST = async (request) => {
    try {
        await connect();
        const body = await request.json();
        const { bookingId, providerId, customerName, customerEmail, rating, review } = body;

        const booking = await BookedService.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        if (booking.status !== 'Completed') {
            return NextResponse.json({ message: 'Only completed bookings can be rated' }, { status: 400 });
        }

        const resolvedProviderId = providerId || booking.providerId;
        if (!resolvedProviderId) {
            return NextResponse.json({ message: 'Provider ID is required to submit a review' }, { status: 400 });
        }

        const provider = await Provider.findById(resolvedProviderId).populate('userId', 'email');
        if (!provider) {
            return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
        }

        const existingReview = await Review.findOne({ bookingId });
        if (existingReview) {
            return NextResponse.json({ message: 'Booking already reviewed' }, { status: 400 });
        }

        const currentRating = Number(provider.rating || 0);
        const currentReviewCount = Number(provider.reviewCount || 0);
        const total = currentRating * currentReviewCount;
        const nextCount = currentReviewCount + 1;
        provider.rating = Number(((total + Number(rating)) / nextCount).toFixed(1));
        provider.reviewCount = nextCount;
        await provider.save();

        const newReview = await Review.create({
            bookingId,
            providerId,
            customerName,
            customerEmail,
            rating: Number(rating),
            review: review || '',
        });

        booking.rating = Number(rating);
        booking.review = review || '';
        booking.reviewed = true;
        await booking.save();

        const notifications = [];
        if (provider.userId?.email) {
            notifications.push({
                recipientEmail: provider.userId.email,
                senderEmail: customerEmail,
                title: 'New provider rating received',
                message: `${customerName} rated you ${rating} stars for ${booking.service.title}.`,
                bookingId,
                providerId,
            });
        }
        notifications.push({
            recipientEmail: customerEmail,
            senderEmail: provider.userId?.email || '',
            title: 'Review submitted successfully',
            message: `Your review for ${booking.service.title} has been submitted. Thank you for your feedback!`,
            bookingId,
            providerId,
        });
        await Notification.create(notifications);

        return NextResponse.json({ message: 'Review submitted', review: newReview }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to submit review', error: error.message }, { status: 500 });
    }
};
