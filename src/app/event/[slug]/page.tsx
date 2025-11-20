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
    <Image
      src="/blueBackground.jpg"
      alt="Header Background"
      className="w-full h-32 md:h-40 opacity-50 object-cover"
      width={1920}
      height={200}
    />
    <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] 
                   text-3xl font-bold bg-blue-50/30">
      Event Details
    </h2>
  </div>
  <section className="mt-10 md:mt-16 mb-20 flex flex-col min-h-screen items-center">
  <div className="w-full max-w-7xl px-10">
    <div className="relative w-full h-60 md:h-96 rounded-2xl overflow-hidden shadow">
      {eventIdData?.eventImage ? (
        <Image
          src={`data:${eventIdData.eventImage.contentType};base64,${eventIdData.eventImage.data.toString("base64")}`}
          alt={eventIdData.title}
          fill
          className="object-cover"
        />
      ) : (
        <Image
          src="/isn.png"
          alt="Event Default Image"
          fill
          className="object-cover"
        />
      )}
    </div>
        </div>
    <div className="w-full max-w-7xl px-10 space-y-5 my-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h1 className="text-2xl text-[#192f59] font-bold">
          {eventIdData?.title}
        </h1>
        {(currentUser?.role === "admin" ||
          currentUser?.role === "industry" ||
          currentUser?.role === "university") && (
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
    <div className=" px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
      {[
        { title: "Venue", value: eventIdData?.venue },
        {
          title: "Date",
          value: eventIdData?.date
            ? new Date(eventIdData.date).toLocaleDateString("en-GB")
            : "",
        },
        { title: "Event Level", value: eventIdData?.courseLevel },
        { title: "Number of People", value: eventIdData?.numberOfPeople },
        { title: "Credit Hour", value: eventIdData?.creditHour },
        { title: "Event Type", value: eventIdData?.type },
      ].map((item, index) => (
        <div
          key={index}
          className="rounded-xl p-5 shadow bg-white flex flex-col space-y-1"
        >
          <h2 className="text-[#2f4369] font-semibold">{item.title}</h2>
          <p className="text-[#2f4369]">
            {item.value || "Not provided"}
          </p>
        </div>
      ))}
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
