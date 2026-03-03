export interface OpportunitiesHeroProps {
  isLoading: boolean;
  total: number;
}

export function OpportunitiesHero({ isLoading, total }: OpportunitiesHeroProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-jad-foreground sm:text-4xl">
        {isLoading ? (
          'Opportunities'
        ) : (
          <>
            <span className="text-jad-primary">{total}</span>{' '}
            {total === 1 ? 'opportunity' : 'opportunities'}, waiting for you
          </>
        )}
      </h1>
      <p className="mx-auto mt-2 max-w-lg text-foreground/60">
        Find volunteering opportunities that match your interests. Filter by location, mode, or
        cause.
      </p>
    </div>
  );
}
