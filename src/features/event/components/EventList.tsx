"use client";

import { useState, useMemo } from "react";
import EventCard from "./EventCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SelectFilter } from "@/components/common/SelectFilter";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  eventData: any[];
  isAdmin: boolean;
};

export default function EventList({ eventData, isAdmin }: Props) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredEvents = useMemo(() => {
    return eventData.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "" || filterType === "all" ? true : event.type === filterType;
      return matchesTitle && matchesType;
    });
  }, [search, filterType, eventData]);

  return (
    <>
      <div className="relative w-full">
        <Image
          src="/bluebg.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
          width={1920}
          height={200}
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Events
        </h2>
      </div>
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-10 mb-20 px-10 gap-5">
        <div className="mb-6 w-full flex items-center justify-between">
          <div className="flex sm:flex-row gap-5 w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search event title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 pl-10 px-3 py-1 text-sm shadow transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-5 text-gray-400" />
            </div>
            <div className="w-48">
              <SelectFilter
                label="Event Type"
                name="eventType"
                options={[
                  { value: "all", label: "All Types" },
                  { value: "course", label: "Course" },
                  { value: "workshop", label: "Workshop" },
                  { value: "competition", label: "Competition" },
                ]}
                placeholder="Filter by category"
                defaultValue={filterType}
                onChange={setFilterType}
                className="h-10 bg-white  border-gray-300"
              />
            </div>
          </div>
          {isAdmin && (
            <Link href="/event/createEvent">
              <button className="flex items-center gap-2 h-10 text-sm px-5 py-2 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                New Event
              </button>
            </Link>
          )}
        </div>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}