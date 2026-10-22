import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!message) return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    if (!apiKey) return NextResponse.json({ reply: "Erreur: API Key manquante." }, { status: 500 });

    // 1️⃣ نسألو Google: شنية الموديلات المتوفرة مع الـ Key هذا؟
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listRes.json();

    if (!listRes.ok) {
      return NextResponse.json({ reply: `🔴 Erreur d'authentification: ${listData.error?.message}` });
    }

    // 2️⃣ نقلبو على أي موديل Gemini يدعم "generateContent"
    const availableModel = listData.models?.find((m: any) => 
      m.name.includes('gemini') && 
      m.supportedGenerationMethods?.includes('generateContent')
    );

    if (!availableModel) {
      return NextResponse.json({ reply: "🔴 Erreur: Aucun modèle Gemini n'est disponible pour cette clé API." });
    }

    // ناخذو إسم الموديل (كيما "gemini-1.5-flash")
    const modelName = availableModel.name.replace('models/', '');

    // 3️⃣ نبعثو الرسالة للموديل هذاكة
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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
      const errMsg = data.error?.message || 'Erreur inconnue';
      return NextResponse.json({ reply: `🔴 Erreur Google (${modelName}): ${errMsg}` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    return NextResponse.json({ reply: `🔴 Erreur technique: ${error.message}` });
  }
}