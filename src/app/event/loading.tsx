"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-blue-50">
      {/* Header Section */}
      <div className="relative w-full">
        <Skeleton className="w-full h-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-8 w-64 rounded-md" />
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto mt-16 mb-20 px-10 gap-5">
        {/* Search + Filter + Button */}
        <div className="mb-6 w-full flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Skeleton className="h-10 w-64 rounded-md" />
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>
        </div>

        {/* Event Card Grid */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
