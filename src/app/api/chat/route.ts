import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM_INSTRUCTION =
  'You are the CSNPT assistant. You help parents and psychomotricians in Tunisia. Answer concisely and politely.';

type HistoryMessage = { role: 'user' | 'model'; text: string };

export async function POST(request: Request) {
  const maxRequestBytes = 96 * 1024;
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json({ error: 'The chat request is too large.' }, { status: 413 });
  }

  let parsedBody: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
      return NextResponse.json({ error: 'The chat request is too large.' }, { status: 413 });
    }
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  if (!parsedBody || typeof parsedBody !== 'object' || Array.isArray(parsedBody)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const body = parsedBody as { message?: unknown; history?: unknown };

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > 4000) {
    return NextResponse.json(
      { error: 'Message is required and must be at most 4000 characters.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Chat API Error: GEMINI_API_KEY is not configured.');
    return NextResponse.json(
      { error: 'Chat assistant is not configured yet.' },
      { status: 503 },
    );
  }

  const history = Array.isArray(body.history)
    ? (body.history as HistoryMessage[])
        .filter(
          item =>
            item &&
            (item.role === 'user' || item.role === 'model') &&
            typeof item.text === 'string',
        )
        .slice(-20)
        .map(item => ({ role: item.role, parts: [{ text: item.text.slice(0, 4000) }] }))
    : [];

  try {
    // The installed @google/genai SDK expects an options object here.
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    const reply = response.text?.trim();
    if (!reply) throw new Error('The model returned an empty response.');
    return NextResponse.json({ reply });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Chat API Error details:', errorMessage);
    return NextResponse.json(
      {
        reply:
          process.env.NODE_ENV !== 'production'
            ? `Error: ${errorMessage}`
            : 'The assistant could not respond right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
