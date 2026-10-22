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

    // 🚀 نستعملو الموديل اللي عطانا "High Demand" (هذاكة يثبت إنو موجود)
    // ونديرولو 3 محاولات (Retry) إذا كان مشغول
    const maxRetries = 3;
    let lastError = "";

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
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

        // إذا نجح، نرجعو الجواب
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
        }

        // إذا فشل (High Demand)، نسجلو الخطأ ونستنو ثانية قبل ما نعاودو
        lastError = data.error?.message || "Modèle indisponible.";
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (err: any) {
        lastError = err.message;
      }
    }

    // إذا فشلت كل المحاولات
    return NextResponse.json({ 
      reply: `🔴 Erreur: Google est actuellement très sollicité. Veuillez réessayer dans quelques instants. (${lastError})` 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}