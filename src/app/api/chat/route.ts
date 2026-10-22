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

    // 🚀 قائمة الموديلات (من الأحدث للأقدم) - إذا واحد مشغول، يجرب اللي بعدو
    const models = ["gemini-3.8-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    let lastErrorMessage = "";

    for (const modelName of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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

        // إذا نجح الموديل، نرجعو الجواب ديركت
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
        }

        // إذا فشل (High Demand ولا 404)، نسجلو المشكل ونجربو اللي بعدو
        lastErrorMessage = data.error?.message || `Modèle ${modelName} indisponible.`;
        
        // نستنو 500ms قبل ما نجربو الموديل اللي بعدو
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (err: any) {
        lastErrorMessage = err.message;
      }
    }

    // إذا الكل فشلو، نرجعو رسالة واضحة
    return NextResponse.json({ 
      reply: `🔴 Le service est actuellement très sollicité par Google. Veuillez réessayer dans un instant.` 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}