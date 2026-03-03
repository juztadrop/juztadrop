import Link from 'next/link';
import { Heart, Building2 } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="mb-10 flex flex-wrap gap-4">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2 rounded-full bg-jad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-jad-primary/25 transition-all hover:bg-jad-dark"
      >
        <Heart className="h-4 w-4" aria-hidden />
        Find volunteering
      </Link>
      <Link
        href="/organisations/create"
        className="inline-flex items-center gap-2 rounded-full border-2 border-jad-primary bg-white px-5 py-2.5 text-sm font-semibold text-jad-primary transition-all hover:bg-jad-mint/50"
      >
        <Building2 className="h-4 w-4" aria-hidden />
        Create an NGO
      </Link>
    </div>
  );
}
