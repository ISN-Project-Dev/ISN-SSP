import React from "react";
import prisma from "@/databases/db";
import EventCard from "@/features/event/components/EventCard";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from '@heroicons/react/20/solid'


export default async function Home() {
  const eventDataRaw = await prisma.event.findMany({
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
    take: 6, // adjust as needed
  });

  const eventData = eventDataRaw.map((event) => ({
    ...event,
    eventImageUrl: event.eventImage
      ? `/api/event-image/${event.eventImage.id}`
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
      {/* Hero Section */}
      <section className="flex max-w-7xl mx-auto px-10 items-center justify-between pt-20 pb-10">
        <div className="max-w-3xl">
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
        {/* Image */}
        <div className="sm:block flex-shrink-0">
          <Image
            src="/isnphoto.jpg"
            alt="Hero"
            width={600}
            height={300}
            className="rounded-tl-3xl rounded-bl-3xl shadow-xl"
          />
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
      <div className="py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 pr-20 lg:w-full lg:max-w-2xl lg:pb-8">
              <h2 className="text-4xl lg:pt-20 font-semibold tracking-tight text-[#192f59] sm:text-5xl">Our journey</h2>
              <p className="mt-6 text-xl/8 text-[#2f4369]">
                Discover highlights from our past sports events, competitions, and workshops.
              </p>
              <p className="mt-6 text-base/7 text-[#2f4369]">
                From personal achievements to unforgettable group moments, our journey showcases the vibrant experiences students have enjoyed through active participation and teamwork.
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                  alt=""
                  src="/eventphoto1.jpg"
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img
                    alt=""
                    src="/eventphoto.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cta section */}
      <div className="py-20">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto bg-[#192f58] flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <img
                alt=""
                src="/eventphoto2.jpg"
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              />
              <div className="w-full flex-auto">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Ready to join your next event?
                </h2>
                <p className="mt-6 text-pretty text-lg/8 text-gray-300">
                    Don’t miss your chance to take part in exciting events, develop your skills, and earn recognition — all while connecting with a community of passionate students.
                </p>
                <ul role="list" className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-white sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <CheckCircleIcon aria-hidden="true" className="h-7 w-5 flex-none" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex">
                  <a href="/event" className="text-sm/6 font-semibold text-blue-100">
                    See our events <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          >
          </div>
        </div>
      </div>
      {/* <section className="bg-white py-10 px-6">
        <h2 className="text-center text-2xl font-bold text-[#192f59] mb-8">
          A Look into Our Journey
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-[1440px] mx-auto">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
      <section className="text-center py-10 bg-[#f2f7ff] px-6">
        <h2 className="text-2xl font-bold text-[#192f59] mb-2">
          Ready to join your next event?
        </h2>
        <p className="text-gray-600 mb-6">
          Don’t miss out on your chance to participate and earn certificates!
        </p>
        <Link href="/event">
          <button className="px-6 py-2 rounded-full bg-[#192f59] text-white text-sm hover:bg-[#2f4369]">
            Browse Events
          </button>
        </Link>
      </section> */}
    </div>
  );
}
