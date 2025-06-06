import React from "react";
import { verifySession } from "@/libs/dal";
import prisma from "@/databases/db";
import Image from "next/image";
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import DeleteAlertBox from "@/features/event/components/DeleteAlertBox";
import RegisterServiceButton from "@/features/event/components/RegisterServiceButton";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventId = async ({ params }: ParamProps) => {
  const currentUser = await verifySession();

  const eventIdData = await prisma.event.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
  });
  
  return (
    <section className="my-20 flex flex-col min-h-screen items-center">
      <div className="relative w-full max-w-4xl h-80 rounded-3xl overflow-hidden shadow">
        {eventIdData?.eventImage ? (
          <Image
            src={`data:${eventIdData.eventImage.contentType};base64,${eventIdData.eventImage.data.toString("base64")}`}
            width={800}
            height={200}
            alt={eventIdData.title}
            className="event-detail-image h-full w-full object-cover"
          />
        ) : (
          <Image
            src="/ISN.png"
            width={800}
            height={200}
            alt="Picture of the event image"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="w-full max-w-4xl space-y-5 my-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {eventIdData?.title}
          </h1>
          {(currentUser?.role === "admin" || currentUser?.role === "industry" || currentUser?.role === "university") && (
            <div className="flex items-center space-x-3">
              <Link href={`/event/editEvent/${eventIdData?.id}`}>
                <PencilSquareIcon className="h-7 w-7 text-[#192f59]" />
              </Link>
              <DeleteAlertBox id={eventIdData?.id as string} />
            </div>
          )}
        </div>
        <p className="text-semibold">
          {eventIdData?.description}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 max-w-4xl w-full">
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Venue</h2>
          <p className="text-gray-200">
            {eventIdData?.venue || "No venue provided"}
          </p>
        </div>
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Date</h2>
          <p className="text-gray-200">
            {eventIdData?.date
              ? new Date(eventIdData.date).toLocaleDateString("en-GB")
              : "No date provided"}
          </p>
        </div>
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Event Level</h2>
          <p className="text-gray-200">
            {eventIdData?.courseLevel || "No event level provided"}
          </p>
        </div>
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Number of People (Service)</h2>
          <p className="text-gray-200">
            {eventIdData?.numberOfPeople || "No service provided"}
          </p>
        </div>
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Credit Hour</h2>
          <p className="text-gray-200">
            {eventIdData?.creditHour || "No credit hours provided"}
          </p>
        </div>
        <div className="flex-col justify-center rounded-lg p-5 shadow bg-[#46587a] shadow-blue-950">
          <h2 className="text-gray-100 text-lg font-semibold">Event Type</h2>
          <p className="text-gray-200">
            {eventIdData?.type || "No event type provided"}
          </p>
        </div>
        {/* {eventIdData?.numberOfPeople && eventIdData?.numberOfPeople > 0 ? (
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="flex justify-center text-lg font-semibold text-gray-700">
              Service Required
            </h2>
            <p className="flex justify-center text-gray-600">
              {`Number of People: ${eventIdData.numberOfPeople}`}
            </p>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <RegisterServiceButton
        userId={String(currentUser?.userId ?? "")}
        eventId={eventIdData?.id ?? ""}
        numberOfPeople={eventIdData?.numberOfPeople ?? 0}
      />
    </section>
  );
};

export default EventId;
