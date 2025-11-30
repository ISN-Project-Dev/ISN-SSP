"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type AdminEventData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  courseLevel: string;
  creditHour: number;
  startDate: Date | null;
  endDate: Date | null;
  eventCertificate: {
    filename: string;
  } | null;
};

function getEventStatus(startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) return { label: "Unknown", color: "bg-gray-200 text-gray-600" };

  const now = new Date();

  if (now < new Date(startDate)) {
    return { label: "Upcoming", color: "bg-green-100 text-green-700" };
  }

  if (now >= new Date(startDate) && now <= new Date(endDate)) {
    return { label: "Ongoing", color: "bg-blue-100 text-blue-700" };
  }

  return { label: "Ended", color: "bg-gray-100 text-gray-700" };
}

export const AdminEventDataColumns: ColumnDef<AdminEventData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "courseLevel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "creditHour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Credit Hour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "certificate",
    accessorKey: "eventCertificate.filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Certificate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-gray-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;
      const status = getEventStatus(startDate, endDate);

      return (
        <div className="flex items-center w-full">
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-center w-24 ${status.color}`}>
            {status.label}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/event/${event.slug}`}
                className="w-full"
              >
                View Event
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/events/${event.slug}/statistics`}
                className="w-full"
              >
                View Statistics
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // Data Action
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const adminEvent = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(adminEvent.id)}
  //           >
  //             Copy Admin Event ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
