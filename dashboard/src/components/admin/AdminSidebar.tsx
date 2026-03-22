'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/common';
import { ADMIN_MAIN_NAV, isAdminNavActive } from '@/lib/constants';
import TextLogo from '@/components/common/TextLogo';

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 md:h-auto md:border-0 md:px-4 md:pt-0">
        <Link href="/" className="inline-flex" onClick={onNavigate} aria-label="Admin home">
          <TextLogo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {ADMIN_MAIN_NAV.map((item) => {
          const Icon = item.icon;
          const active = isAdminNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-jad-primary/10 text-jad-dark'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <p className="border-t p-4 text-xs text-muted-foreground">Moderator console</p>
    </div>
  );
}
