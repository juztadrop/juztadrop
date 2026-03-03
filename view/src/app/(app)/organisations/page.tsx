'use client';

import Link from 'next/link';
import { Building2, Plus } from 'lucide-react';
import { useNgo } from '@/contexts/NgoContext';
import { Skeleton } from '@/components/ui/skeleton';
import { OrganisationCard } from '@/components/organisations/OrganisationCard';

export default function OrganisationsPage() {
  const { organizations, isLoading } = useNgo();

  if (isLoading) {
    return (
      <div className="container">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-jad-foreground sm:text-3xl">
            My Organizations
          </h1>
          <p className="mt-1 text-foreground/70">
            Manage your organizations and create opportunities
          </p>
        </div>
        <Link
          href="/organisations/create"
          className="inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-jad-primary/25 hover:bg-jad-dark"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Create Organization
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jad-primary/20 bg-jad-mint/20 py-16 text-center">
          <Building2 className="h-12 w-12 text-jad-primary/40" aria-hidden />
          <p className="mt-4 font-medium text-jad-foreground">No organisations yet</p>
          <p className="mt-1 text-sm text-foreground/60">
            Create your first NGO to start posting opportunities
          </p>
          <Link
            href="/organisations/create"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-jad-dark"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Create Organization
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <OrganisationCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
