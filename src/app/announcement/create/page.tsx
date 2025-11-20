import AnnouncementForm from "@features/announcement/components/AnnouncementForm";
import { verifySession } from "@/libs/dal";
import { createAnnouncement } from "@features/announcement/servers/createAnnouncement";


import prisma from "@/databases/db";

export default async function CreatePage() {
  const session = await verifySession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  let role = session.role as string;

  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true
    }
  });

  return (
    <AnnouncementForm
      actionType="Create"
      events={events}
      formAction={createAnnouncement}
      role={role}
    />
  );
}
