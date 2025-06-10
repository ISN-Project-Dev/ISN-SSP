"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { formatInTimeZone } from 'date-fns-tz'

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
  /**
   *  Small helper to render one announcement row.
   */
  const Row = (
    a: Announcement,
    idx: number,
  ) => (
    <tr
      key={a.id}
      className="hover:bg-white/10 transition-colors"
    >
      <td className="py-3 px-4 text-center">{idx + 1}</td>

      <td className="py-3 px-4">
        <Link
          href={`/announcement/view/${a.slug}`}
          className="text-base font-medium hover:underline"
        >
          {a.title}
        </Link>
        {a.type === "event" && a.event?.title && (
          <p className="text-xs text-muted-foreground">
            Event Related: <strong> {a.event.title}</strong>
          </p>
        )}
      </td>

      <td className="py-3 px-4 text-right">
        {formatInTimeZone(new Date(a.createdAt), "Asia/Kuala_Lumpur", "dd MMMM yyyy, HH:mm")}
        {/* {new Date(a.createdAt).toLocaleDateString()} */}
      </td>
    </tr>
  );

  /**
   *  Gradient styles using Tailwind utilities.
   */
  const tableClass =
    "w-full overflow-hidden rounded-xl " +
    "bg-white";

  const headCell =
    "py-3 px-4 text-left font-semibold uppercase text-xs tracking-wider bg-blue-300 bg-opacity-40";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Announcements
        </h1>

        {/* mx-auto block rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1 */}

        {currentUser?.role === "admin" && (
          <Link href="/announcement/create">
            <button className="rounded bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1 px-4 py-2 text-white transition">
              Create Announcement
            </button>
          </Link>
        )}
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
            value="general"
            className="
              text-gray-700 
              h-10
              hover:bg-gray-200 
              data-[state=active]:bg-[#192f59] 
              data-[state=active]:text-white 
              data-[state=active]:shadow
              rounded-md
              transition
            "
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="event"
            className="
              text-gray-700 
              h-10
              hover:bg-gray-200 
              data-[state=active]:bg-[#192f59] 
              data-[state=active]:text-white 
              data-[state=active]:shadow
              rounded-md
              transition
            "
          >
            Event Related
          </TabsTrigger>
        </TabsList>

        {/* ---------- General Tab ---------- */}
        <TabsContent value="general">
          {general.length === 0 ? (
            <p className="text-muted-foreground text-center w-[860px]">
              No general announcements.
            </p>
          ) : (
            <div className={tableClass}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={`${headCell} text-center w-[60px]`}>No.</th>
                    <th className={`${headCell} w-[500px]`} >Announcement Title</th>
                    <th className={`${headCell} w-[300px] text-right`}>Created&nbsp;Date</th>
                  </tr>
                </thead>
                <tbody>
                  {general.map((a, i) => Row(a, i))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* ---------- Event Tab ---------- */}
        <TabsContent value="event">
          {event.length === 0 ? (
            <p className="text-muted-foreground text-center w-[860px]">
              No event-related announcements.
            </p>
          ) : (
            <div className={tableClass}>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={`${headCell} text-center w-[60px]`}>No.</th>
                    <th className={`${headCell} w-[500px]`}>Announcement Title</th>
                    <th className={`${headCell} w-[300px] text-right`}>Created&nbsp;Date</th>
                  </tr>
                </thead>
                <tbody>
                  {event.map((a, i) => Row(a, i))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
