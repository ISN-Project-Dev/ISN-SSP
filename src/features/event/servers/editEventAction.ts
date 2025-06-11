"use server";

import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";
import { redirect } from "next/navigation";

export const editEvent = async (_previousState: unknown, formData: FormData) => {
  const slug = (formData.get("title") as string)
  .replace(/\s+/g, "-")
  .toLowerCase();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const venue = formData.get("venue") as string;
  const dateStr = formData.get("date") as string;
  const date = dateStr ? new Date(dateStr) : null;
  const courseLevel = formData.get("courseLevel") as string;
  const type = formData.get("type") as string;
  const creditHour = Number(formData.get("creditHour"));
  const numberOfPeople = Number(formData.get("numberOfPeople"));
  const eventImage = formData.get("eventImage") as File;
  const certificate = formData.get("certificate") as File;
  const eventId = formData.get("eventId") as string;

  let eventImageId = formData.get("eventImageId") as string;
  const eventCertificateId = formData.get("eventCertificateId") as string;

  if (!title) {
    return {
      titleError: "Title is required",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  const matchTitle = await prisma.event.findFirst({
    where: {
      title: title,
      NOT: {
        id: eventId, // Exclude the current event by its ID
      },
    },
  });

  if (matchTitle) {
    return {
      titleError: "Title has been used",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (!description) {
    return {
      descriptionError: "Description is required",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (!venue) {
    return {
      venueError: "Venue is required",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (!date) {
    return {
      dateError: "Date is required",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (creditHour < 1) {
    return {
      creditHourError: "Credit hour cannot be lower than 1",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (numberOfPeople < 0) {
    return {
      numberOfPeopleError: "Number of people cannot be lower than 0",
      fieldData: {
        title,
        description,
        venue,
        date: date ? (date as Date).toISOString().split("T")[0] : "",
        courseLevel,
        type,
        creditHour,
        numberOfPeople,
      },
    };
  }

  if (eventImage && eventImage.size > 0 && eventImage.name !== "undefined") {
    // const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

    // if (eventImage.size > MAX_IMAGE_SIZE || !eventImage.type.startsWith("image/")) {
    //   return {
    //     imageError: "Image must be under 10MB",
    //     fieldData: {
    //       title,
    //       description,
    //       venue,
    //       date: date ? (date as Date).toISOString().split("T")[0] : "",
    //       courseLevel,
    //       type,
    //       creditHour,
    //       numberOfPeople,
    //     },
    //   };
    // }

    try {
      const imageBuffer = await convertFileToBufferService(eventImage);

      if (!imageBuffer) {
        throw new Error("imageBuffer are missing.");
      }
      if (eventImageId) {
        const imageRecord = await prisma.eventImage.update({
          where: {
            id: eventImageId,
          },
          data: {
            filename: eventImage.name,
            contentType: eventImage.type,
            data: imageBuffer,
          },
        });
        eventImageId = imageRecord.id;
      } else {
        const imageRecord = await prisma.eventImage.create({
          data: {
            filename: eventImage.name,
            contentType: eventImage.type,
            data: imageBuffer,
          },
        });
        eventImageId = imageRecord.id;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  if (certificate && certificate.size > 0 && certificate.name !== "undefined") {
    try {
      const certificateBuffer = await convertFileToBufferService(certificate);

      if (!certificateBuffer) {
        throw new Error("certificateBuffer are missing.");
      }

      await prisma.eventCertificate.update({
        where: { id: eventCertificateId },
        data: {
          filename: certificate.name,
          contentType: certificate.type,
          data: certificateBuffer,
        },
      });
    } catch (error) {
      console.error("Error uploading certificate:", error);
      throw new Error("Failed to upload certificate.");
    }
  }

  const updateData: any = {};

  // Conditionally add fields to the update object
  if (description) updateData.description = description;
  if (venue) updateData.venue = venue;
  if (date) updateData.date = date;
  if (courseLevel) updateData.courseLevel = courseLevel;
  if (type) updateData.type = type;
  if (creditHour >= 0) updateData.creditHour = creditHour;
  if (numberOfPeople >= 0) updateData.numberOfPeople = numberOfPeople;

  // Only set eventImageId if a new image was uploaded
  if (eventImage && eventImage.size > 0 && eventImage.name !== "undefined") {
    updateData.eventImageId = eventImageId;
  }

  try {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: title,
        slug: slug,
        ...updateData,
        eventCertificateId: eventCertificateId,
      },
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event.");
  }

  redirect(`/event/${slug}`);
};
