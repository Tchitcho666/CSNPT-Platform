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

    // 🚀 نبعثو الطلب لكل الموديلات في نفس الوقت (Parallel)
    const models = ["gemini-3.8-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    
    try {
      // Promise.any ياخذ أول موديل يجاوب بنجاح
      const firstResponse = await Promise.any(models.map(async (model) => {
        const res = await fetch(
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
            // Timeout 8 ثواني لكل موديل
            signal: AbortSignal.timeout(8000) 
          }
        );

        if (!res.ok) throw new Error(`Model ${model} failed`);
        
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) throw new Error(`No text from ${model}`);
        return text;
      }));

      return NextResponse.json({ reply: firstResponse });

    } catch (err) {
      return NextResponse.json({ 
        reply: "🔴 Erreur: Tous les modèles sont indisponibles ou lents. Réessayez plus tard." 
      }, { status: 200 });
    }

  } catch (error: any) {
    return NextResponse.json({ 
      reply: `🔴 Erreur technique: ${error.message}` 
    }, { status: 200 });
  }
}