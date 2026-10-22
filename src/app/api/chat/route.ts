import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic'; // باش Vercel ما يعملش كاش للطلب

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    // استخدام الموديل الصحيح للمكتبة الجديدة
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', 
      contents: message,
      config: {
        systemInstruction: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français.",
      }
    });

    // في المكتبة الجديدة، النص يرجع في response.text
    const text = response.text || "Désolé, je n'ai pas de réponse.";
    
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ 
      reply: `Erreur: ${error.message || "Problème technique"}` 
    }, { status: 500 });
  }
}