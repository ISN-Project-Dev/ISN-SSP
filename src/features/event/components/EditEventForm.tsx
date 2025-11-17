"use client";

import { useState } from "react";
import { editEvent } from "../servers/editEventAction";
import FormField from "@/components/common/FormField";
import TextareaField from "@/components/common/TextareaField";
import { SelectField } from "@/components/common/SelectField";
import DragAndDropImage from "@/components/common/DragAndDropImage";
import UploadFile from "@/components/common/UploadFile";
import { Button } from "@/components/ui/button";

type EventFormProps = {
  actionType: "Create" | "Edit";
  initialData?: {
    id: string;
    title: string;
    description: string;
    venue: string | null;
    date: Date | null;
    courseLevel: string;
    type: string | null;
    creditHour: number;
    numberOfPeople: number | null;
    eventCertificate?: { id: string } | null;
    eventImage?: { id: string } | null;
  };
  initialCover?: string | null;
  initialCertificateName?: string | null;
};

const EditEventForm = ({
  actionType,
  initialData,
  initialCover = null,
  initialCertificateName = null,
}: EventFormProps) => {
  const [errors, setErrors] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (imageFile) {
      formData.set("eventImage", imageFile);
    }

    if (certificateFile) {
      formData.set("certificate", certificateFile);
    }

    try {
      const result = await editEvent(undefined, formData);
      if (result?.fieldData) {
        setErrors(result);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <img
          src="/bluebg.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Edit Event
        </h2>
      </div>
      <div className="event-page mt-16 mb-20 px-10 flex min-h-screen items-center justify-center">
        <div className="event-form w-full max-w-3xl rounded-lg bg-white px-20 py-10 shadow-md">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input name="eventId" type="hidden" value={initialData?.id ?? ""} />
            <input
              name="eventImageId"
              type="hidden"
              value={initialData?.eventImage?.id ?? ""}
            />
            <input
              name="eventCertificateId"
              type="hidden"
              value={initialData?.eventCertificate?.id ?? ""}
            />
            <FormField
              label="Title"
              type="text"
              name="title"
              defaultValue={initialData?.title ?? ""}
              error={errors?.titleError}
            />
            <TextareaField
              label="Description"
              name="description"
              rows={4}
              defaultValue={initialData?.description ?? ""}
              error={errors?.descriptionError}
            />
            <div className="grid grid-cols-3 items-start gap-5">
              <div className="col-span-2">
                <FormField
                  label="Venue"
                  name="venue"
                  type="text"
                  defaultValue={initialData?.venue ?? ""}
                  error={errors?.venueError}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  label="Date"
                  name="date"
                  type="date"
                  defaultValue={
                    initialData?.date
                      ? new Date(initialData.date).toISOString().split("T")[0]
                      : ""
                  }
                  error={errors?.dateError}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-start gap-5">
              <SelectField
                label="Event Level"
                name="courseLevel"
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "professional", label: "Professional" },
                ]}
                placeholder="Select a level"
                defaultValue={initialData?.courseLevel}
              />
              <SelectField
                label="Event Type"
                name="type"
                options={[
                  { value: "course", label: "Course" },
                  { value: "workshop", label: "Workshop" },
                  { value: "competition", label: "Competition" },
                ]}
                placeholder="Select a type"
                defaultValue={initialData?.type ?? ""}
              />
            </div>
            <div className="grid grid-cols-2 items-start gap-5">
              <FormField
                label="Credit Hour"
                name="creditHour"
                type="number"
                defaultValue={initialData?.creditHour ?? ""}
                error={errors?.creditHourError}
              />
              <FormField
                label="Number of People (Service)"
                name="numberOfPeople"
                type="number"
                placeholder="Number of People"
                defaultValue={initialData?.numberOfPeople ?? ""}
                error={errors?.numberOfPeopleError}
              />
            </div>
            <DragAndDropImage
              label="Cover Photo"
              name="eventImage"
              initialImage={initialCover}
              file={imageFile}
              setFile={setImageFile}
            />
            <UploadFile
              label="Certificate"
              name="certificate"
              initialFileName={initialCertificateName}
              limitSize={5}
              file={certificateFile}
              setFile={setCertificateFile}
            />
            <Button
              type="submit"
              className="mx-auto block rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEventForm;
