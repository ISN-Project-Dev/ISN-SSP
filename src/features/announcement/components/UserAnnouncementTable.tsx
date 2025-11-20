"use client";

import { DataTable } from "@/components/ui/DataTable";
import { UserAnnouncementColumns } from "./UserAnnouncementColumns";

type Props = {
  data: any[];
  type: "general" | "event";
};

export default function ClientAnnouncementTable({ data, type }: Props) {
  return (
    <div className="my-2 w-full max-w-7xl overflow-auto">
      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">{type === "general" ? "General Announcements" : "Event Related Announcements"}</h2>
      <div className="rounded-lg border bg-white p-4 shadow-md">
        <DataTable
          filter="title"
          filterPlaceholder="Filter announcement title..."
          columns={UserAnnouncementColumns}
          data={data}
        />
      </div>
    </div>
  );
}
