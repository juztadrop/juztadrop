'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LayoutWithHeader,
  Button,
} from '../lib/common';
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';
import { Building2, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const { moderator, isAuthenticated, isLoading, isReady, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login?redirect=/');
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || isLoading || !moderator) {
    return <DashboardSkeleton />;
  }

  return (
    <LayoutWithHeader
      headerProps={{
        nav: (
          <>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </>
        ),
      }}
    >
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {moderator.user.name || moderator.user.email}
          </p>
        </div>

        <Link href="/organizations">
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Organizations</CardTitle>
                  <CardDescription>Review and approve verification requests</CardDescription>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
          </Card>
        </Link>
      </div>
    </LayoutWithHeader>
  );
}
