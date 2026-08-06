'use client';

import { useState } from 'react';

export default function ChatPage() {
    const [name, setName] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Welcome to the HomeEase assistant. Ask anything about bookings, providers, or payments.' },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadChatHistory = async () => {
        if (!name.trim()) {
            setError('Enter your name to load previous chat history.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/chat?name=${encodeURIComponent(name.trim())}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Unable to load chat history');
            if (data.messages && data.messages.length > 0) {
                setMessages(data.messages);
            } else {
                setMessages([
                    { role: 'assistant', content: 'Welcome to the HomeEase assistant. Ask anything about bookings, providers, or payments.' },
                ]);
            }
            setHistoryLoaded(true);
        } catch (err) {
            setError(err.message || 'Unable to load chat history');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!name.trim()) {
            setError('Please enter your name before sending a message.');
            return;
        }
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
                body: JSON.stringify({ name: name.trim(), messages: nextMessages }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Chat failed');
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
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
                <p className="mb-6 text-slate-600">
                    Ask questions about providers, booking flow, ratings, payments, or any HomeEase page.
                </p>

                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        className="flex-1 rounded-3xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name to restore previous chat"
                    />
                    <button
                        onClick={loadChatHistory}
                        disabled={loading || !name.trim()}
                        className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
                    >
                        Load Chat
                    </button>
                </div>

                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl p-4 ${message.role === 'assistant' ? 'bg-violet-50' : 'bg-slate-100'}`}
                        >
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
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                sendMessage();
                            }
                        }}
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
