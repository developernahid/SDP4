import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const runtime = 'nodejs';

let lastInteractionId;

const buildSystemPrompt = (serviceList) => `You are a customer support assistant for a home appliance service company.
Here are our current services and prices:
${serviceList}

Use this info to answer pricing/service questions accurately. If unsure, ask the user to contact support.`;

const buildConversationText = (messages) =>
    messages
        .map((message) => {
            if (message.role === 'user') return `User: ${message.content}`;
            if (message.role === 'assistant') return `Assistant: ${message.content}`;
            return `${message.role}: ${message.content}`;
        })
        .join('\n');

export const POST = async (request) => {
    try {
        const { messages } = await request.json();

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ message: 'Messages are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const dbName = process.env.MONGODB_DB || 'HomeEase';
        const db = client.db(dbName);
        const services = await db.collection('services').find({}).toArray();
        const serviceList = services
            .map((service) => `${service.name} - ৳${service.price}`)
            .join('\n') || 'No services are currently available.';

        const systemPrompt = buildSystemPrompt(serviceList);

        if (process.env.GEMINI_API_KEY) {
            const { GoogleGenAI } = await import('@google/genai');
            const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const conversation = `${systemPrompt}\n\n${buildConversationText(messages)}`;
            const interaction = await gemini.interactions.create({
                model: 'gemini-3.6-flash',
                input: conversation,
                previous_interaction_id: lastInteractionId,
            });

            lastInteractionId = interaction.id;
            const reply = interaction.output_text || 'I could not generate a response at the moment.';
            return NextResponse.json({ reply }, { status: 200 });
        }

        // Use Gemini only. If GEMINI_API_KEY is not provided above we return an error.
        return NextResponse.json({ message: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    } catch (error) {
        console.error('Chat failed', error);
        const fallbackReply = 'The assistant is currently unavailable. Please try again in a moment.';
        return NextResponse.json({ reply: fallbackReply, message: error?.message || 'Chat failed' }, { status: 200 });
    }
};
