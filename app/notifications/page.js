'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

export default function NotificationsPage() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        const load = async () => {
            try {
                const res = await axios.get(`/api/notifications?email=${encodeURIComponent(user.email)}`);
                setNotifications(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user]);

    if (loading) return <div className="p-10">Loading notifications...</div>;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Notifications</h1>
                {notifications.length === 0 ? (
                    <p className="text-slate-500">You have no notifications yet.</p>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div key={notification._id} className={`rounded-3xl border p-4 ${notification.isRead ? 'bg-slate-50' : 'bg-violet-50 border-violet-200'}`}>
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="font-semibold text-slate-900">{notification.title}</h2>
                                    <span className="text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="mt-2 text-slate-700">{notification.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
