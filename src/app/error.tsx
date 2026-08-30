/**
 * app/error.tsx — Global error boundary with Doodle Aesthetics
 */

'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 font-kalam">
      <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white max-w-md w-full">
        <CardHeader className="bg-red-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-2xl text-[#e05252] font-bold">
            <AlertCircle className="h-6 w-6 text-[#e05252]" />
            Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-base text-gray-700 font-medium">{error.message}</p>
          <div className="flex gap-3">
            <Button onClick={reset} variant="outline" size="sm">
              🔄 Try Again
            </Button>
            <Button asChild size="sm">
              <Link href="/">
                <Home className="h-4 w-4 mr-1.5" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
