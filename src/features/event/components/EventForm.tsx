"use client";

import { useActionState } from "react";
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
    eventCertificate?: {
      id: string;
    } | null;
    eventImage?: {
      id: string;
    } | null;
  };
};

const EventForm = ({ actionType, initialData }: EventFormProps) => {
  const [data, action, _isPending] = useActionState(createEvent, undefined);

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
          <form className="space-y-5" action={action}>
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
                data?.fieldData?.title !== undefined
                  ? data.fieldData.title
                  : initialData?.title ?? ""
              }
              error={data?.titleError}
            />
            <TextareaField 
              label="Description"
              name="description"
              rows={4} 
              defaultValue={
                data?.fieldData?.description !== undefined
                  ? data.fieldData.description
                  : initialData?.description ?? ""
              }            
              error={data?.descriptionError}
            />
            <div className="grid grid-cols-3 items-start gap-5">
              <div className="col-span-2">
                <FormField
                  label="Venue"
                  name="venue"
                  type="text"
                  defaultValue={
                    data?.fieldData?.venue !== undefined
                      ? data.fieldData.venue
                      : initialData?.venue ?? ""
                  }
                  error={data?.venueError}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  label="Date"
                  name="date"
                  type="date"
                  defaultValue={
                    data?.fieldData?.date !== undefined
                      ? data.fieldData.date
                      : initialData?.date
                        ? new Date(initialData.date).toISOString().split("T")[0]
                        : ""
                  }
                  error={data?.dateError}
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
                  data?.fieldData?.courseLevel ?? initialData?.courseLevel
                }
                error={data?.courseLevelError}
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
                defaultValue={
                  data?.fieldData?.type ?? initialData?.type
                }
                error={data?.typeError}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                label="Credit Hour"
                name="creditHour"
                type="number"
                defaultValue={
                  data?.fieldData?.creditHour !== undefined
                    ? data.fieldData.creditHour
                    : initialData?.creditHour ?? ""
                }
                error={data?.creditHourError}
              />
              <FormField
                  label="Number of People (Service)"
                  name="numberOfPeople"
                  type="number"
                  placeholder="Number of People"
                  defaultValue={
                    data?.fieldData?.numberOfPeople !== undefined
                      ? data.fieldData.numberOfPeople
                      : initialData?.numberOfPeople ?? ""
                  }
                  error={data?.numberOfPeopleError}
              />
            </div>
            <DragAndDropImage 
              label="Cover Photo"
              name="eventImage" 
            />
            <UploadFile
              label="Certificate"
              name="certificate"
              limitSize={5}
              error={data?.certificateError}
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
