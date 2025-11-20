import React from "react";
import prisma from "@/databases/db";
import EventCard from "@/features/event/components/EventCard";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default async function Home() {
  const eventDataRaw = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      eventImage: {
        select: {
          id: true,
          contentType: true,
        },
      },
      // eventCertificate: true,
    },
    orderBy: { date: "asc" },
    take: 6,
  });

  const eventData = eventDataRaw.map((event) => ({
    ...event,
    eventImageUrl: event.eventImage
      ? `/api/event-image/${event.eventImage.id}?t=${new Date(event.updatedAt).getTime()}`
      : null,
  }));

  const benefits = [
    "Participate in exclusive events",
    "Earn official certificates",
    "Grow through workshops",
    "Build lasting friendships",
    "Celebrate your achievements",
    "Be part of a vibrant community",
  ]

  return (
    <div className="bg-blue-50">
      <section className="max-w-7xl mx-auto px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="flex justify-center">
            <Image
              src="/isnPhoto.jpg"
              alt="Hero"
              width={600}
              height={400}
              className="rounded-3xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="max-w-xl">
            <p className="text-lg text-[#192f58] font-semibold uppercase">
              Welcome to your SKS Student Portal
            </p>
            <h1 className="mt-4 text-3xl font-bold text-[#192f59] sm:text-4xl">
              Your one–stop platform for sports events, competitions, and workshops!
            </h1>
            <p className="mt-6 text-[#2f4369]">
              Let’s explore exciting events and grow together through sports and skills.
            </p>
            <Link href="/event">
              <button className="mt-6 px-6 py-3 rounded-full bg-[#192f59] text-white text-sm hover:bg-[#2f4369]">
                Explore more →
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto space-y-12 px-10 py-20">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-[#192f59] sm:text-5xl">
          Upcoming Events
        </h2>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {eventData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      {/* Content section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-[#192f59] sm:text-5xl">
                Our journey
              </h2>
              <p className="mt-6 text-xl text-[#2f4369]">
                Discover highlights from our past sports events, competitions, and workshops.
              </p>
              <p className="mt-6 text-base text-[#2f4369]">
                From personal achievements to unforgettable group moments, our journey showcases
                the vibrant experiences students have enjoyed through active participation
                and teamwork.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/eventPhoto.jpg"
                alt="Event Highlight"
                width={740}
                height={530}
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Cta section */}
      <section className="py-20">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-10">
            <div className="bg-[#192f59] flex flex-col lg:flex-row items-center gap-16 px-6 py-16 rounded-3xl lg:py-20 xl:gap-x-20 xl:px-20 w-full shadow-xl">
              <Image
                src="/eventPhoto2.jpg"
                alt=""
                width={600}
                height={600}
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              />

              <div className="w-full flex-auto">
                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Ready to join your next event?
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                  Don’t miss your chance to take part in exciting events, develop your skills, and earn recognition —
                  all while connecting with a community of passionate students.
                </p>
                <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-white text-base">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <CheckCircleIcon aria-hidden="true" className="h-7 w-5 flex-none" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link href="/event" className="text-sm font-semibold text-blue-100">
                    See our events <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
