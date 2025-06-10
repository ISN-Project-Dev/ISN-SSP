import prisma from "@/databases/db";
import AnnouncementForm from "@features/announcement/components/AnnouncementForm";
import { updateAnnouncement } from "@features/announcement/servers/updateAnnouncement";
import { notFound } from "next/navigation";
import { verifySession } from "@/libs/dal"; 


export default async function EditAnnouncementPage({ params }: { params: { slug: string } }) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const role = session.role as string;

  const announcement = await prisma.announcement.findUnique({
    where: { slug: params.slug },
    include: { event: true },
  });

  if (!announcement) return notFound();

  const events = await prisma.event.findMany({ select: { id: true, title: true } });

  return (
    <AnnouncementForm
      actionType="Edit"
      events={events}
      role={role} 
      initialData={{
        title: announcement.title,
        description: announcement.description,
        eventId: announcement.eventId ?? undefined,
        slug: announcement.slug,
        type: announcement.type, 
      }}
      formAction={updateAnnouncement}
    />
  );
}