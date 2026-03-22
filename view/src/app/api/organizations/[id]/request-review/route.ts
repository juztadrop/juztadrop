import { NextRequest } from 'next/server';
import { organizationRequestReview } from '@/lib/api-handlers/handlers/organizations';

export const dynamic = 'force-dynamic';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return organizationRequestReview(id);
}
