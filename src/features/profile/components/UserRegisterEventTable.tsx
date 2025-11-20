"use client";

import { DataTable } from "@/components/ui/DataTable";
import { UserRegisterEventColumns } from "./UserRegisterEventColumns";

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

type Props = {
  isStudent: boolean;
  eventData: UserRegisterEventData[];
};

export default function UserRegisterEventTable({ isStudent, eventData }: Props) {
  return (
    <div className="user-registration-event-data-table-container my-2 w-full max-w-7xl overflow-auto">
      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">Event History</h2>
      <div className="inner-data-table max-w-[880px] p-px">
        <DataTable
          filter="eventTitle"
          columns={UserRegisterEventColumns(isStudent)}
          data={eventData}
        />
      </div>
    </div>
  );
}
