"use client";
import { useParams } from 'next/navigation';

export default function PagesSlugPage() {
  const params = useParams();
  
  return (
    <div className="p-8 bg-white dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold text-primary dark:text-white mb-4">
        Page: {params.slug}
      </h1>
      <p className="text-primary/70 dark:text-white/70">
        This is a dynamic page route for: {params.slug}
      </p>
    </div>
  );
}