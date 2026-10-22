import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle et chaleureuse en français."
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return NextResponse.json({ reply: response.text() });
  } catch (error: any) {
    console.error("Chat API Error:", error.message);
    return NextResponse.json({ reply: "Désolé, le service est temporairement indisponible." }, { status: 500 });
  }
}