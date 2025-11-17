"use server";

import prisma from "@/databases/db";
import { verifySession } from "@/libs/dal";
import { redirect } from "next/navigation";

export const submitFeedback = async (_previousState: unknown, formData: FormData) => {
  const user = await verifySession();

  if (!user) return { generalError: "Unauthorized" };

  const eventId = formData.get("eventId") as string;
  const eventRegistrationId = formData.get("eventRegistrationId") as string;
  const rating = Number(formData.get("rating"));
  const comment = (formData.get("comment") as string)?.trim();

  const fieldData = { rating, comment };
  const errors: any = {};

  if (!eventId) errors.generalError = "Missing event ID";
  if (!rating || rating < 1) errors.ratingError = "Please provide a rating between 1 and 5.";
  if (!comment) errors.commentError = "Feedback comment is required.";
  if (Object.keys(errors).length > 0) return { ...errors, fieldData };

  try {
    await prisma.feedback.create({
      data: {
        userId: user.userId,
        eventId,
        eventRegistrationId,
        rating,
        comment,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return { generalError: "You have already submitted feedback.", fieldData };
    }
    console.error("Error submitting feedback:", error);
    return { generalError: "Failed to submit feedback.", fieldData };
  }
  redirect(`/profile/${user.slug}/eventHistory`);
};
