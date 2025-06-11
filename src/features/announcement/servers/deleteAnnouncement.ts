"use server";

import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal";
import { redirect } from "next/navigation";

export async function deleteAnnouncement(_: any, formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) throw new Error("Unauthorized");

  const slug = formData.get("slug") as string;
  if (!slug) throw new Error("Missing announcement slug");

  const announcement = await prisma.announcement.findUnique({
    where: { slug },
  });

  if (!announcement) throw new Error("Announcement not found");

  // TODO: only admin to be deleted
  if (announcement.userId !== session.userId) {
    throw new Error("You are not allowed to delete this announcement");
  }

  await prisma.announcement.delete({
    where: { slug },
  });

  redirect("/announcement");
}
