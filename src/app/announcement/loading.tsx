"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-[#f2f7ff] min-h-screen">
      {/* Header image + title */}
      <div className="relative w-full">
        <Skeleton className="w-full h-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-8 w-64 rounded-md" />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 py-10 space-y-6">
        {/* Tabs + Button */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64 rounded-md" />
        </div>

        {/* Section Title */}
        <Skeleton className="h-7 w-72 rounded-md" />

        {/* Table skeleton block only */}
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    </div>
  );
}
