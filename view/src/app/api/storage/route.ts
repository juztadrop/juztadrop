import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const res = await fetch(`${API_URL}/storage`, {
      method: 'POST',
      headers: {
        Cookie: `sessionToken=${token}`,
      },
      body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = json?.error;
      return NextResponse.json(
        { error: err?.message || err?.error?.message || 'Upload failed' },
        { status: res.status }
      );
    }
    return NextResponse.json(json?.data ?? json);
  } catch (error) {
    console.error('Storage upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
