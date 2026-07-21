'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const serviceCategories = [
    'Electrical Services',
    'AC Services',
    'Computer Services',
    'Cleaning Services',
    'Beauty & Wellness',
    'Tutor Services',
    'Plumbing',
    'Painting',
    'Other Home Services',
];

export default function ProviderRegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        profilePicture: '',
        nidNumber: '',
        address: '',
        city: '',
        serviceCategory: 'Electrical Services',
        yearsOfExperience: '1',
        skills: '',
        aboutMe: '',
        availableDays: '',
        availableTime: '',
        startingPrice: '100',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/auth/provider/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Unable to register provider');
            setMessage('Provider registration submitted successfully. Awaiting admin approval.');
            setTimeout(() => router.push('/login'), 1400);
        } catch (error) {
            setMessage(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
                <div className="mb-8 flex flex-col gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Join HomeEase</p>
                    <h1 className="text-3xl font-bold text-slate-900">Register as a Service Provider</h1>
                    <p className="text-sm text-slate-600">Build your profile, showcase your work, and start receiving premium bookings.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                    <input className="rounded-xl border border-slate-200 p-3" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="profilePicture" placeholder="Profile Picture URL" value={form.profilePicture} onChange={handleChange} />
                    <input className="rounded-xl border border-slate-200 p-3" name="nidNumber" placeholder="NID / Identity Number" value={form.nidNumber} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                    <select className="rounded-xl border border-slate-200 p-3" name="serviceCategory" value={form.serviceCategory} onChange={handleChange}>
                        {serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                    <input className="rounded-xl border border-slate-200 p-3" type="number" min="0" name="yearsOfExperience" placeholder="Years of Experience" value={form.yearsOfExperience} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="availableDays" placeholder="Available Days (comma separated)" value={form.availableDays} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" name="availableTime" placeholder="Available Time" value={form.availableTime} onChange={handleChange} required />
                    <input className="rounded-xl border border-slate-200 p-3" type="number" min="0" name="startingPrice" placeholder="Starting Price" value={form.startingPrice} onChange={handleChange} required />
                    <textarea className="rounded-xl border border-slate-200 p-3 md:col-span-2" rows="4" name="aboutMe" placeholder="Tell customers about yourself and your work" value={form.aboutMe} onChange={handleChange} required />
                    <div className="md:col-span-2 flex flex-col gap-3">
                        <button type="submit" disabled={loading} className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60">
                            {loading ? 'Submitting...' : 'Register Provider'}
                        </button>
                        {message ? <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p> : null}
                        <Link href="/login" className="text-sm font-medium text-violet-600 hover:underline">Already have an account? Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
