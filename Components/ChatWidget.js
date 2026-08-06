'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Welcome to HomeEase. Ask about services, pricing, or booking.' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input.trim() }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            const reply = data.reply || 'Sorry, something went wrong.';

            setMessages([...newMessages, { role: 'assistant', content: reply }]);
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I could not answer that right now.' }]);
            console.error('ChatWidget error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="w-80 bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center justify-between bg-slate-900 px-4 py-3">
                        <div>
                            <p className="text-sm font-semibold text-white">HomeEase Chat</p>
                            <p className="text-xs text-slate-300">Ask about services, booking, and pricing.</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white rounded-full bg-slate-700 p-2 hover:bg-slate-600"
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>
                    <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {messages.map((m, i) => (
                            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                                <span
                                    className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                                        m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 border border-slate-200'
                                    }`}
                                >
                                    {m.content}
                                </span>
                            </div>
                        ))}
                        {loading && <p className="text-sm text-gray-500">Typing...</p>}
                    </div>
                    <div className="border-t border-slate-200 p-3 bg-white">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 rounded-full border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ask about our services..."
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
                    aria-label="Open chat"
                >
                    <span className="text-lg">💬</span>
                    Chat with us
                </button>
            )}
        </div>
    );
}
