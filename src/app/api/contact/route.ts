import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
      consent,
    } = body ?? {};

    if (!name?.trim() || !email?.trim() || !subject || !message?.trim()) {
      return NextResponse.json(
        {
          message: 'البيانات ناقصة.',
        },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          message: 'الموافقة مطلوبة.',
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_TO_EMAIL || 'contact@csnpt.tn';

    if (!apiKey) {
      console.error('CONTACT ERROR: RESEND_API_KEY is missing');

      return NextResponse.json(
        {
          message:
            'RESEND_API_KEY غير موجود في .env.local',
        },
        { status: 500 },
      );
    }

    const resendResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CSNPT Website <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: email,
          subject: `CSNPT — ${subject}`,
          text: [
            `Nom: ${name}`,
            `Email: ${email}`,
            `Sujet: ${subject}`,
            '',
            'Message:',
            message,
          ].join('\n'),
        }),
      },
    );

    const data = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      console.error('RESEND ERROR:', data);

      return NextResponse.json(
        {
          message:
            data?.message ||
            data?.error?.message ||
            `Resend error ${resendResponse.status}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('CONTACT API ERROR:', error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Erreur serveur inconnue.',
      },
      { status: 500 },
    );
  }
}