import { Calendar, Clock, Mail, Phone, User, Award, DollarSign } from 'lucide-react';
import { LocationMapPreview } from '@/components/map/LocationMapPreview';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { formatDateRange } from '@/lib/date';
import type { OpportunityDetailOpportunity } from '@/hooks/useOpportunityDetail';

export interface OpportunityDetailContentProps {
  opportunity: OpportunityDetailOpportunity;
  addressStr: string;
}

export function OpportunityDetailContent({
  opportunity,
  addressStr,
}: OpportunityDetailContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-jad-foreground sm:text-3xl">
          {opportunity.title}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-medium text-jad-primary">{opportunity.orgName}</span>
          {opportunity.orgVerificationStatus === 'verified' && <VerifiedBadge />}
        </div>
        {(opportunity.causeCategoryNames?.length ?? 0) > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {(opportunity.causeCategoryNames ?? []).map((c) => (
              <span
                key={c}
                className="rounded-full bg-jad-mint/50 px-2.5 py-0.5 text-xs font-medium text-jad-foreground"
              >
                {c.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Description</h2>
        <p className="whitespace-pre-wrap text-foreground/80">{opportunity.description}</p>
      </div>

      {(opportunity.requiredSkills?.length ?? 0) > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Required skills</h2>
          <div className="flex flex-wrap gap-2">
            {(opportunity.requiredSkills ?? []).map((s) => (
              <span
                key={s}
                className="rounded-full bg-foreground/10 px-3 py-1 text-sm text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {(opportunity.languagePreference ?? opportunity.genderPreference) && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Preferences</h2>
          <div className="flex flex-wrap gap-3 text-sm text-foreground/80">
            {opportunity.languagePreference != null && (
              <span>Language: {opportunity.languagePreference}</span>
            )}
            {opportunity.genderPreference != null && (
              <span>Gender: {opportunity.genderPreference.replace(/_/g, ' ')}</span>
            )}
          </div>
        </div>
      )}

      {(opportunity.stipendInfo ?? opportunity.isCertificateOffered) && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Benefits</h2>
          <div className="flex flex-wrap items-center gap-4">
            {opportunity.stipendInfo?.amount != null && (
              <span className="flex items-center gap-2 text-foreground/80">
                <DollarSign className="h-4 w-4 text-jad-primary" aria-hidden />₹
                {opportunity.stipendInfo.amount}
                {opportunity.stipendInfo.duration != null &&
                  ` (${opportunity.stipendInfo.duration})`}
              </span>
            )}
            {opportunity.isCertificateOffered && (
              <span className="inline-flex items-center gap-2 rounded-full bg-jad-mint/50 px-3 py-1 text-sm font-medium text-jad-foreground">
                <Award className="h-4 w-4 text-jad-primary" aria-hidden />
                Certificate offered
              </span>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Date & time</h2>
        <div className="flex flex-wrap gap-4 text-foreground/80">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-jad-primary" aria-hidden />
            {formatDateRange(opportunity.startDate, opportunity.endDate) || 'TBD'}
          </span>
          {(opportunity.startTime ?? opportunity.endTime) && (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-jad-primary" aria-hidden />
              {opportunity.startTime} – {opportunity.endTime}
            </span>
          )}
          {opportunity.opportunityMode != null && (
            <span className="rounded-full border border-foreground/20 px-2 py-0.5 text-sm">
              {opportunity.opportunityMode}
            </span>
          )}
        </div>
      </div>

      {(addressStr || opportunity.latitude != null) && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Location</h2>
          <LocationMapPreview
            latitude={opportunity.latitude}
            longitude={opportunity.longitude}
            address={addressStr || undefined}
            height={240}
          />
        </div>
      )}

      <div>
        <h2 className="mb-2 text-lg font-semibold text-jad-foreground">Contact</h2>
        <div className="space-y-2 text-foreground/80">
          {opportunity.contactName != null && (
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 text-jad-primary" aria-hidden />
              {opportunity.contactName}
            </p>
          )}
          {opportunity.contactEmail != null && (
            <a
              href={`mailto:${opportunity.contactEmail}`}
              className="flex items-center gap-2 text-jad-primary hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {opportunity.contactEmail}
            </a>
          )}
          {opportunity.contactPhoneNumber != null && (
            <a
              href={`tel:${opportunity.contactPhoneNumber}`}
              className="flex items-center gap-2 text-jad-primary hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {opportunity.contactPhoneNumber}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
