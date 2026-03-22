import { AdminAppShell } from '@/components/admin';

/**
 * Authenticated admin area - mirrors `view` `app/(app)/layout.tsx` wrapping a client shell.
 */
export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  return <AdminAppShell>{children}</AdminAppShell>;
}
