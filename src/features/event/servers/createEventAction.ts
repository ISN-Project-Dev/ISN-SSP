"use server";

import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";
import { redirect } from "next/navigation";

export const createEvent = async (_previousState: unknown, formData: FormData) => {
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
  const eventImage = formData.get("eventImage") as File | null;
  const certificate = formData.get("certificate") as File | null;

  let eventImageId: string | null = null;
  let eventCertificateId: string | null;

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

  const matchTitle = await prisma.event.findMany({
    where: {
      title: title,
    },
  });

  if (matchTitle.length > 0) {
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

  if (!courseLevel) {
    return {
      courseLevelError: "Event level is required",
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

  if (!type) {
    return {
      typeError: "Event type is required",
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
    try {
      const imageBuffer = await convertFileToBufferService(eventImage);
      const imageRecord = await prisma.eventImage.create({
        data: {
          filename: eventImage.name,
          contentType: eventImage.type,
          data: imageBuffer,
        },
      });

      eventImageId = imageRecord.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  }

  if (!certificate || certificate.size === 0 || certificate.name === "undefined") {
    return {
      certificateError: "Certificate is required",
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

  try {
    const certificateBuffer = await convertFileToBufferService(certificate);
    const certificateRecord = await prisma.eventCertificate.create({
      data: {
        filename: certificate.name,
        contentType: certificate.type,
        data: certificateBuffer,
      },
    });

    eventCertificateId = certificateRecord.id;
  } catch (error) {
    console.error("Error uploading certificate:", error);
    throw new Error("Failed to upload certificate");
  }

  try {
    await prisma.event.create({
      data: {
        slug: slug,
        title: title,
        description: description,
        venue: venue,
        date: date,
        courseLevel: courseLevel,
        type: type,
        creditHour: creditHour,
        numberOfPeople: numberOfPeople,
        eventImageId: eventImageId,
        eventCertificateId: eventCertificateId, // Associating event certificate ID (nullable)
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }

  redirect("/event");
};
