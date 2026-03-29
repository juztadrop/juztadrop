import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBackendUrl, getBackendErrorHint, getApiErrorMessage } from '@/lib/api-proxy';

export const dynamic = 'force-dynamic';

async function parseBackendBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text.trim() || 'Request failed' };
  }
}

/** Proxy moderator API calls to backend with session cookie. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathname = path?.length ? path.join('/') : '';
  const search = request.nextUrl.searchParams.toString();
  const url = `${getBackendUrl()}/moderator/${pathname}${search ? `?${search}` : ''}`;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: { Cookie: `sessionToken=${token}` },
      cache: 'no-store',
    });
    const data = await parseBackendBody(res);
    if (!res.ok) {
      const message = getApiErrorMessage(data, 'Request failed');
      return NextResponse.json(
        typeof data === 'object' && data !== null && !Array.isArray(data)
          ? { ...data, error: message }
          : { error: message },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Moderator proxy GET error:', error);
    const hint = getBackendErrorHint(error);
    return NextResponse.json(
      { error: 'Request failed', hint: process.env.NODE_ENV === 'development' ? hint : undefined },
      { status: 502 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathname = path?.length ? path.join('/') : '';

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const res = await fetch(`${getBackendUrl()}/moderator/${pathname}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `sessionToken=${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const data = await parseBackendBody(res);
    if (!res.ok) {
      const message = getApiErrorMessage(data, 'Request failed');
      return NextResponse.json(
        typeof data === 'object' && data !== null && !Array.isArray(data)
          ? { ...data, error: message }
          : { error: message },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Moderator proxy PATCH error:', error);
    const hint = getBackendErrorHint(error);
    return NextResponse.json(
      { error: 'Request failed', hint: process.env.NODE_ENV === 'development' ? hint : undefined },
      { status: 502 }
    );
  }
}
