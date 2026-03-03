'use client';

import { useState, useEffect, useCallback } from 'react';
import { VOLUNTEER_CAUSES } from '@/lib/constants';
import type { VolunteerCardData } from '@/components/volunteers/VolunteerCard';
import type { CauseOption } from './useCauses';

export function causeLabelForVolunteers(value: string, causeOptions?: CauseOption[]): string {
  const options = causeOptions ?? VOLUNTEER_CAUSES;
  return options.find((c) => c.value === value)?.label ?? value;
}

interface VolunteersResponse {
  volunteers?: VolunteerCardData[];
  total?: number;
}

export function useVolunteersList() {
  const [volunteers, setVolunteers] = useState<VolunteerCardData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [causes, setCauses] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const activeFilterCount = causes.length + skills.length;

  const clearAllFilters = useCallback(() => {
    setCauses([]);
    setSkills([]);
  }, []);

  const fetchVolunteers = useCallback(async (): Promise<{
    items: VolunteerCardData[];
    total: number;
  }> => {
    const params = new URLSearchParams();
    if (causes.length) params.set('causes', causes.join(','));
    if (skills.length) params.set('skills', skills.join(','));

    const res = await fetch(`/api/volunteers?${params}`, { credentials: 'include' });
    const data: VolunteersResponse = await res.json();
    const items = data?.volunteers ?? [];
    const totalVal = data?.total ?? items.length;
    return { items, total: totalVal };
  }, [causes, skills]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchVolunteers()
      .then(({ items, total: t }) => {
        if (cancelled) return;
        setVolunteers(items);
        setTotal(t);
      })
      .catch(() => {
        if (!cancelled) setVolunteers([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchVolunteers]);

  const toggleSkill = useCallback((value: string) => {
    setSkills((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }, []);

  const toggleCause = useCallback((value: string) => {
    setCauses((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }, []);

  return {
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
  };
}
