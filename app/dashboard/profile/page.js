/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <img src={user.photoURL || '/placeholder-user.jpg'} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default ProfilePage;
