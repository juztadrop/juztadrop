'use client';

import { Users, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useVolunteersList, causeLabelForVolunteers } from '@/hooks/useVolunteersList';
import { useCauses } from '@/hooks';
import { VolunteerCard } from '@/components/volunteers/VolunteerCard';
import { Skeleton } from '@/components/ui/skeleton';
import { VOLUNTEER_SKILLS } from '@/lib/constants';
import { SearchableChipGroup } from '@/components/ui/form';
import { FilterBadge } from '@/components/ui';
import { cn } from '@/lib/common';

export default function VolunteersPage() {
  const { options: causeOptions } = useCauses();
  const {
    volunteers,
    total,
    isLoading,
    filtersOpen,
    setFiltersOpen,
    causes,
    skills,
    toggleCause,
    toggleSkill,
    activeFilterCount,
    clearAllFilters,
  } = useVolunteersList();

  return (
    <div className="container">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-jad-foreground sm:text-4xl">
          {isLoading ? (
            'Volunteers'
          ) : (
            <>
              <span className="text-jad-primary">{total}</span> {total === 1 ? 'person' : 'people'},
              united by purpose
            </>
          )}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-foreground/60">
          People making a difference in their communities. Filter by cause or skill to find
          volunteers.
        </p>
      </div>

      <div className="mb-6 flex items-center">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all',
            filtersOpen || activeFilterCount > 0
              ? 'border-jad-primary/30 bg-jad-mint/40 text-jad-primary'
              : 'border-foreground/15 bg-white/80 text-foreground/70 hover:border-jad-primary/30 hover:bg-jad-mint/20'
          )}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-jad-primary px-1.5 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={cn('h-3.5 w-3.5 transition-transform', filtersOpen && 'rotate-180')}
            aria-hidden
          />
        </button>
      </div>

      {activeFilterCount > 0 && !filtersOpen && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {causes.map((c) => (
            <FilterBadge
              key={c}
              label={causeLabelForVolunteers(c, causeOptions)}
              onRemove={() => toggleCause(c)}
            />
          ))}
          {skills.map((s) => (
            <FilterBadge key={s} label={s} onRemove={() => toggleSkill(s)} />
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-medium text-foreground/50 transition-colors hover:text-jad-primary"
          >
            Clear all
          </button>
        </div>
      )}

      {filtersOpen && (
        <div className="mb-8 space-y-5 rounded-2xl border border-foreground/10 bg-white/80 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-jad-foreground">Filter volunteers</h3>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-foreground/50 transition-colors hover:text-jad-primary"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-foreground/60">Causes</span>
            <SearchableChipGroup
              options={causeOptions}
              selected={causes}
              onChange={toggleCause}
              placeholder="Search causes…"
            />
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-foreground/60">Skills</span>
            <SearchableChipGroup
              options={VOLUNTEER_SKILLS.map((s) => ({ value: s, label: s }))}
              selected={skills}
              onChange={toggleSkill}
              placeholder="Search skills…"
              variant="mint"
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="status"
          aria-label="Loading volunteers"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : volunteers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jad-primary/20 bg-jad-mint/20 py-16 text-center">
          <Users className="h-12 w-12 text-jad-primary/40" aria-hidden />
          <p className="mt-4 font-medium text-jad-foreground">
            {activeFilterCount > 0 ? 'No volunteers match your filters' : 'No volunteers yet'}
          </p>
          <p className="mt-1 text-sm text-foreground/60">
            {activeFilterCount > 0
              ? 'Try adjusting your filters or check back later.'
              : 'Be the first to complete your volunteer profile and appear here.'}
          </p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-4 rounded-xl bg-jad-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-jad-primary/25 transition-all hover:bg-jad-dark"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {volunteers.map((v) => (
            <VolunteerCard key={v.id} volunteer={v} />
          ))}
        </div>
      )}
    </div>
  );
}
