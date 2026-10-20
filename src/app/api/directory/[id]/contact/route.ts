import { NextResponse } from "next/server";
import { getPublicPractitionerContactBySlug } from "@/lib/services/directory";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const contact = await getPublicPractitionerContactBySlug(id);
  if (!contact) {
    return NextResponse.json({ message: "Fiche introuvable." }, { status: 404 });
  }

  return NextResponse.json(contact, {
    headers: { "Cache-Control": "no-store" },
  });
}
