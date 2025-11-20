"use server";

import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";

export async function updateReportAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) {
    throw new Error("Missing report ID or status");
  }

  await prisma.reportSubmission.update({
    where: { 
      id 
    },
    
    data: { 
      status 
    },
  });

  revalidatePath("/profile/admin/adminReport");
}
