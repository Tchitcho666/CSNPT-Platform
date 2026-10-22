import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // 💡 حماية قصوى: نمسحو أي مسافة أو سطر جديد أو علامة اقتباس
    let apiKey = process.env.OPENROUTER_API_KEY || '';
    apiKey = apiKey.replace(/['"]/g, '').replace(/\s+/g, '').trim();

    if (!message) return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    if (!apiKey) return NextResponse.json({ reply: "Erreur: OpenRouter API Key manquante." }, { status: 500 });

    // 🚀 نستعملو موديل Mistral المجاني (مستقر جداً)
    const modelName = "mistralai/mistral-7b-instruct:free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://csnpt-platform.vercel.app",
        "X-Title": "CSNPT Assistant"
      },
      body: JSON.stringify({
        model: modelName, 
        messages: [
          { role: "system", content: "Tu es l'assistant officiel de la CSNPT. Réponds de manière professionnelle, chaleureuse et concise en français." },
          { role: "user", content: message }
        ]
      })
    });

    const data: any = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        reply: `🔴 Erreur OpenRouter (${modelName}): ${data.error?.message || 'Erreur inconnue'}` 
      }, { status: 200 });
    }

    const text = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas de réponse.";
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    return NextResponse.json({ reply: `🔴 Erreur technique: ${error.message}` }, { status: 200 });
  }
}