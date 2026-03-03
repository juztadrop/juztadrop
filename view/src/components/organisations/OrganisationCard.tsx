import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getOrgVerificationStatusClass } from '@/lib/status';

export interface OrganisationCardProps {
  org: {
    id: string;
    orgName: string;
    verificationStatus: string;
    causes?: string[];
  };
}

export function OrganisationCard({ org }: OrganisationCardProps) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold text-jad-foreground">{org.orgName}</h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getOrgVerificationStatusClass(org.verificationStatus)}`}
        >
          {org.verificationStatus}
        </span>
      </div>
      {(org.causes?.length ?? 0) > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {(org.causes ?? []).slice(0, 3).map((c: string) => (
            <span
              key={c}
              className="rounded-full bg-jad-mint/50 px-2 py-0.5 text-xs text-jad-foreground"
            >
              {c.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/organisations/${org.id}/opportunities`}
          className="inline-flex items-center gap-1 rounded-xl border border-jad-primary px-3 py-2 text-sm font-medium text-jad-primary hover:bg-jad-mint/30"
        >
          View opportunities
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
        {org.verificationStatus === 'verified' && (
          <Link
            href={`/organisations/${org.id}/opportunities/create`}
            className="inline-flex items-center gap-1 rounded-xl bg-jad-primary px-3 py-2 text-sm font-medium text-white hover:bg-jad-dark"
          >
            Create opportunity
          </Link>
        )}
      </div>
    </div>
  );
}
