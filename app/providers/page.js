'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = ['All', 'Electrical Services', 'AC Services', 'Computer Services', 'Cleaning Services', 'Beauty & Wellness', 'Tutor Services', 'Plumbing', 'Painting', 'Other Home Services'];

export default function ProvidersPage() {
    const [providers, setProviders] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('0');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category') || '';
        const searchParam = params.get('search') || '';
        const locationParam = params.get('location') || '';
        const ratingParam = params.get('rating') || '0';

        if (categoryParam) {
            setCategory(categoryParam);
        }
        if (searchParam) {
            setSearch(searchParam);
        }
        if (locationParam) {
            setLocation(locationParam);
        }
        if (ratingParam) {
            setRating(ratingParam);
        }
    }, []);

    useEffect(() => {
        const loadProviders = async () => {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (category && category !== 'All') params.set('category', category);
            if (location) params.set('location', location);
            if (rating && rating !== '0') params.set('rating', rating);
            const res = await fetch(`/api/providers?${params.toString()}`);
            const data = await res.json();
            setProviders(data || []);
        };
        loadProviders();
    }, [search, category, location, rating]);

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Marketplace</p>
                    <h1 className="text-3xl font-bold text-slate-900">Browse trusted service providers</h1>
                    <p className="text-slate-600">Search by category, city, rating and book a professional in minutes.</p>
                </div>

                <div className="mb-8 grid gap-4 rounded-3xl border bg-white p-4 shadow-sm md:grid-cols-4">
                    <input className="rounded-xl border p-3" placeholder="Search providers" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select className="rounded-xl border p-3" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <input className="rounded-xl border p-3" placeholder="City" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <select className="rounded-xl border p-3" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="0">Any rating</option>
                        <option value="4">4+ stars</option>
                        <option value="4.5">4.5+ stars</option>
                        <option value="5">5 stars</option>
                    </select>
                </div>

                <div className="mb-4 text-sm text-slate-600">
                    Showing {category === 'All' ? 'all approved providers' : `${category} providers`} {location ? `in ${location}` : ''}
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {providers.length === 0 ? (
                        <div className="md:col-span-2 xl:col-span-3 rounded-3xl border border-dashed bg-white p-8 text-center text-slate-600">
                            No providers match this selection yet. Try a different service or location.
                        </div>
                    ) : providers.map((provider) => (
                        <div key={provider._id} className="rounded-3xl border bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-4">
                                <img src={provider.profilePicture || 'https://placehold.co/120x120'} alt={provider.fullName} className="h-16 w-16 rounded-full object-cover" />
                                <div>
                                    <h2 className="text-xl font-semibold">{provider.fullName}</h2>
                                    <p className="text-sm text-slate-500">{provider.serviceCategory}</p>
                                    <p className="text-sm text-amber-600">⭐ {provider.rating || 0} · {provider.reviewCount || 0} reviews</p>
                                </div>
                            </div>
                            <p className="mb-4 text-sm text-slate-600">{provider.aboutMe?.slice(0, 140) || 'Professional service provider ready to help.'}</p>
                            <div className="mb-4 flex flex-wrap gap-2 text-sm text-slate-500">
                                <span className="rounded-full bg-slate-100 px-3 py-1">{provider.city}</span>
                                <span className="rounded-full bg-slate-100 px-3 py-1">{provider.yearsOfExperience} yrs</span>
                                <span className="rounded-full bg-slate-100 px-3 py-1">From ${provider.startingPrice}</span>
                            </div>
                            <Link href={`/providers/${provider._id}`} className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-700">View Profile</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
