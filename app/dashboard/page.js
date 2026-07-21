"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
    const { user, loading } = useAuth();
    const [services, setServices] = useState([]);
    const [bookingService, setBookingService] = useState(null);
    const [bookingData, setBookingData] = useState({ name: '', email: '', location: '', contact: '', comment: '' });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/services');
                setServices(response.data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, []);



    const openBooking = (service) => {
        setBookingService(service);
        setBookingData({ name: user?.username || '', email: user?.email || '', location: '', contact: '', comment: '', status: 'Pending' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prev) => ({ ...prev, [name]: value }));
    };

    const submitBooking = async (e) => {
        e.preventDefault();
        if (!bookingService) return alert('Select a service to book');

        // Ensure we always send a string id (schema expects String)
        const rawId = bookingService.id ?? bookingService._id ?? bookingService.slug ?? bookingService.title ?? '';
        const serviceId = String(rawId);

        const servicePayload = {
            id: serviceId,
            title: bookingService.title || bookingService.name || 'Untitled Service',
            description: (bookingService.featured && bookingService.featured[0]?.description) || bookingService.description || '',
            image: (bookingService.featured && bookingService.featured[0]?.image) || bookingService.image || 'https://placehold.co/600x400',
        };

        try {
            await axios.post('/api/bookings', {
                service: servicePayload,
                ...bookingData,
            });
            alert('Booking submitted!');
            setBookingService(null);
            setBookingData({ name: '', email: '', location: '', contact: '', comment: '' });
        } catch (err) {
            console.error('Booking failed', err);
            alert('Failed to submit booking');
        }
    };

    const inputClasses = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500";

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Available Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                    <div key={service._id || service.id} className="border rounded-lg p-4 bg-white shadow">
                        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{service.description || (service.featured && service.featured[0]?.description) || ''}</p>
                        <div className="flex space-x-2">
                            <button className="py-2 px-3 bg-blue-600 text-white rounded" onClick={() => openBooking(service)}>Book</button>
                        </div>
                    </div>
                ))}
            </div>

            {bookingService && (
                <div className="mt-6 max-w-xl bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-3">Book: {bookingService.title}</h2>
                    <form onSubmit={submitBooking} className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input name="name" value={bookingData.name} onChange={handleBookingChange} className={inputClasses} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input name="email" value={bookingData.email} onChange={handleBookingChange} type="email" className={inputClasses} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input name="location" value={bookingData.location} onChange={handleBookingChange} className={inputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input name="contact" value={bookingData.contact} onChange={handleBookingChange} className={inputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea name="comment" value={bookingData.comment} onChange={handleBookingChange} className={inputClasses} />
                        </div>
                        <div className="flex space-x-2">
                            <button type="submit" className="py-2 px-4 bg-green-600 text-white rounded">Submit Booking</button>
                            <button type="button" className="py-2 px-4 bg-gray-300 rounded" onClick={() => setBookingService(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
