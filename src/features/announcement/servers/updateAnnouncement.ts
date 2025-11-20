"use server";

import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal"; // or "@/libs/auth"
import { redirect } from "next/navigation";

export async function updateAnnouncement(_: any, formData: FormData) {
  const session = await verifySession();

  if (!session?.userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const eventId = formData.get("eventId") as string;
  const slug = formData.get("slug") as string;

  if (!slug) throw new Error("Missing slug");

  if (!title || !description || !eventId) {
    return {
      titleError: !title ? "Required" : undefined,
      descriptionError: !description ? "Required" : undefined,
      eventIdError: !eventId ? "Required" : undefined,
    };
  }

  const announcement = await prisma.announcement.findUnique({
    where: {
      slug
    }
  });

  if (!announcement) throw new Error("Announcement not found");

  if (announcement.userId !== session.userId) {
    throw new Error("Forbidden: You cannot edit this announcement");
  }

  const newSlug = title.toLowerCase().replace(/\s+/g, "-");

  await prisma.announcement.update({
    where: {
      slug
    },

    data: {
      title,
      description,
      eventId,
      slug: newSlug,
    },
  });

  redirect(`/features/announcement/view/${newSlug}`);
}
