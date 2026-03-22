'use client';

import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/lib/common';
import { useAuth } from '@/lib/auth';

interface AdminHeaderProps {
  onMenuOpen: () => void;
}

export function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const { moderator, logout } = useAuth();
  const label = moderator?.user?.name?.trim() || moderator?.user?.email || 'Moderator';

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="min-w-0 flex-1 md:flex-none">
        <p className="truncate text-sm text-muted-foreground md:hidden">{label}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden max-w-[200px] truncate text-sm text-muted-foreground md:inline">
          {label}
        </span>
        <Button variant="outline" size="sm" onClick={() => logout()} className="gap-1.5">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
