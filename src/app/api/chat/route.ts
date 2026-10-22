import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ reply: "Erreur: API Key manquante." }, { status: 500 });
    }

    // نكلمو Google API ديركت بـ fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{ text: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle et chaleureuse en français." }]
          }
        }),
      }
    );

    const data = await response.json();

    // إذا فما Error، نرجعوه للمتصفح باش نشوفوه
    if (!response.ok) {
      console.error("Google API Error:", data);
      return NextResponse.json({ 
        reply: `Erreur Google: ${data.error?.message || 'Inconnue'}` 
      }, { status: response.status });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ 
      reply: `Erreur: ${error.message || "Problème technique"}` 
    }, { status: 500 });
  }
}