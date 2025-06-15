import EditEventForm from "@features/event/components/EditEventForm";
import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ id: string }>;
};

const EditEvent = async ({ params }: ParamProps) => {
  const eventIdData = await prisma.event.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      eventCertificate: {
        select: {
          id: true,
          filename: true,
        },
      },
      eventImage: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!eventIdData) {
    return (
      <div>
        <h1>Event not found</h1>
        <p>The event you are trying to edit does not exist.</p>
      </div>
    );
  }

  // Safely compute the versioned image URL if an image exists
  const versionedImageUrl = eventIdData.eventImage
    ? `/api/event-image/${eventIdData.eventImage.id}?t=${Date.now()}`
    : null;

  return <EditEventForm actionType="Edit" initialData={eventIdData} initialCover={versionedImageUrl} initialCertificateName={eventIdData.eventCertificate?.filename ?? null} />;
};

export default EditEvent;
