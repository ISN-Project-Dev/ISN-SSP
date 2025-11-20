"use server";

import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";
import { redirect } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";

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

  const errors: any = {};
  const fieldData = {
    title,
    description,
    venue,
    date: dateStr,
    courseLevel,
    type,
    creditHour,
    numberOfPeople,
  };

  if (!title) {
    errors.titleError = "Title is required";
  } else {
    const matchTitle = await prisma.event.findFirst({ 
      where: { 
        title 
      } 
    });
    if (matchTitle) {
      errors.titleError = "Title has been used";
    }
  }

  if (!description) errors.descriptionError = "Description is required";
  if (!venue) errors.venueError = "Venue is required";
  if (!date) errors.dateError = "Date is required";
  if (!courseLevel) errors.courseLevelError = "Event level is required";
  if (!type) errors.typeError = "Event type is required";
  if (creditHour < 1) errors.creditHourError = "Credit hour cannot be lower than 1";
  if (numberOfPeople < 0) errors.numberOfPeopleError = "Number of people cannot be lower than 0";
  if (!certificate || certificate.size === 0 || certificate.name === "undefined") {
    errors.certificateError = "Certificate is required";
  }

  if (Object.keys(errors).length > 0) {
    return { ...errors, fieldData };
  }

if (eventImage && eventImage.size > 0 && eventImage.name !== "undefined") {
  const imageBuffer = await convertFileToBufferService(eventImage);

  const imageRecord = await prisma.eventImage.create({
    data: {
      filename: eventImage.name,
      contentType: eventImage.type,
      data: imageBuffer,
    },
  });

  eventImageId = imageRecord.id;
}

// CASE 2: No uploaded image → use default isnEventImage.png
else {
  try {
    const filePath = path.join(process.cwd(), "public/isnEventImage.png");
    const defaultImageBuffer = readFileSync(filePath);

    const defaultRecord = await prisma.eventImage.create({
      data: {
        filename: "default-isn.png",
        contentType: "image/png",
        data: defaultImageBuffer,
      },
    });

    eventImageId = defaultRecord.id;
  } catch (err) {
    console.error("Error loading default image:", err);
    throw new Error("Default image could not be set.");
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
