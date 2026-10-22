import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', 
      contents: message,
      config: {
        systemInstruction: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français.",
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ 
      reply: "Désolé, le service est temporairement indisponible." 
    }, { status: 500 });
  }
}