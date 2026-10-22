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

    // 💡 هنا استعملنا v1 بدل v1beta، واستعملنا gemini-1.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{ text: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français." }]
          }
        }),
      }
    );

    const data: any = await response.json();

    if (!response.ok) {
      // نطبعو الخطأ بطريقة نظيفة بلا JSON معقد
      const errMsg = data.error?.message || 'Erreur inconnue';
      return NextResponse.json({ 
        reply: `🔴 Erreur Google: ${errMsg}` 
      }, { status: 200 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}