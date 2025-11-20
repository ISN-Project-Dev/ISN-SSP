"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { updateServiceAction } from "@/features/event/servers/updateServiceAction";

type ApplyServiceData = {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  participationType: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
  event: {
    title: string;
  };
};

export const ApplyServiceColumns: ColumnDef<ApplyServiceData>[] = [
  {
    id: "username",
    accessorFn: (row) => row.user.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "eventTitle",
    accessorKey: "event.title",
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
      const status = row.original.status;
      const color =
        status === "approved"
          ? "text-green-700 bg-green-100"
          : status === "rejected"
            ? "text-red-700 bg-red-100"
            : "text-yellow-700 bg-yellow-100";

      return (
        <div className="flex items-center w-full">
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-center w-20 ${color}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ApplyServiceActionsCell row={row} />,
  },
];

function ApplyServiceActionsCell({ row }: { row: any }) {
  const [_data, action, _isPending] = useActionState(updateServiceAction, undefined);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={action}>
          <input
            type="hidden"
            name="id"
            value={row.original.id}
          />
          <input
            type="hidden"
            name="userId"
            value={row.original.userId}
          />
          <input
            type="hidden"
            name="eventId"
            value={row.original.eventId}
          />
          <input
            type="hidden"
            name="status"
            value="approved"
          />
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="w-full text-left cursor-pointer"
            >
              Approve
            </button>
          </DropdownMenuItem>
        </form>
        <form action={action}>
          <input
            type="hidden"
            name="id"
            value={row.original.id}
          />
          <input
            type="hidden"
            name="userId"
            value={row.original.userId}
          />
          <input
            type="hidden"
            name="eventId"
            value={row.original.eventId}
          />
          <input
            type="hidden"
            name="status"
            value="rejected"
          />
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="w-full text-left cursor-pointer"
            >
              Reject
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

