/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userData = window.localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if no user data
            router.push('/login');
        }
    }, [router]);

    const handleLogout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
        });
        if (res.ok) {
            window.localStorage.removeItem('user');
            router.push('/login');
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
            </div>
        );
    }

    // Dummy data for recent bookings
    const recentBookings = [
        { id: 1, service: 'AC Repair', date: '2025-10-20', status: 'Completed' },
        { id: 2, service: 'Plumbing', date: '2025-10-22', status: 'Confirmed' },
        { id: 3, service: 'House Cleaning', date: '2025-10-25', status: 'Pending' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <div className="flex items-center">
                        <img
                            src="/placeholder-user.jpg"
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mr-6 border-4 border-white shadow-md"
                        />
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-violet-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-transform transform hover:scale-105 shadow-sm">
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-transform transform hover:scale-105 shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">My Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Phone</label>
                            <p className="text-gray-800 mt-1">{user.phone || 'Not provided'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Address</label>
                            <p className="text-gray-800 mt-1">{user.address || 'Not provided'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Role</label>
                            <p className="text-gray-800 mt-1 capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Recent Bookings</h2>
                    <div className="space-y-4">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-semibold text-gray-800">{booking.service}</p>
                                    <p className="text-sm text-gray-500">{booking.date}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-xs font-bold rounded-full ${booking.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.status === 'Confirmed'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
