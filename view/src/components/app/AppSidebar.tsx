'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Heart,
  Building2,
  UserCircle,
  LogOut,
  X,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/use-auth';
import { useClickOutside } from '@/hooks';
import { cn } from '@/lib/common';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/opportunities', label: 'Opportunities', icon: Heart },
  { href: '/onboarding', label: 'Onboarding', icon: Compass },
  { href: '/organisations/create', label: 'Create NGO', icon: Building2 },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export function AppSidebar({ open, onClose, isMobile }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const sidebarRef = useRef<HTMLElement>(null);
  useClickOutside(sidebarRef, isMobile && open, onClose);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col border-r border-foreground/10 bg-white transition-transform duration-300 ease-out',
          isMobile
            ? 'w-72 -translate-x-full shadow-xl'
            : 'w-64 translate-x-0',
          isMobile && open && 'translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b border-foreground/5 px-4 sm:h-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-lg font-bold tracking-tight"
            onClick={isMobile ? onClose : undefined}
          >
            <span className="text-jad-foreground">juzt</span>
            <span className="text-jad-primary">a</span>
            <span className="text-jad-accent">drop</span>
          </Link>
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-jad-mint/60 hover:text-jad-foreground"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {sidebarLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-jad-mint text-jad-foreground'
                    : 'text-foreground/70 hover:bg-jad-mint/50 hover:text-jad-foreground'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-foreground/5 p-3">
          <div className="mb-2 rounded-xl px-3 py-2">
            <p className="truncate text-xs font-medium text-jad-foreground">
              {user?.name || user?.email}
            </p>
            <p className="truncate text-xs text-foreground/50">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              if (isMobile) onClose();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
