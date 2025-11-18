"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-blue-50">
      {/* Hero Section Skeleton */}
      <section className="flex max-w-7xl mx-auto px-10 items-center justify-between pt-20 pb-10 flex-col md:flex-row gap-10">
        {/* Left: Text content */}
        <div className="flex-1 space-y-8">
          <Skeleton className="h-8 w-full" /> {/* Welcome line */}
          <Skeleton className="h-8 w-full" /> {/* Main heading line 1 */}
          <Skeleton className="h-8 w-full" /> {/* Main heading line 2 */}
          <Skeleton className="h-8 w-full" /> {/* Supporting text */}
        </div>

        {/* Right: Image */}
        <div className="flex-shrink-0">
          <Skeleton className="h-[400px] w-[600px] rounded-3xl" />
        </div>
      </section>
    </div>
  );
}
