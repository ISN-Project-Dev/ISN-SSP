"use server";

import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";

export async function updateReportAction(_prev: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) {
    return { error: "Missing report ID or status" };
  }

  try {
    await prisma.reportSubmission.update({
      where: { id },
      data: { status },
    });

    // Force page revalidation so the status updates immediately
    revalidatePath("/profile/admin/adminReport");
    return { success: true };

  } catch (error) {
    console.error("Failed to update report:", error);
    return { error: "Failed to update report." };
  }
}
