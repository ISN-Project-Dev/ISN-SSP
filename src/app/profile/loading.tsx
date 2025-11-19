"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="my-20">
      <div className="max-w-7xl px-10 mx-auto">
        <div className="flex px-10 flex-col md:flex-row md:px-0 items-start gap-10">
          
          {/* Left side box skeleton (Profile card) */}
          <Skeleton className="h-[500px] w-full max-w-[256px] rounded-lg" />

          {/* Right side: 2 stacked box skeletons */}
          <div className="flex flex-col gap-10 w-full">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

        </div>
      </div>
    </div>
  );
}