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
    <>
      <div className="relative w-full">
        <img
          src="/bluebg.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Event Details
        </h2>
      </div>
      <section className="mt-16 mb-20 px-10 flex flex-col min-h-screen items-center">
        <div className="relative w-full max-w-6xl h-96 rounded-3xl overflow-hidden shadow">
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
        <div className="w-full max-w-6xl space-y-5 my-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-[#192f59] font-bold">
              {eventIdData?.title}
            </h1>
            {(currentUser?.role === "admin" || currentUser?.role === "industry" || currentUser?.role === "university") && (
              <div className="flex items-center space-x-3">
                <Link href={`/event/editEvent/${eventIdData?.id}`}>
                  <PencilSquareIcon className="h-7 w-7 text-[#192f59] hover:text-[#2f4369]" />
                </Link>
                <DeleteAlertBox id={eventIdData?.id as string} />
              </div>
            )}
          </div>
          <p className="text-semibold text-[#2f4369]">
            {eventIdData?.description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10 max-w-4xl w-full">
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Venue</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.venue || "No venue provided"}
            </p>
          </div>
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Date</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.date
                ? new Date(eventIdData.date).toLocaleDateString("en-GB")
                : "No date provided"}
            </p>
          </div>
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Event Level</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.courseLevel || "No event level provided"}
            </p>
          </div>
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Number of People (Service)</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.numberOfPeople || "No service provided"}
            </p>
          </div>
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Credit Hour</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.creditHour || "No credit hours provided"}
            </p>
          </div>
          <div className="flex-col justify-center rounded-lg p-5 shadow shadow-md bg-white">
            <h2 className="text-[#2f4369] font-semibold">Event Type</h2>
            <p className="text-[#2f4369]">
              {eventIdData?.type || "No event type provided"}
            </p>
          </div>
        </div>
        <RegisterServiceButton
          userId={String(currentUser?.userId ?? "")}
          eventId={eventIdData?.id ?? ""}
          numberOfPeople={eventIdData?.numberOfPeople ?? 0}
        />
      </section>
    </>
  );
};

export default EventId;
