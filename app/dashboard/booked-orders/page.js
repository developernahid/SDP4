"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const BookedOrdersPage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState({});
    const [reviewSubmitting, setReviewSubmitting] = useState({});
    const [providers, setProviders] = useState([]);
    const [providerSelection, setProviderSelection] = useState({});

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/api/bookings/${user.email}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchBookingsAdmin = async () => {
            try {
                const response = await axios.get(`/api/bookings`);
                setBookings(response.data);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchBookingsProvider = async () => {
            try {
                const providerResponse = await axios.get(`/api/providers?userId=${user._id}`);
                const provider = providerResponse.data?.[0];
                if (provider) {
                    const response = await axios.get(`/api/bookings?providerId=${provider._id}`);
                    setBookings(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch provider bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllProviders = async () => {
            try {
                const response = await axios.get('/api/providers?all=true');
                setProviders(response.data || []);
            } catch (error) {
                console.error('Failed to fetch providers:', error);
            }
        };
        if (user) {
            if (user?.role === 'admin') {
                fetchBookingsAdmin();
                fetchAllProviders();
            } else if (user?.role === 'provider') {
                fetchBookingsProvider();
            } else {
                fetchBookings();
            }
        }
    }, [user]);

    const handleProviderSelect = (bookingId, providerId) => {
        setProviderSelection((prev) => ({ ...prev, [bookingId]: providerId }));
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const providerId = providerSelection[bookingId];
            const payload = { status: newStatus };
            if (providerId) {
                const provider = providers.find((item) => item._id === providerId);
                if (provider) {
                    payload.providerId = providerId;
                    payload.providerName = provider.fullName;
                }
            }
            const response = await axios.put(`/api/bookings/${bookingId}`, payload);
            if (response.status === 200) {
                setBookings(bookings.map(b => b._id === bookingId ? { ...b, ...response.data } : b));
            }
        } catch (error) {
            console.error("Failed to update booking status:", error);
        }
    };

    const handlePaymentStatusChange = async (bookingId, paymentStatus) => {
        try {
            const response = await axios.put(`/api/bookings/${bookingId}`, { paymentStatus });
            if (response.status === 200) {
                setBookings(bookings.map((b) => b._id === bookingId ? { ...b, ...response.data } : b));
            }
        } catch (error) {
            console.error('Failed to update payment status:', error);
        }
    };

    const handleReviewChange = (bookingId, field, value) => {
        setReviewData((prev) => ({ ...prev, [bookingId]: { ...(prev[bookingId] || {}), [field]: value } }));
    };

    const submitReview = async (bookingId) => {
        const review = reviewData[bookingId];
        if (!review?.rating || !review?.review) return;
        setReviewSubmitting((prev) => ({ ...prev, [bookingId]: true }));
        try {
            const response = await axios.post('/api/reviews', {
                bookingId,
                providerId: bookings.find((item) => item._id === bookingId)?.providerId,
                customerName: user.username,
                customerEmail: user.email,
                rating: review.rating,
                review: review.review,
            });
            if (response.status === 201) {
                setBookings((prev) => prev.map((item) => item._id === bookingId ? { ...item, reviewed: true } : item));
            }
        } catch (error) {
            console.error('Failed to submit review:', error);
        } finally {
            setReviewSubmitting((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Booked Orders</h1>
            {bookings.length === 0 ? (
                <p>You have no booked orders.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        user.role === 'admin' ? bookings.slice().reverse().map((booking) => (
                            <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">{booking.service.title}</h2>
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Location:</strong> {booking.location}</p>
                                <p><strong>Contact:</strong> {booking.contact}</p>
                                <p><strong>Comment:</strong> {booking.comment}</p>
                                <p><strong>Amount:</strong> {booking.amount ? `${booking.amount} BDT` : 'Contact for price'}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <p><strong>Payment:</strong> {booking.paymentStatus}</p>
                                <div className="mt-2">
                                    <label className="text-sm font-medium">Payment status</label>
                                    <select
                                        value={booking.paymentStatus}
                                        onChange={(e) => handlePaymentStatusChange(booking._id, e.target.value)}
                                        className="mt-1 w-full p-2 border rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </div>
                                <p className="mt-2"><strong>Assigned provider:</strong> {booking.providerName || 'Not assigned'}</p>
                                <select
                                    value={providerSelection[booking._id] || booking.providerId || ''}
                                    onChange={(e) => handleProviderSelect(booking._id, e.target.value)}
                                    className="mt-2 w-full p-2 border rounded"
                                >
                                    <option value="">Select provider to assign</option>
                                    {providers.filter((provider) => provider.isApproved && !provider.isSuspended).map((provider) => (
                                        <option key={provider._id} value={provider._id}>{provider.fullName} ({provider.serviceCategory})</option>
                                    ))}
                                </select>
                                <select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    className="mt-2 p-2 border rounded"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        )) : bookings.filter(b => b.email === user.email).slice().reverse().map((booking) => (
                            <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">{booking.service.title}</h2>
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Location:</strong> {booking.location}</p>
                                <p><strong>Contact:</strong> {booking.contact}</p>
                                <p><strong>Comment:</strong> {booking.comment}</p>
                                <p><strong>Amount:</strong> {booking.amount ? `${booking.amount} BDT` : 'Contact for price'}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <p><strong>Payment:</strong> {booking.paymentStatus}</p>
                                {booking.status === 'Completed' && !booking.reviewed && (
                                    <div className="mt-3 rounded-xl border p-3">
                                        <p className="mb-2 text-sm font-semibold">Leave a review</p>
                                        <select className="mb-2 w-full rounded border p-2" value={reviewData[booking._id]?.rating || ''} onChange={(e) => handleReviewChange(booking._id, 'rating', e.target.value)}>
                                            <option value="">Select stars</option>
                                            <option value="5">5 stars</option>
                                            <option value="4">4 stars</option>
                                            <option value="3">3 stars</option>
                                            <option value="2">2 stars</option>
                                            <option value="1">1 star</option>
                                        </select>
                                        <textarea className="mb-2 w-full rounded border p-2" rows="3" value={reviewData[booking._id]?.review || ''} onChange={(e) => handleReviewChange(booking._id, 'review', e.target.value)} placeholder="Share your experience" />
                                        <button type="button" onClick={() => submitReview(booking._id)} className="rounded bg-violet-600 px-3 py-2 text-sm text-white" disabled={reviewSubmitting[booking._id]}>{reviewSubmitting[booking._id] ? 'Submitting...' : 'Submit Review'}</button>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default BookedOrdersPage;
