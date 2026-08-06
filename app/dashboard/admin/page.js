"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const AdminDashboardPage = () => {
    const { user, loading } = useAuth();
    const [services, setServices] = useState([]);
    const [providers, setProviders] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        featured: [],
        all: [],
    });
    const [currentAllService, setCurrentAllService] = useState('');
    const [newFeatured, setNewFeatured] = useState({
        title: '',
        description: '',
        image: 'https://placehold.co/600x400/e2e8f0/334155?text=Service',
        price: 0,
    });
    const [editingFeaturedId, setEditingFeaturedId] = useState(null);

    useEffect(() => {
        fetchServices();
        fetchProviders();
        fetchTransactions();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services');
            setServices(response.data);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        }
    };

    const fetchProviders = async () => {
        try {
            const response = await axios.get('/api/providers?all=true');
            setProviders(response.data || []);
        } catch (error) {
            console.error('Failed to fetch providers:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions');
            setTransactions(response.data || []);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const updateProviderStatus = async (providerId, status) => {
        try {
            await axios.put(`/api/providers/${providerId}`, { status });
            fetchProviders();
        } catch (error) {
            console.error('Failed to update provider status:', error);
        }
    };

    const handleSelectService = (service) => {
        setSelectedService(service);
        setFormData(service);
    };

    const handleAddNew = () => {
        setSelectedService(null);
        setFormData({
            id: '',
            title: '',
            featured: [],
            all: [],
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAllService = () => {
        if (currentAllService.trim()) {
            setFormData((prev) => ({
                ...prev,
                all: [...prev.all, currentAllService.trim()],
            }));
            setCurrentAllService('');
        }
    };

    const handleRemoveAllService = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            all: prev.all.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleNewFeaturedChange = (e) => {
        const { name, value } = e.target;
        setNewFeatured((prev) => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value,
        }));
    };

    const handleAddFeatured = () => {
        if (newFeatured.title && newFeatured.description) {
            if (editingFeaturedId !== null) {
                setFormData((prev) => ({
                    ...prev,
                    featured: prev.featured.map((item) => item.id === editingFeaturedId ? { ...item, ...newFeatured } : item),
                }));
                setEditingFeaturedId(null);
            } else {
                const nextId = formData.featured.length > 0 ? Math.max(...formData.featured.map(f => f.id)) + 1 : 1;
                setFormData((prev) => ({
                    ...prev,
                    featured: [...prev.featured, { ...newFeatured, id: nextId }],
                }));
            }
            setNewFeatured({
                title: '',
                description: '',
                image: 'https://placehold.co/600x400/e2e8f0/334155?text=Service',
                price: 0,
            });
        } else {
            alert('Please fill in at least a title and description for the featured service.');
        }
    };

    const handleEditFeatured = (item) => {
        setEditingFeaturedId(item.id);
        setNewFeatured({
            title: item.title,
            description: item.description,
            image: item.image,
            price: item.price || 0,
        });
    };

    const handleRemoveFeatured = (idToRemove) => {
        setFormData((prev) => ({
            ...prev,
            featured: prev.featured.filter((item) => item.id !== idToRemove),
        }));
        if (editingFeaturedId === idToRemove) {
            setEditingFeaturedId(null);
            setNewFeatured({
                title: '',
                description: '',
                image: 'https://placehold.co/600x400/e2e8f0/334155?text=Service',
                price: 0,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedService) {
            // Update existing service
            try {
                await axios.put(`/api/services/${selectedService._id}`, formData);
                alert('Service updated successfully!');
                fetchServices();
            } catch (error) {
                console.error('Failed to update service:', error);
                alert('Error updating service.');
            }
        } else {
            // Create new service
            try {
                await axios.post('/api/services', formData);
                alert('Service created successfully!');
                fetchServices();
                handleAddNew();
            } catch (error) {
                console.error('Failed to create service:', error);
                alert('Error creating service.');
            }
        }
    };

    const handleDelete = async () => {
        if (selectedService) {
            if (confirm('Are you sure you want to delete this service?')) {
                try {
                    await axios.delete(`/api/services/${selectedService._id}`);
                    alert('Service deleted successfully!');
                    fetchServices();
                    handleAddNew();
                } catch (error) {
                    console.error('Failed to delete service:', error);
                    alert('Error deleting service.');
                }
            }
        }
    };

    const inputClasses = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
    const fieldsetClasses = "mb-6 p-4 border border-gray-200 rounded-md";
    const legendClasses = "text-lg font-semibold text-gray-800 px-2";
    const buttonClasses = "py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition";
    const removeButtonClasses = "py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition ml-2";

    if (loading) return <div className="p-6">Loading...</div>;

    if (user && user.role !== 'admin') {
        return <div className="p-6">You are not authorized to view this page.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-4 bg-gray-100 h-auto md:h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Existing Services</h2>
                <button onClick={handleAddNew} className="w-full mb-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Add New Service
                </button>
                <ul>
                    {services.map(service => (
                        <li key={service._id} onClick={() => handleSelectService(service)} className={`p-2 cursor-pointer rounded-md ${selectedService?._id === service._id ? 'bg-blue-200' : 'hover:bg-gray-200'}`}>
                            {service.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-3/4 p-6 overflow-y-auto h-screen">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="rounded-2xl border bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Marketplace Oversight</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-gray-500">Pending Providers</p>
                                <p className="text-2xl font-semibold">{providers.filter((provider) => provider.status === 'pending').length}</p>
                            </div>
                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-gray-500">Demo Transactions</p>
                                <p className="text-2xl font-semibold">{transactions.length}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-3">
                            {providers.map((provider) => (
                                <div key={provider._id} className="flex flex-wrap items-center justify-between rounded-xl border p-3">
                                    <div>
                                        <p className="font-semibold">{provider.fullName}</p>
                                        <p className="text-sm text-gray-500">{provider.serviceCategory} • {provider.city}</p>
                                        <p className="text-sm text-gray-500">Status: {provider.status}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => updateProviderStatus(provider._id, 'approved')} className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white">Approve</button>
                                        <button type="button" onClick={() => updateProviderStatus(provider._id, 'rejected')} className="rounded-lg bg-rose-600 px-3 py-1 text-sm text-white">Reject</button>
                                        <button type="button" onClick={() => updateProviderStatus(provider._id, 'suspended')} className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-white">Suspend</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-lg">
                        <h3 className="mb-3 text-xl font-semibold">Demo Payment Ledger</h3>
                        <div className="space-y-2">
                            {transactions.length === 0 ? <p className="text-sm text-gray-500">No transactions yet.</p> : transactions.map((transaction) => (
                                <div key={transaction._id} className="flex justify-between rounded-xl border p-3 text-sm">
                                    <span>{transaction.description}</span>
                                    <span className="font-semibold">${transaction.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                            {selectedService ? 'Edit Service Category' : 'Add New Service Category'}
                        </h2>

                    <fieldset className={fieldsetClasses}>
                        <legend className={legendClasses}>Main Details</legend>
                        <div className="mb-4">
                            <label htmlFor="id" className={labelClasses}>Category ID</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="e.g., 'ac' or 'home-cleaning' (must be unique)"
                                value={formData.id}
                                onChange={handleFormChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className={labelClasses}>Category Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="e.g., 'AC Repair & Servicing'"
                                value={formData.title}
                                onChange={handleFormChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset className={fieldsetClasses}>
                        <legend className={legendClasses}>Featured Services</legend>
                        <div className="space-y-2 mb-4">
                            {formData.featured.map((item) => (
                                <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                                    <span>{item.id}: {item.title} · ৳{item.price || 0}</span>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="py-1 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                            onClick={() => handleEditFeatured(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={removeButtonClasses}
                                            onClick={() => handleRemoveFeatured(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {formData.featured.length === 0 && (
                                <p className="text-sm text-gray-500">No featured services added yet.</p>
                            )}
                        </div>
                        <div className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                            <h4 className="font-semibold text-gray-700">Add a New Featured Service</h4>
                            <div>
                                <label className={labelClasses}>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g., 'AC Servicing'"
                                    value={newFeatured.title}
                                    onChange={handleNewFeaturedChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="e.g., 'Professional AC maintenance'"
                                    value={newFeatured.description}
                                    onChange={handleNewFeaturedChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Price</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="price"
                                    placeholder="e.g., 1500"
                                    value={newFeatured.price}
                                    onChange={handleNewFeaturedChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={newFeatured.image}
                                    onChange={handleNewFeaturedChange}
                                    className={inputClasses}
                                />
                            </div>
                            <button type="button" className={buttonClasses} onClick={handleAddFeatured}>
                                {editingFeaturedId !== null ? 'Save featured service' : 'Add Featured Service'}
                            </button>
                            {editingFeaturedId !== null && (
                                <button type="button" className="ml-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => {
                                    setEditingFeaturedId(null);
                                    setNewFeatured({
                                        title: '',
                                        description: '',
                                        image: 'https://placehold.co/600x400/e2e8f0/334155?text=Service',
                                        price: 0,
                                    });
                                }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className={fieldsetClasses}>
                        <legend className={legendClasses}>All Services</legend>
                        <div className="space-y-2 mb-4">
                            {formData.all.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-md bg-gray-50">
                                    <span>{item}</span>
                                    <button
                                        type="button"
                                        className={removeButtonClasses}
                                        onClick={() => handleRemoveAllService(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            {formData.all.length === 0 && (
                                <p className="text-sm text-gray-500">No services added yet.</p>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="e.g., 'AC Gas Refill'"
                                value={currentAllService}
                                onChange={(e) => setCurrentAllService(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button type="button" className={buttonClasses} onClick={handleAddAllService}>
                                Add
                            </button>
                        </div>
                    </fieldset>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="py-3 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition text-lg"
                            >
                                {selectedService ? 'Update Service Category' : 'Create Service Category'}
                            </button>
                            {selectedService && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="py-3 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition text-lg"
                                >
                                    Delete Service Category
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
