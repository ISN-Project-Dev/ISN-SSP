import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal";
import AnnouncementTabs from "@/features/announcement/components/AnnouncementTabs"; // Direct import

export default async function AnnouncementListPage() {
  const currentUser = await verifySession();

  const announcements = await prisma.announcement.findMany({
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });

  const mapped = announcements.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    event: a.event ? { title: a.event.title } : undefined,
  }));

  const general = mapped.filter((a) => a.type === "general");
  const event = mapped.filter((a) => a.type === "event");

  return (
    <AnnouncementTabs
      general={general}
      event={event}
      currentUser={currentUser ? { role: currentUser.role as string } : null}
    />
  );
}
