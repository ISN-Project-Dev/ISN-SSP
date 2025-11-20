import Link from "next/link";
import Image from "next/image";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";

type EventCardProps = {
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    venue: string | null;
    date: Date | null;
    courseLevel: string;
    type: string | null;
    creditHour: number;
    // eventCertificate: {
    //   filename: string;
    //   contentType: string;
    //   data: string;
    // } | null;
    eventImageUrl?: string | null;
  };
};

function formatDate(dateStr: Date) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });

  return { day, month };
}

export default function EventCard({ event }: EventCardProps) {
  const { day, month } = event.date ? formatDate(event.date) : { day: "--", month: "--" };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
      <Link href={`event/${event.slug}`}>
        <div className="relative">
          <div className="absolute top-2 left-2 rounded-md bg-white size-14 flex flex-col items-center border-2 border-[#192f59] justify-center shadow-lg text-center text-xs font-bold text-gray-700">
            <p className="text-lg">{day}</p>
            <p className="text-xs">{month}</p>
          </div>
          {event.eventImageUrl ? (
            <Image
              src={event.eventImageUrl}
              width={800}
              height={200}
              alt={event.title}
              className="event-image h-48 w-full object-cover"
            />
          ) : (
            <Image
              src="/isnEventImage.png"
              width={800}
              height={200}
              alt="Picture of the event image"
              className="h-48 w-full object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-md font-semibold text-[#192f59]">{event.title}</h2>
          <p className="text-sm h-10 text-gray-600 line-clamp-2 mt-1">{event.description}</p>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{event.creditHour} credit hour</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4 text-[#192f59]" />
              <span>{event.venue || "N/A"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}