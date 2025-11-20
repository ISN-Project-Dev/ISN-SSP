"use server";

import prisma from "@/databases/db";

export const deleteEvent = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId
    },

    include: {
      eventImage: true,
      eventCertificate: true,
      eventRegistrations: true,
    },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  try {
    await prisma.$transaction([
      // Delete feedbacks
      prisma.feedback.deleteMany({
        where: {
          eventId
        },
      }),

      // Delete report submissions associated with the event
      prisma.reportSubmission.deleteMany({
        where: {
          eventId
        },
      }),

      // Delete event registrations
      prisma.eventRegistration.deleteMany({
        where: {
          eventId
        },
      }),

      // Delete associated event image
      ...(event.eventImageId
        ? [prisma.eventImage.delete({
          where: {
            id: event.eventImageId
          }
        })]
        : []),

      // Delete associated event certificate
      ...(event.eventCertificateId
        ? [
          prisma.eventCertificate.delete({
            where: {
              id: event.eventCertificateId
            },
          }),
        ]
        : []),

      // Finally, delete the event itself
      prisma.event.delete({
        where: {
          id: eventId
        },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error deleting event or its dependencies:", error);
    throw new Error("Failed to delete event.");
  }
};
