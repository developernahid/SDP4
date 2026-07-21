'use client';

import { useState } from 'react';

export default function ChatPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ role: 'system', content: 'Welcome to the HomeEase assistant. Ask anything about bookings, providers, or payments.' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setError('');
        const userMessage = { role: 'user', content: input.trim() };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setInput('');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Chat failed');
            setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
        } catch (err) {
            setError(err.message || 'Unexpected error');
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I could not answer that right now.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">HomeEase AI Assistant</h1>
                <p className="mb-6 text-slate-600">Ask questions about providers, booking flow, ratings, or payments.</p>

                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`rounded-3xl p-4 ${message.role === 'assistant' ? 'bg-violet-50' : message.role === 'user' ? 'bg-slate-100' : 'bg-slate-200'} `}>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">{message.role}</p>
                            <p className="text-sm text-slate-800 whitespace-pre-line">{message.content}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        className="flex-1 rounded-3xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask the HomeEase assistant..."
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="rounded-3xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                    >
                        {loading ? 'Thinking...' : 'Send'}
                    </button>
                </div>
                {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
            </div>
        </div>
    );
}
