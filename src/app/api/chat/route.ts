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

    // 🚀 Fallback Models: إذا الأول مشغول، يجرب الثاني، وإلا الثالث
    const models = ["gemini-3.8-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    let lastError = "";

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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

        const data: any = await response.json();

        // إذا نجح، نرجعو الجواب ديركت
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
        }

        // إذا فشل، نسجلو الـ Error ونجربو الموديل اللي بعدو
        lastError = data.error?.message || `Le modèle ${model} est indisponible.`;
        
      } catch (err: any) {
        lastError = err.message;
      }
    }

    // إذا الكل فشلو، نرجعو الـ Error الأخير
    return NextResponse.json({ 
      reply: `🔴 Erreur: ${lastError}` 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}