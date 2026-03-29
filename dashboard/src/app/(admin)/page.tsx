'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from '@/lib/common';
import { ADMIN_MAIN_NAV } from '@/lib/constants';
import { moderatorApi } from '@/lib/moderator-api';
import { ArrowRight, Building2, ChevronRight, ClipboardList, Sparkles } from 'lucide-react';

function greetingForHour(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function displayFirstName(name: string | undefined, email: string | undefined): string {
  const n = name?.trim();
  if (n) return n.split(/\s+/)[0] ?? n;
  const local = email?.split('@')[0];
  return local?.replace(/[._]/g, ' ') || 'there';
}

const MODULE_ACCENTS: Record<string, string> = {
  '/organizations':
    'bg-jad-primary/15 text-jad-dark ring-1 ring-jad-primary/20 group-hover:bg-jad-primary/25',
  '/users':
    'bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 group-hover:bg-violet-500/15',
  '/applications': 'bg-sky-500/10 text-sky-800 ring-1 ring-sky-500/15 group-hover:bg-sky-500/15',
  '/reports': 'bg-amber-500/10 text-amber-900 ring-1 ring-amber-500/20 group-hover:bg-amber-500/15',
  '/settings':
    'bg-slate-500/10 text-slate-700 ring-1 ring-slate-400/20 group-hover:bg-slate-500/15',
};

export default function AdminOverviewPage() {
  const { moderator, isAuthenticated } = useAuth();
  const email = moderator?.user?.email;
  const fullName = moderator?.user?.name?.trim();
  const first = displayFirstName(fullName, email);

  const { data: pendingStats, isLoading: pendingLoading } = useQuery({
    queryKey: ['moderator', 'organizations', 'overview', 'pending'],
    queryFn: () =>
      moderatorApi.getOrganizations({ verificationStatus: 'pending', limit: 1, offset: 0 }),
    enabled: isAuthenticated,
  });

  const { data: allStats, isLoading: allLoading } = useQuery({
    queryKey: ['moderator', 'organizations', 'overview', 'all'],
    queryFn: () => moderatorApi.getOrganizations({ limit: 1, offset: 0 }),
    enabled: isAuthenticated,
  });

  const shortcuts = ADMIN_MAIN_NAV.filter((item) => item.href !== '/');
  const pendingTotal = pendingStats?.total ?? 0;
  const allOrgsTotal = allStats?.total ?? 0;

  return (
    <div className="space-y-10 pb-4">
      {/* Hero - aligned with view dashboard emphasis + jad brand tokens */}
      <section
        className={cn(
          'relative overflow-hidden rounded-2xl border border-jad-primary/15',
          'bg-gradient-to-br from-jad-mint/50 via-background to-background',
          'px-6 py-8 shadow-sm sm:px-10 sm:py-10'
        )}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-jad-primary/5 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center rounded-full border border-jad-primary/20 bg-background/80 px-3 py-1 text-xs font-medium text-jad-dark backdrop-blur-sm">
            Moderator console
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-jad-foreground sm:text-3xl lg:text-4xl">
              {greetingForHour()}, {first}
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Review verifications, keep records accurate, and ship a trustworthy directory for
              volunteers and NGOs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/organizations"
              className={cn(
                buttonVariants({ size: 'default' }),
                'inline-flex h-11 items-center gap-2 rounded-full border-0 bg-jad-primary px-6 text-white shadow-md shadow-jad-primary/25 hover:bg-jad-dark'
              )}
            >
              <Building2 className="h-4 w-4" aria-hidden />
              Review organizations
              <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
            </Link>
            <Link
              href="/users"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'inline-flex h-11 items-center gap-2 rounded-full border-jad-primary/35 text-jad-dark hover:bg-jad-mint/40'
              )}
            >
              Explore workspace
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* At-a-glance stats */}
      <section aria-labelledby="overview-stats-heading">
        <h2 id="overview-stats-heading" className="sr-only">
          At a glance
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-foreground/10 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Pending review
              </p>
              <CardTitle className="font-mono text-3xl tabular-nums text-jad-dark sm:text-4xl">
                {pendingLoading ? '…' : pendingTotal}
              </CardTitle>
              <CardDescription>Organizations awaiting a decision</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-foreground/10 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Organizations
              </p>
              <CardTitle className="font-mono text-3xl tabular-nums text-foreground sm:text-4xl">
                {allLoading ? '…' : allOrgsTotal}
              </CardTitle>
              <CardDescription>Total records in the directory</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-dashed border-foreground/15 bg-muted/20">
            <CardHeader className="pb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Applications
              </p>
              <CardTitle className="flex items-baseline gap-2 text-3xl font-semibold text-muted-foreground sm:text-4xl">
                <ClipboardList className="h-8 w-8 opacity-40" aria-hidden />
                <span className="font-mono tabular-nums">-</span>
              </CardTitle>
              <CardDescription>Pipeline metrics will appear here soon</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Module grid */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-jad-foreground sm:text-xl">
              Workspace modules
            </h2>
            <p className="text-sm text-muted-foreground">
              Jump into a section - same destinations as the sidebar.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const accent =
              MODULE_ACCENTS[item.href] ?? 'bg-muted text-foreground ring-1 ring-border';
            return (
              <Link key={item.href} href={item.href} className="group block h-full">
                <Card
                  className={cn(
                    'h-full border-foreground/10 bg-card/90 transition-all duration-200',
                    'hover:-translate-y-0.5 hover:border-jad-primary/25 hover:shadow-lg hover:shadow-jad-primary/5'
                  )}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-3">
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors',
                          accent
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <CardTitle className="text-lg leading-tight">{item.label}</CardTitle>
                        {item.description ? (
                          <CardDescription className="line-clamp-2 text-pretty">
                            {item.description}
                          </CardDescription>
                        ) : null}
                      </div>
                    </div>
                    <ChevronRight
                      className={cn(
                        'mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                        'group-hover:translate-x-0.5 group-hover:text-jad-primary'
                      )}
                      aria-hidden
                    />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="inline-flex items-center text-sm font-medium text-jad-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footnote */}
      <Card className="border-jad-primary/10 bg-gradient-to-r from-jad-mint/30 to-transparent">
        <CardHeader className="flex flex-row items-start gap-4 sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/80 shadow-sm ring-1 ring-jad-primary/10">
            <Sparkles className="h-5 w-5 text-jad-primary" aria-hidden />
          </div>
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-base">What&apos;s next</CardTitle>
            <CardDescription className="text-pretty sm:text-sm">
              New moderation tools will show up in the sidebar automatically. Prefer keyboard
              navigation? Use the sidebar - focus order follows the same modules as this grid.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
