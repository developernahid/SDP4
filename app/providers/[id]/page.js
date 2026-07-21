'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ProviderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [provider, setProvider] = useState(null);
    const [booking, setBooking] = useState(null);
    const [amount, setAmount] = useState(100);
    const [form, setForm] = useState({
        name: '',
        email: '',
        location: '',
        contact: '',
        comment: '',
        serviceDate: '',
        serviceTime: '',
    });
    const [loading, setLoading] = useState(true);
    const [bookingMessage, setBookingMessage] = useState('');

    useEffect(() => {
        const loadProvider = async () => {
            try {
                const res = await fetch(`/api/providers/${params.id}`);
                const data = await res.json();
                setProvider(data);
                setForm((prev) => ({ ...prev, name: user?.username || '', email: user?.email || '' }));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (params?.id) loadProvider();
    }, [params.id, user]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service: {
                        id: provider._id,
                        title: provider.fullName,
                        description: provider.aboutMe || 'Service booking',
                        image: provider.profilePicture || 'https://placehold.co/600x400',
                    },
                    name: form.name,
                    email: form.email,
                    location: form.location,
                    contact: form.contact,
                    comment: form.comment,
                    providerId: provider._id,
                    providerName: provider.fullName,
                    category: provider.serviceCategory,
                    serviceDate: form.serviceDate,
                    serviceTime: form.serviceTime,
                    amount: 0,
                    paymentStatus: 'Pending',
                    status: 'Pending',
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Booking failed');
            setBooking(data.booking);
            setBookingMessage('Booking submitted. Choose a demo amount to complete payment.');
        } catch (error) {
            setBookingMessage(error.message || 'Booking failed');
        }
    };

    const handlePay = async () => {
        if (!booking?._id) return;
        try {
            const res = await fetch(`/api/bookings/${booking._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentStatus: 'Paid', amount }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Payment failed');
            setBooking(data);
            setBookingMessage(`Demo payment completed for $${amount}.`);
        } catch (error) {
            setBookingMessage(error.message || 'Payment failed');
        }
    };

    if (loading) return <div className="p-10">Loading provider profile...</div>;
    if (!provider) return <div className="p-10">Provider not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-6">
                        <img src={provider.profilePicture || 'https://placehold.co/160x160'} alt={provider.fullName} className="h-24 w-24 rounded-full object-cover" />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">{provider.serviceCategory}</p>
                            <h1 className="text-3xl font-bold">{provider.fullName}</h1>
                            <p className="text-sm text-slate-500">⭐ {provider.rating || 0} · {provider.reviewCount || 0} reviews · {provider.yearsOfExperience || 0} years experience</p>
                            <p className="mt-2 text-sm text-slate-600">{provider.city} · From ${provider.startingPrice}</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border p-4"><p className="text-sm text-slate-500">Completed Jobs</p><p className="text-xl font-semibold">{provider.completedJobs || 0}</p></div>
                        <div className="rounded-2xl border p-4"><p className="text-sm text-slate-500">Availability</p><p className="text-xl font-semibold">{provider.availableDays?.join(', ') || 'Flexible'}</p></div>
                        <div className="rounded-2xl border p-4"><p className="text-sm text-slate-500">Price</p><p className="text-xl font-semibold">From ${provider.startingPrice || 0}</p></div>
                    </div>

                    <div>
                        <h2 className="mb-2 text-xl font-semibold">About</h2>
                        <p className="text-slate-600">{provider.aboutMe || 'Professional and punctual service provider.'}</p>
                    </div>

                    <div>
                        <h2 className="mb-2 text-xl font-semibold">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {(provider.skills || []).map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{skill}</span>)}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-2 text-xl font-semibold">Portfolio</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {(provider.portfolioImages || []).length > 0 ? provider.portfolioImages.map((image) => <img key={image} src={image} alt="Portfolio" className="h-32 w-full rounded-2xl object-cover" />) : <p className="text-sm text-slate-500">Portfolio updates coming soon.</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-semibold">Book this provider</h2>
                        <p className="mt-1 text-sm text-slate-500">Select a date, time and complete the demo payment.</p>
                    </div>
                    <form onSubmit={handleBooking} className="space-y-3">
                        <input className="w-full rounded-xl border p-3" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
                        <input className="w-full rounded-xl border p-3" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
                        <input className="w-full rounded-xl border p-3" name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
                        <input className="w-full rounded-xl border p-3" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" required />
                        <input className="w-full rounded-xl border p-3" type="date" name="serviceDate" value={form.serviceDate} onChange={handleChange} required />
                        <input className="w-full rounded-xl border p-3" type="time" name="serviceTime" value={form.serviceTime} onChange={handleChange} required />
                        <textarea className="w-full rounded-xl border p-3" rows="3" name="comment" value={form.comment} onChange={handleChange} placeholder="Tell us about your requirement" />
                        <button type="submit" className="w-full rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700">Hire Now</button>
                    </form>

                    {bookingMessage ? <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{bookingMessage}</p> : null}

                    {booking ? (
                        <div className="rounded-2xl border p-4">
                            <p className="mb-3 font-semibold">Demo payment options</p>
                            <div className="mb-3 flex gap-2">
                                {[100, 150, 200].map((value) => <button key={value} type="button" onClick={() => setAmount(value)} className={`rounded-xl px-3 py-2 text-sm ${amount === value ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}>${value}</button>)}
                            </div>
                            <button onClick={handlePay} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700">Pay Now ${amount}</button>
                        </div>
                    ) : null}

                    <Link href="/providers" className="block text-center text-sm font-medium text-violet-600 hover:underline">Browse more providers</Link>
                </div>
            </div>
        </div>
    );
}
