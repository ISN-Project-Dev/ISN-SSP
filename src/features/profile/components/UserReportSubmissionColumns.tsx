"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import Link from "next/link";

type UserReportSubmissionData = {
  id: string;
  eventRegistrationId: string;
  userId: string | undefined;
  userSlug: string | undefined;
  eventTitle: string | undefined;
  status: string;
  submittedAt: Date | null;
};

export const UserReportSubmissionColumns: ColumnDef<UserReportSubmissionData>[] =
  [
    {
      accessorKey: "eventTitle",
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
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        return (
          <div className="flex items-center gap-3">
            {status === "Approved" && (
              <>
                <span>Submitted</span>
                <span className="rounded-lg bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  Approved
                </span>
              </>
            )}
            {status === "Rejected" && (
              <>
                <span>Submitted</span>
                <span className="rounded-lg bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  Rejected
                </span>
              </>
            )}
            {status === "Submitted" && (
              <>
                <span>Submitted</span>
                <span className="rounded-lg bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                  Pending
                </span>
              </>
            )}
            {status === "Not Submitted" && (
              <span>Not Submitted</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                href={`/profile/${row.original.userSlug}/report/${row.original.id}`}
              >
                <Button variant="ghost">Submit Report</Button>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
