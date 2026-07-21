import { NextResponse } from 'next/server';

const fallbackResponses = [
    'I can help you find a provider, track your booking, or understand our services.',
    'Try asking about service categories, booking status, or how admin approval works.',
    'If you want help with ratings or provider selection, I can guide you through the platform flow.',
];

export const POST = async (request) => {
    try {
        const { prompt } = await request.json();
        if (!prompt) {
            return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            return NextResponse.json({ answer: fallback }, { status: 200 });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for the HomeEase marketplace.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 500,
                temperature: 0.8,
            }),
        });

        const data = await response.json();
        const answer = data?.choices?.[0]?.message?.content || 'I could not generate a response at this time.';
        return NextResponse.json({ answer }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Chat failed', error: error.message }, { status: 500 });
    }
};
