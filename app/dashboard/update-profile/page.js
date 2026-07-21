"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Image from 'next/image';

const UpdateProfilePage = () => {
    const { user, loading, checkUser } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        photoURL: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                photoURL: user.photoURL || '/placeholder-user.jpg'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/auth/me', formData);
            alert('Profile updated successfully');
            checkUser();
            e.preventDefault();
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }

    if (!user) {
        return <div className="text-center mt-10">Please log in to update your profile.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    {/* <Image
                        src={formData?.photoURL || '/placeholder-user.jpg'}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="rounded-full"
                    /> */}
                    <input
                        type="text"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1 bg-gray-100"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfilePage;
