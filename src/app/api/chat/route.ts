import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    // Timeout logic to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 15000)
    );

    const chat = ai.chats.create({
      model: 'gemini-1.5-flash',
      history: history || [],
      config: {
        systemInstruction: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français.",
      }
    });

    const responsePromise = chat.sendMessage({ message });
    const response = await Promise.race([responsePromise, timeoutPromise]) as any;

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ 
      reply: "Désolé, le service est temporairement indisponible." 
    }, { status: 500 });
  }
}