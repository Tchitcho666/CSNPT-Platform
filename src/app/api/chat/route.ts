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
      return NextResponse.json({ reply: "Erreur: Clé API introuvable." }, { status: 500 });
    }

    // نكلمو Google API ديركت
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        }),
      }
    );

    const data = await response.json();

    // إذا فما Error من Google، نرجعوه للمتصفح
    if (!response.ok) {
      return NextResponse.json({ 
        reply: `🔴 Erreur Google: ${data.error?.message || 'Clé invalide'}` 
      }, { status: 200 }); // نرجعو 200 باش الواجهة توري الرسالة
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur: ${error.message || "Problème technique"}` 
    }, { status: 200 });
  }
}