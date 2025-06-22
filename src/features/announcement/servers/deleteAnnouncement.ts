"use server";

import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal";

export async function deleteAnnouncement(_: any, formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) throw new Error("Unauthorized");

  const slug = formData.get("slug") as string;
  if (!slug) throw new Error("Missing announcement slug");

  const announcement = await prisma.announcement.findUnique({
    where: { slug },
  });

  if (!announcement) throw new Error("Announcement not found");

  // Ensure only the user who created the announcement or admin can delete it
  if (announcement.userId !== session.userId) {
    throw new Error("You are not allowed to delete this announcement");
  }

  try {
    // Finally delete the announcement
    await prisma.announcement.delete({
      where: { slug },
    });

    // Redirect after successful deletion
    return { success: true };
  } catch (error) {
    console.error("Error deleting announcement or its related data:", error);
    throw new Error("Failed to delete announcement.");
  }
}
