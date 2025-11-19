"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-blue-50">
      <section className="max-w-7xl mx-auto px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <Skeleton className="w-full h-[420px] rounded-3xl" />
          <div className="max-w-xl space-y-6">
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-12 w-[150px] rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
