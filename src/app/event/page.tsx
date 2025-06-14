import { verifySession } from "@/libs/dal";
import prisma from "@/databases/db";
import EventList from "@/features/event/components/EventList";
import EventListWrapper from "@/features/event/components/EventListWrapper";

const Event = async () => {
  const currentUser = await verifySession();

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
    orderBy: { createdAt: "desc" },
  });

  const eventData = eventDataRaw.map((event) => ({
    ...event,
    eventImageUrl: event.eventImage
      ? `/api/event-image/${event.eventImage.id}`
      : null,
  }));

  return (
    <EventListWrapper
      eventData={eventData}
      isAdmin={
        currentUser?.role === "admin" ||
        currentUser?.role === "industry" ||
        currentUser?.role === "university"
      }
    />
  );
};

export default Event;