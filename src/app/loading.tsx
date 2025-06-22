"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-blue-50">
      {/* Hero Section Skeleton */}
      <section className="flex max-w-7xl mx-auto px-10 items-center justify-between pt-20 pb-10 flex-col md:flex-row gap-10">
        {/* Left: Text content */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-5 w-1/3" /> {/* Welcome line */}
          <Skeleton className="h-5 w-4/5" /> {/* Main heading line 1 */}
          <Skeleton className="h-5 w-2/3" /> {/* Main heading line 2 */}
          <Skeleton className="h-5 w-full mt-4" /> {/* Supporting text */}
        </div>

        {/* Right: Image */}
        <div className="flex-shrink-0">
          <Skeleton className="h-[300px] w-[600px] rounded-3xl" />
        </div>
      </section>
    </div>
  );
}
