import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import connect from '@/utils/db';
import { ServiceCategory } from '@/Model/ServiceCategory';
import { ChatSession } from '@/Model/ChatSession';

export const runtime = 'nodejs';

let lastInteractionId;

const buildSystemPrompt = (serviceList) => `You are a customer support assistant for HomeEase, a home services platform.
Use the website information and service list below to answer questions about services, pricing, booking, team, providers, reviews, and contact.
Available pages: Home, Services, Providers, About, Contact, Dashboard, Bookings, Reviews, Chat.
Current services:
${serviceList}

If asked about contact or support, direct the user to the Contact page or support email. If unsure, ask the user to contact support.`;

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
        const { name, messages } = await request.json();

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ message: 'Messages are required' }, { status: 400 });
        }

        await connect();
        const client = await clientPromise;
        const dbName = process.env.MONGODB_DB || 'HomeEase';
        const db = client.db(dbName);
        const rawServices = await db.collection('services').find({}).toArray().catch(() => []);
        const categories = await ServiceCategory.find({}).lean().catch(() => []);
        const serviceList = [
            ...rawServices.map((service) => `${service.name || service.title || 'Service'} - ৳${service.price ?? 0}`),
            ...categories.flatMap((category) => (category.featured || []).map((service) => `${service.title} - ৳${service.price ?? 0}`)),
        ]
            .filter(Boolean)
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
            const updatedMessages = [...messages, { role: 'assistant', content: reply }];

            if (name) {
                await ChatSession.findOneAndUpdate(
                    { name: name.trim() },
                    { name: name.trim(), messages: updatedMessages },
                    { upsert: true, new: true }
                );
            }

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

export const GET = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        if (!name) {
            return NextResponse.json({ message: 'Name is required' }, { status: 400 });
        }

        const session = await ChatSession.findOne({ name: name.trim() }).lean();
        if (!session) {
            return NextResponse.json({ messages: [] }, { status: 200 });
        }

        return NextResponse.json({ messages: session.messages }, { status: 200 });
    } catch (error) {
        console.error('Failed to load chat history', error);
        return NextResponse.json({ message: 'Unable to load chat history' }, { status: 500 });
    }
};
