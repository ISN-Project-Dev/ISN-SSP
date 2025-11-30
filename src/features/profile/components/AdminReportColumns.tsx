"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { updateReportAction } from "@/features/profile/servers/updateReportAction";

type AdminReportData = {
    id: string;
    reportName: string;
    eventTitle: string;
    username: string;
    status: string;
    downloadUrl: string | null;
};

export const AdminReportColumns: ColumnDef<AdminReportData>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent hover:text-gray-600"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Username
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "eventTitle",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent hover:text-gray-600"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Event Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "reportName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent hover:text-gray-600"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Report Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "status",
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
            const status = row.original.status;
            let label = "";
            let color = "";

            if (status === "Approved") {
                label = "Approved";
                color = "text-green-700 bg-green-100";
            } else if (status === "Rejected") {
                label = "Rejected";
                color = "text-red-700 bg-red-100";
            } else {
                label = "New";
                color = "text-yellow-700 bg-yellow-100";
            }

            return (
                <div className="flex items-center w-full">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-center w-20 ${color}`}>{label}</span>
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
                        <DropdownMenuItem
                            onClick={async () => {
                                if (!row.original.downloadUrl) {
                                    console.error("No file data found for this report.");
                                    return;
                                }

                                try {
                                    const base64 = row.original.downloadUrl.split(",")[1];
                                    const byteCharacters = atob(base64);
                                    const byteNumbers = new Array(byteCharacters.length);

                                    for (let i = 0; i < byteCharacters.length; i++) {
                                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                                    }

                                    const byteArray = new Uint8Array(byteNumbers);
                                    const blob = new Blob([byteArray], { type: "application/pdf" });
                                    const fileURL = URL.createObjectURL(blob);

                                    window.open(fileURL, "_blank");
                                } catch (error) {
                                    console.error("Failed to open PDF:", error);
                                }
                            }}
                        >
                            View
                        </DropdownMenuItem>
                        <form action={updateReportAction}>
                            <input
                                type="hidden"
                                name="id"
                                value={row.original.id}
                            />
                            <input
                                type="hidden"
                                name="status"
                                value="Approved"
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
                        <form action={updateReportAction}>
                            <input
                                type="hidden"
                                name="id"
                                value={row.original.id}
                            />
                            <input
                                type="hidden"
                                name="status"
                                value="Rejected"
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
        },
    },
];
