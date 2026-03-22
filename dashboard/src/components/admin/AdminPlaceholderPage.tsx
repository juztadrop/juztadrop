import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/common';
import { FileQuestion } from 'lucide-react';

interface AdminPlaceholderPageProps {
  title: string;
  description: string;
}

/** Empty section placeholder until features ship (same card language as view dashboards). */
export function AdminPlaceholderPage({ title, description }: AdminPlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-jad-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="border-dashed border-foreground/15 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/50">
            <FileQuestion className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">Coming soon</CardTitle>
            <CardDescription>This area is not wired up yet.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use the sidebar to navigate. Content for this section will be added in a later
            iteration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
