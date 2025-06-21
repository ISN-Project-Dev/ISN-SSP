"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatInTimeZone } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Announcement = {
  id: string;
  slug: string;
  title: string;
  type: "general" | "event";
  createdAt: string;
  event?: { title: string };
};

export const UserAnnouncementColumns: ColumnDef<Announcement>[] = [
  {
    id: "rowNumber",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-gray-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Announcement Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <Link
          href={`/announcement/view/${row.original.slug}`}
          className="font-medium hover:underline text-blue-500"
        >
          {row.original.title}
        </Link>
        {row.original.type === "event" && row.original.event?.title && (
          <p className="text-xs text-muted-foreground">
            Related: <strong>{row.original.event.title}</strong>
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-gray-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) =>
      formatInTimeZone(new Date(row.original.createdAt), "Asia/Kuala_Lumpur", "dd MMM yyyy, HH:mm"),
  },
];
