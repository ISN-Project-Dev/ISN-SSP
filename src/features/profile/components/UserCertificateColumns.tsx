"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type UserCertificateData = {
  id: string;
  filename: string;
  contentType: string;
  downloadUrl: string;
  generatedDate: Date | null;
  cecEarned: number;
};

export const UserCertificateColumns: ColumnDef<UserCertificateData>[] = [
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Certificate Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "generatedDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-gray-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Generated Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.original.generatedDate;

      if (!date) return <span className="text-gray-400 italic">Pending</span>;

      const formatted = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "cecEarned",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-gray-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CEC Earned
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const cec = row.original.cecEarned ?? 0;

      return <span className="font-medium text-[#192f59]">{cec}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const eventCertficate = row.original;

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
            <DropdownMenuItem
              onClick={() => {
                const downloadUrl = eventCertficate.downloadUrl;
                const filename = eventCertficate.filename;

                if (!downloadUrl || !downloadUrl.startsWith("data:")) {
                  console.error("Invalid Base64 URL or file not found.");

                  return;
                }

                try {
                  const link = document.createElement("a");
                  link.href = downloadUrl; // use the base64 data URL
                  link.download = filename; // set the filename for download
                  document.body.appendChild(link); // append link to the DOM (some browsers require this)
                  link.click(); // trigger the download
                  document.body.removeChild(link); // clean up the DOM
                } catch (error) {
                  console.error("Failed to download file:", error);
                }
              }}
            >
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
