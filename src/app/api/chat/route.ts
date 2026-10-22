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

    // 🕒 إعداد Timeout باش ما يعلقش
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 ثانية

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{ text: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français." }]
          }
        }),
        signal: controller.signal // ربط الـ Timeout
      }
    );

    clearTimeout(timeoutId); // نمسحو الـ Timeout إذا جاوب بسرعة

    const data: any = await response.json();

    if (!response.ok) {
      const errMsg = data.error?.message || 'Erreur inconnue';
      return NextResponse.json({ 
        reply: `🔴 Erreur Google: ${errMsg}` 
      }, { status: 200 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ 
        reply: "🔴 Erreur: Le serveur met trop de temps à répondre. Réessayez." 
      }, { status: 200 });
    }
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}