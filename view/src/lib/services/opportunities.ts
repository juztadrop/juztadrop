import { apiRequest } from '@/lib/api';

export interface OpportunityListItem {
  id: string;
  title: string;
  organisation: string;
  location: string;
  dateRange: string;
  timeRange: string;
  category: string;
}

export interface FetchOpportunitiesParams {
  location?: string;
  category?: string;
  date?: string;
}

/**
 * Fetch opportunities from API. Placeholder for when backend is ready.
 */
export async function fetchOpportunities(
  params?: FetchOpportunitiesParams
): Promise<OpportunityListItem[]> {
  const searchParams = new URLSearchParams(params as Record<string, string>);
  const query = searchParams.toString();
  const endpoint = query ? `/opportunities?${query}` : '/opportunities';
  return apiRequest<OpportunityListItem[]>(endpoint);
}
