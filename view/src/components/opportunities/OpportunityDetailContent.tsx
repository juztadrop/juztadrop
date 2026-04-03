'use client';
import { Calendar, Clock, Mail, Phone, User, Award, DollarSign } from 'lucide-react';
import { LocationMapPreview } from '@/components/map/LocationMapPreview';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { formatDateRange } from '@/lib/date';
import type { OpportunityDetailOpportunity } from '@/hooks/useOpportunityDetail';
import FloatingApplyButton from './FloatingApplyButton';
import { VolunteerCard, VolunteerCardData } from '@/components/volunteers/VolunteerCard';
import { useState } from 'react';

export interface OpportunityDetailContentProps {
  opportunity: OpportunityDetailOpportunity;
  addressStr: string;
}

export const DUMMY_VOLUNTEERS: VolunteerCardData[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    causes: ['education'],
    skills: [{ name: 'Teaching', expertise: 'intermediate' }],
  },
  {
    id: '2',
    name: 'Priya Nair',
    email: 'priya@example.com',
    causes: ['environment'],
    skills: [{ name: 'Research', expertise: 'advanced' }],
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    causes: ['health'],
    skills: [{ name: 'First Aid', expertise: 'beginner' }],
  },
  {
    id: '4',
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    causes: ['women_empowerment'],
    skills: [{ name: 'Counseling', expertise: 'intermediate' }],
  },
  {
    id: '5',
    name: 'Karan Verma',
    email: 'karan@example.com',
    causes: ['education'],
    skills: [{ name: 'Coding', expertise: 'advanced' }],
  },
  {
    id: '6',
    name: 'Divya Iyer',
    email: 'divya@example.com',
    causes: ['animal_welfare'],
    skills: [{ name: 'Veterinary', expertise: 'intermediate' }],
  },
  {
    id: '7',
    name: 'Amit Joshi',
    email: 'amit@example.com',
    causes: ['environment'],
    skills: [{ name: 'Gardening', expertise: 'beginner' }],
  },
  {
    id: '8',
    name: 'Meera Pillai',
    email: 'meera@example.com',
    causes: ['health'],
    skills: [{ name: 'Nutrition', expertise: 'advanced' }],
  },
];

function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  return email ? email.slice(0, 2).toUpperCase() : '';
}

export function OpportunityDetailContent({
  opportunity,
  addressStr,
}: OpportunityDetailContentProps) {
  const volunteers = DUMMY_VOLUNTEERS;

  const [opportunityApplied, setOpportunityApplied] = useState(false);

  return (
    <div className="space-y-8 max-w-[630px] w-full m-auto">
      <FloatingApplyButton
        eventName={opportunity.title}
        setOpportunityApplied={setOpportunityApplied}
        opportunityApplied={opportunityApplied}
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
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
        <h2 className="mb-2 text-lg font-semibold text-jad-foreground">
          {DUMMY_VOLUNTEERS.length} People Joined
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      </div>

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
            className="bg-white"
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
