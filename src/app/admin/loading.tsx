import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="admin-main flex flex-col items-center justify-center px-4 py-6 gap-6">
      <div className="mt-10 flex w-full max-w-7xl gap-6">
        <Skeleton className="stat-card-skeleton flex h-[150px] w-1/4 flex-col items-center justify-center rounded-lg" />
        <Skeleton className="stat-card-skeleton flex h-[150px] w-1/4 flex-col items-center justify-center rounded-lg" />
        <Skeleton className="stat-card-skeleton flex h-[150px] w-1/4 flex-col items-center justify-center rounded-lg" />
        <Skeleton className="stat-card-skeleton flex h-[150px] w-1/4 flex-col items-center justify-center rounded-lg" />
      </div>
      <div className="flex w-full max-w-7xl gap-6">
        <Skeleton className="data-card-skeleton h-[330px] w-1/2 rounded-lg" />
        <Skeleton className="data-card-skeleton h-[330px] w-1/2 rounded-lg" />
      </div>
      <div className="flex w-full max-w-7xl gap-6">
        <Skeleton className="data-card-skeleton h-[380px] w-1/2 rounded-lg" />
        <Skeleton className="data-card-skeleton h-[380px] w-1/2 rounded-lg" />
      </div>
    </main>
  );
}