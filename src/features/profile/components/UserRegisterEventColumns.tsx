"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

type UserRegisterEventData = {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    courseLevel: string;
    type: string | null;
    creditHour: number;
  };
  user: {
    slug: string;
  };
  feedback?: {
    id: string;
  } | null;
};

export const UserRegisterEventColumns = (isStudent: boolean): ColumnDef<UserRegisterEventData>[] => [
  {
    id: "eventTitle",
    accessorFn: (row) => row.event.title, 
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
        id: "courseLevel",
    accessorKey: "event.courseLevel",
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
        id: "eventType",
    accessorKey: "event.type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
        id: "creditHour",
    accessorKey: "event.creditHour",
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
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="hover:bg-transparent hover:text-gray-600"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
//   {
//     id: "creditGained",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           className="hover:bg-transparent hover:text-gray-600"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Credit Gained
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },    accessorFn: (row) => {
//       const baseCredit = row.event.creditHour ?? 0;
//       return isStudent ? baseCredit * 2 : baseCredit;
//     },
// cell: (info) => <span>{info.getValue() as number}</span>,
//   },
  {
    id: "actions",
    cell: ({ row }) => <UserRegisterEventActionsCell row={row} />,
  }
];

function UserRegisterEventActionsCell({ row }: { row: any }) {
  const router = useRouter();
  const eventRegistered = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/event/${eventRegistered.event.slug}`)}
        >
          View Event
        </DropdownMenuItem>
  {!eventRegistered.feedback && (
    <DropdownMenuItem
      onClick={() =>
        router.push(`/profile/${eventRegistered.user.slug}/feedback/${eventRegistered.id}`)
      }
    >
      Submit Feedback
    </DropdownMenuItem>
  )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
