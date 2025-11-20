"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-[#f2f7ff] min-h-screen">
      <div className="relative w-full">
        <Skeleton className="w-full h-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-8 w-64 rounded-md" />
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto px-10 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-128 rounded-md" />
        </div>
        <Skeleton className="h-7 w-72 rounded-md" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    </div>
  );
}
