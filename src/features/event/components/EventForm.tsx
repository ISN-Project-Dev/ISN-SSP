"use client";

import { useActionState, useState, useTransition } from "react";
import { createEvent } from "../servers/createEventAction";
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

const EventForm = ({
  actionType,
  initialData,
  initialCover = null,
  initialCertificateName = null,
}: EventFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const [state, formAction] = useActionState(
    async (_prev: any, formData: FormData) => {
      return await createEvent(_prev, formData);
    },
    undefined
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  if (imageFile) formData.set("eventImage", imageFile);
  if (certificateFile) formData.set("certificate", certificateFile);

  // ✅ Wrap in startTransition
  startTransition(() => {
    formAction(formData);
  });
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
          Create Event
        </h2>
      </div>

      <div className="event-page mt-16 mb-20 px-10 flex min-h-screen items-center justify-center">
        <div className="event-form w-full max-w-3xl rounded-lg bg-white px-20 py-10 shadow-md">
          <h2 className="event-form-title text-[#192f59] mb-10 text-center text-2xl font-semibold">
            {actionType} Event Form
          </h2>

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
              name="title"
              type="text"
              defaultValue={
                state?.fieldData?.title ?? initialData?.title ?? ""
              }
              error={state?.titleError}
            />

            <TextareaField
              label="Description"
              name="description"
              rows={4}
              defaultValue={
                state?.fieldData?.description ?? initialData?.description ?? ""
              }
              error={state?.descriptionError}
            />

            <div className="grid grid-cols-3 items-start gap-5">
              <div className="col-span-2">
                <FormField
                  label="Venue"
                  name="venue"
                  type="text"
                  defaultValue={
                    state?.fieldData?.venue ?? initialData?.venue ?? ""
                  }
                  error={state?.venueError}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  label="Date"
                  name="date"
                  type="date"
                  defaultValue={
                    state?.fieldData?.date ??
                    (initialData?.date
                      ? new Date(initialData.date).toISOString().split("T")[0]
                      : "")
                  }
                  error={state?.dateError}
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
                defaultValue={
                  state?.fieldData?.courseLevel ?? initialData?.courseLevel
                }
                error={state?.courseLevelError}
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
                defaultValue={state?.fieldData?.type ?? initialData?.type}
                error={state?.typeError}
              />
            </div>

            <div className="grid grid-cols-2 items-start gap-5">
              <FormField
                label="Credit Hour"
                name="creditHour"
                type="number"
                defaultValue={
                  state?.fieldData?.creditHour ?? initialData?.creditHour ?? ""
                }
                error={state?.creditHourError}
              />
              <FormField
                label="Number of People (Service)"
                name="numberOfPeople"
                type="number"
                defaultValue={
                  state?.fieldData?.numberOfPeople ??
                  initialData?.numberOfPeople ??
                  ""
                }
                error={state?.numberOfPeopleError}
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
              limitSize={5}
              initialFileName={initialCertificateName}
              file={certificateFile}
              setFile={setCertificateFile}
              error={state?.certificateError}
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

export default EventForm;
