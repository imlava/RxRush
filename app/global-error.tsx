'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Application Error</h1>
            <p className="text-gray-600 mb-8">We apologize for the inconvenience.</p>
            <div className="space-x-4">
              <Button onClick={reset} variant="default">Try again</Button>
              <Link href="/">
                <Button variant="outline">Return Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}