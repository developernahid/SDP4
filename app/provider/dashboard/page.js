'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const emptyForm = {
    fullName: '',
    phoneNumber: '',
    city: '',
    serviceCategory: '',
    yearsOfExperience: 0,
    skills: '',
    aboutMe: '',
    availableDays: '',
    availableTime: '',
    startingPrice: 0,
    portfolioImages: '',
    serviceDetails: '',
};

export default function ProviderDashboardPage() {
    const { user } = useAuth();
    const [provider, setProvider] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const fetchProvider = async () => {
        if (!user?._id) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/providers?userId=${user._id}`);
            const data = await res.json();
            if (data?.length) {
                const providerData = data[0];
                setProvider(providerData);
                setForm({
                    fullName: providerData.fullName || '',
                    phoneNumber: providerData.phoneNumber || '',
                    city: providerData.city || '',
                    serviceCategory: providerData.serviceCategory || '',
                    yearsOfExperience: providerData.yearsOfExperience || 0,
                    skills: (providerData.skills || []).join(', '),
                    aboutMe: providerData.aboutMe || '',
                    availableDays: (providerData.availableDays || []).join(', '),
                    availableTime: providerData.availableTime || '',
                    startingPrice: providerData.startingPrice || 0,
                    portfolioImages: (providerData.portfolioImages || []).join(', '),
                    serviceDetails: (providerData.serviceDetails || []).join(', '),
                });
                const bookingRes = await fetch(`/api/bookings?providerId=${providerData._id}`);
                const bookingData = await bookingRes.json();
                setBookings(bookingData || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProvider();
    }, [user]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!provider?._id) return;
        setSaving(true);
        try {
            const payload = {
                ...form,
                skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
                availableDays: form.availableDays.split(',').map((item) => item.trim()).filter(Boolean),
                portfolioImages: form.portfolioImages.split(',').map((item) => item.trim()).filter(Boolean),
                serviceDetails: form.serviceDetails.split(',').map((item) => item.trim()).filter(Boolean),
            };
            const res = await fetch(`/api/providers/${provider._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Unable to save profile');
            setProvider(data);
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage(error.message || 'Unable to save profile');
        } finally {
            setSaving(false);
        }
    };

    const handleBookingAction = async (bookingId, status) => {
        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error('Failed to update booking');
            setBookings((prev) => prev.map((booking) => booking._id === bookingId ? { ...booking, status } : booking));
            setMessage(`Booking marked as ${status}`);
        } catch (error) {
            setMessage(error.message || 'Unable to update booking');
        }
    };

    if (loading) return <div className="p-6">Loading provider dashboard...</div>;
    if (!provider) return <div className="p-6">Your provider profile is pending approval. Please complete your registration first.</div>;

    return (
        <div className="space-y-6 p-2">
            <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-100">Provider Dashboard</p>
                        <h1 className="text-3xl font-bold">{provider.fullName}</h1>
                        <p className="mt-2 text-sm text-violet-100">Status: {provider.status}</p>
                    </div>
                    <div className="rounded-2xl bg-white/20 p-4 text-right">
                        <p className="text-sm text-violet-100">Wallet Balance</p>
                        <p className="text-2xl font-semibold">${provider.walletBalance || 0}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Rating</p><p className="text-2xl font-semibold">{provider.rating || 0}/5</p></div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Reviews</p><p className="text-2xl font-semibold">{provider.reviewCount || 0}</p></div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Completed Jobs</p><p className="text-2xl font-semibold">{provider.completedJobs || 0}</p></div>
            </div>

            {message ? <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm text-violet-700">{message}</div> : null}

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <form onSubmit={handleSave} className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Profile Management</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <input className="rounded-xl border p-3" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
                        <input className="rounded-xl border p-3" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                        <input className="rounded-xl border p-3" name="city" value={form.city} onChange={handleChange} placeholder="City" />
                        <input className="rounded-xl border p-3" name="serviceCategory" value={form.serviceCategory} onChange={handleChange} placeholder="Service Category" />
                        <input className="rounded-xl border p-3" type="number" name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} placeholder="Years of Experience" />
                        <input className="rounded-xl border p-3" type="number" name="startingPrice" value={form.startingPrice} onChange={handleChange} placeholder="Starting Price" />
                        <input className="rounded-xl border p-3" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
                        <input className="rounded-xl border p-3" name="availableDays" value={form.availableDays} onChange={handleChange} placeholder="Available Days" />
                        <input className="rounded-xl border p-3" name="availableTime" value={form.availableTime} onChange={handleChange} placeholder="Available Time" />
                        <input className="rounded-xl border p-3" name="portfolioImages" value={form.portfolioImages} onChange={handleChange} placeholder="Portfolio Image URLs" />
                    </div>
                    <textarea className="w-full rounded-xl border p-3" rows="4" name="aboutMe" value={form.aboutMe} onChange={handleChange} placeholder="About Me" />
                    <textarea className="w-full rounded-xl border p-3" rows="3" name="serviceDetails" value={form.serviceDetails} onChange={handleChange} placeholder="Service Details (comma separated)" />
                    <button type="submit" disabled={saving} className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save Profile'}</button>
                </form>

                <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Booking Requests</h2>
                        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">{bookings.length} total</span>
                    </div>
                    <div className="space-y-3">
                        {bookings.length === 0 ? <p className="text-sm text-slate-500">No bookings yet.</p> : bookings.map((booking) => (
                            <div key={booking._id} className="rounded-2xl border p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">{booking.service?.title || 'Service'}</p>
                                        <p className="text-sm text-slate-500">{booking.name} • {booking.serviceDate} • {booking.serviceTime}</p>
                                        <p className="text-sm text-slate-500">Status: {booking.status}</p>
                                        <p className="text-sm text-slate-500">Payment: {booking.paymentStatus}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={() => handleBookingAction(booking._id, 'Approved')} className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white">Accept</button>
                                        <button onClick={() => handleBookingAction(booking._id, 'Rejected')} className="rounded-lg bg-rose-600 px-3 py-1 text-sm text-white">Reject</button>
                                        <button onClick={() => handleBookingAction(booking._id, 'Completed')} className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-white">Complete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
