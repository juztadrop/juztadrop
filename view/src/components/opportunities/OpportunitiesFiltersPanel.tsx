'use client';

import { LOCATIONS } from '@/lib/constants';
import { cn } from '@/lib/common';
import type { CauseOption } from '@/hooks/useCauses';

export interface OpportunitiesFiltersPanelProps {
  city: string;
  setCity: (v: string) => void;
  mode: string;
  setMode: (v: string) => void;
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
  causes: string[];
  toggleCause: (value: string) => void;
  causeOptions: CauseOption[];
  activeFilterCount: number;
  clearAllFilters: () => void;
}

export function OpportunitiesFiltersPanel({
  city,
  setCity,
  mode,
  setMode,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  causes,
  toggleCause,
  causeOptions,
  activeFilterCount,
  clearAllFilters,
}: OpportunitiesFiltersPanelProps) {
  return (
    <div className="mb-8 space-y-5 rounded-2xl border border-foreground/10 bg-white/80 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold text-jad-foreground"
          id="opportunities-filters-heading"
        >
          Filter opportunities
        </h3>
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

      <div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        role="group"
        aria-labelledby="opportunities-filters-heading"
      >
        <div>
          <label
            htmlFor="filter-location"
            className="mb-1.5 block text-xs font-medium text-foreground/60"
          >
            Location
          </label>
          <select
            id="filter-location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-foreground/15 bg-white px-3.5 py-2.5 text-sm focus:border-jad-primary/40 focus:outline-none focus:ring-2 focus:ring-jad-primary/20"
          >
            <option value="">All cities</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium text-foreground/60">Mode</span>
          <div
            className="flex rounded-xl border border-foreground/15 bg-white p-0.5"
            role="group"
            aria-label="Opportunity mode"
          >
            {['', 'onsite', 'remote', 'hybrid'].map((m) => (
              <button
                key={m || 'all'}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  'flex-1 rounded-lg px-2 py-2 text-xs font-medium capitalize transition-all',
                  mode === m
                    ? 'bg-jad-primary text-white shadow-sm'
                    : 'text-foreground/60 hover:text-foreground/80'
                )}
              >
                {m || 'All'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="filter-date-from"
            className="mb-1.5 block text-xs font-medium text-foreground/60"
          >
            From date
          </label>
          <input
            id="filter-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-xl border border-foreground/15 bg-white px-3.5 py-2.5 text-sm focus:border-jad-primary/40 focus:outline-none focus:ring-2 focus:ring-jad-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="filter-date-to"
            className="mb-1.5 block text-xs font-medium text-foreground/60"
          >
            To date
          </label>
          <input
            id="filter-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-xl border border-foreground/15 bg-white px-3.5 py-2.5 text-sm focus:border-jad-primary/40 focus:outline-none focus:ring-2 focus:ring-jad-primary/20"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium text-foreground/60">Causes</span>
        <div className="flex flex-wrap gap-2">
          {causeOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleCause(value)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                causes.includes(value)
                  ? 'bg-jad-primary text-white shadow-md shadow-jad-primary/20'
                  : 'border border-foreground/15 bg-white text-foreground/70 hover:border-jad-primary/30 hover:bg-jad-mint/30'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
