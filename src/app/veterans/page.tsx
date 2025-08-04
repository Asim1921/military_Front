// src/app/veterans/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VeteransPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to about page with veterans section
    router.replace('/about?section=veterans');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to our veterans program...</p>
      </div>
    </div>
  );
}