import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
} from 'lucide-react';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

/** Primary sidebar navigation (paths mirror `app/(admin)/` routes). */
export const ADMIN_MAIN_NAV: AdminNavItem[] = [
  {
    href: '/',
    label: 'Overview',
    icon: LayoutDashboard,
    description: 'Summary and quick access',
  },
  {
    href: '/organizations',
    label: 'Organizations',
    icon: Building2,
    description: 'Verification and org records',
  },
  {
    href: '/users',
    label: 'Users',
    icon: Users,
    description: 'Volunteer and moderator accounts',
  },
  {
    href: '/applications',
    label: 'Applications',
    icon: ClipboardList,
    description: 'Opportunity applications',
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: BarChart3,
    description: 'Analytics and exports',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'Workspace preferences',
  },
];

export function isAdminNavActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
