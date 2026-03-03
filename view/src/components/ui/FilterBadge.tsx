import { X } from 'lucide-react';

export interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

export function FilterBadge({ label, onRemove }: FilterBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-jad-primary/20 bg-jad-mint/50 px-3 py-1 text-xs font-medium capitalize text-jad-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="ml-0.5 rounded-full p-0.5 text-foreground/40 transition-colors hover:bg-jad-primary/10 hover:text-jad-primary"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
