/**
 * app/global-error.tsx — Root error boundary (Next.js required)
 *
 * This is the top-level error boundary that wraps the entire application.
 * The `html` and `body` tags MUST be rendered here when overriding
 * the root error component.
 */

'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-6 border border-destructive/50 rounded-lg max-w-md text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Application Error</h1>
            <p className="text-sm text-muted-foreground mb-4">
              {error.message || 'An unexpected error occurred.'}
            </p>
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
