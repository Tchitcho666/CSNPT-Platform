import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getDatabaseClient } from '@/lib/server/db';
import { isAdminSessionValid } from '@/lib/server/admin-session';

const fields = { diploma: 'diplomaFile', patente: 'patenteFile', rne: 'rneFile' } as const;
type Kind = keyof typeof fields;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; kind: string }> }) {
  const cookieStore = await cookies();
  const isValid = await isAdminSessionValid();
  if (process.env.NODE_ENV !== 'production') {
    console.info('Admin session cookie present:', Boolean(cookieStore.get('csnpt-admin-session')));
    console.info('Admin session valid:', isValid);
  }
  if (!isValid) return new NextResponse('Unauthorized', { status: 401 });
  const { id, kind: rawKind } = await params;
  if (!(rawKind in fields)) return new NextResponse('Not found', { status: 404 });
  const kind = rawKind as Kind;
  const request = await getDatabaseClient().adhesionRequest.findUnique({ where: { id } });
  const storedFile = request?.[fields[kind]];
  if (!storedFile || !/^[a-f0-9-]+-(diplomaFile|patenteFile|rneFile)\.(pdf|jpg|png)$/.test(storedFile)) {
    return new NextResponse('Not found', { status: 404 });
  }
  try {
    const file = await readFile(path.join(process.cwd(), 'private_uploads', 'adhesions', storedFile));
    const type = storedFile.endsWith('.pdf') ? 'application/pdf' : storedFile.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return new NextResponse(file, { headers: { 'Content-Type': type, 'Content-Disposition': `attachment; filename="${storedFile}"`, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
