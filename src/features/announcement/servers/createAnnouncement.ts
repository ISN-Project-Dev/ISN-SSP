"use server";

import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal";
import { redirect } from "next/navigation";

export async function createAnnouncement(_: any, formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) throw new Error("Unauthorized");

  const currentUserId = session.userId as string;
  const role = session.role;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const eventId = formData.get("eventId") as string | null;
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  let type = formData.get("type") as "general" | "event" | null;

  // Fallback for admins (checkbox)
  const isEvent = formData.get("isEvent") === "on";

  if (role === "admin") {
    type = isEvent ? "event" : "general";
  } else if (role === "industry" || role === "university") {
    type = "event";
  } else {
    throw new Error("Unauthorized role");
  }

  if (!title || !description || (type === "event" && !eventId)) {
    return {
      titleError: !title ? "Title is required" : undefined,
      descriptionError: !description ? "Description is required" : undefined,
      eventIdError: type === "event" && !eventId ? "Event is required" : undefined,
    };
  }

  await prisma.announcement.create({
    data: {
      title,
      description,
      slug,
      userId: currentUserId,
      type,
      eventId: type === "event" ? eventId : null,
    },
  });

  redirect("/announcement");
}
