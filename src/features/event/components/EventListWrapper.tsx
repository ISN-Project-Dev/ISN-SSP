"use client";
import EventList from "./EventList";

export default function EventListWrapper(props: React.ComponentProps<typeof EventList>) {
  return <EventList {...props} />;
}