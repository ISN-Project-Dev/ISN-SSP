"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserAnnouncementTable from "./UserAnnouncementTable";
import { Plus } from "lucide-react";

type Announcement = {
  id: string;
  slug: string;
  title: string;
  type: "general" | "event";
  createdAt: string;
  event?: { title: string };
};

type Props = {
  general: Announcement[];
  event: Announcement[];
  currentUser: { role: string } | null;
};

export default function AnnouncementTabs({ general, event, currentUser }: Props) {
  return (
    <>
      {/* Header Image + Title */}
      <div className="relative w-full">
        <img
          src="/bluebg.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Announcements
        </h2>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 py-10">


        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
        <div className="w-full mb-6 flex items-center justify-between">
          <TabsList className="grid border h-10 w-full max-w-sm grid-cols-2 bg-white">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=inactive]:text-black hover:bg-gray-100"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="event"
              className="data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=inactive]:text-black hover:bg-gray-100"
            >
              Event Related
            </TabsTrigger>
          </TabsList>
        {["admin", "industry", "university"].includes(currentUser?.role ?? "") && (
            <a href="/announcement/create">
              <button className="flex items-center gap-2 h-10 text-sm px-5 py-2 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">
                <Plus className="h-4 w-4" strokeWidth={2.5}/>
                New Announcement
              </button>
            </a>
        )}
        </div>
          <TabsContent value="general">
            <UserAnnouncementTable data={general} type="general" />
          </TabsContent>

          <TabsContent value="event">
            <UserAnnouncementTable data={event} type="event" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
