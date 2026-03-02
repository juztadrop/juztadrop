/** Tailwind class helpers for status badges. */

export function getApplicationStatusClass(status: string): string {
  switch (status) {
    case 'approved':
      return 'bg-emerald-100 text-emerald-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-amber-100 text-amber-700';
  }
}

export function getOpportunityStatusClass(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'draft':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-red-100 text-red-700';
  }
}

export function getOrgVerificationStatusClass(status: string): string {
  switch (status) {
    case 'verified':
      return 'bg-emerald-100 text-emerald-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-amber-100 text-amber-700';
  }
}

/** My Opportunities page: completed uses blue. */
export function getMyOpportunityStatusClass(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'draft':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
