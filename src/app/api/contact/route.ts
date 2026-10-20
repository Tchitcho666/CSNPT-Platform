import { NextResponse } from 'next/server';

const invalidRequest = () => NextResponse.json({ message: 'Vérifiez les informations saisies et réessayez.' }, { status: 400 });

export async function POST(request: Request) {
  const maxRequestBytes = 32_768;
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json({ message: 'Votre message est trop volumineux.' }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
      return NextResponse.json({ message: 'Votre message est trop volumineux.' }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return invalidRequest();
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return invalidRequest();

  const data = body as Record<string, unknown>;
  const { name, email, subject, message, consent } = data;
  if (
    typeof name !== 'string' || !name.trim() || name.trim().length > 200 ||
    typeof email !== 'string' || !email.trim() || email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof subject !== 'string' || !subject.trim() || subject.trim().length > 120 ||
    typeof message !== 'string' || !message.trim() || message.trim().length > 5000 ||
    consent !== true
  ) {
    return invalidRequest();
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact API unavailable: RESEND_API_KEY is not configured.');
    return NextResponse.json({ message: 'Le service de contact est momentanément indisponible. Réessayez plus tard.' }, { status: 503 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@csnpt.tn';
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'CSNPT Website <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email.trim(),
        subject: `CSNPT — ${subject.trim()}`,
        text: [`Nom: ${name.trim()}`, `Email: ${email.trim()}`, `Sujet: ${subject.trim()}`, '', 'Message:', message.trim()].join('\n'),
      }),
    });

    if (!resendResponse.ok) {
      console.error('Contact email delivery failed with status:', resendResponse.status);
      return NextResponse.json({ message: 'Votre message n’a pas pu être envoyé. Réessayez dans un instant.' }, { status: 502 });
    }

    const result = await resendResponse.json().catch(() => null) as { id?: string } | null;
    return NextResponse.json({ success: true, id: result?.id ?? null });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return NextResponse.json({ message: 'Votre message n’a pas pu être envoyé. Réessayez dans un instant.' }, { status: 502 });
  }
}
