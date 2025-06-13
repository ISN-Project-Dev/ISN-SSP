"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/common/FormField";
import TextareaField from "@/components/common/TextareaField";
import { SelectField } from "@/components/common/SelectField";

type Props = {
  actionType: "Create" | "Edit";
  events: { id: string; title: string }[];
  initialData?: {
    title: string;
    description: string;
    eventId?: string;
    slug?: string;
    type?: "general" | "event";
  };
  formAction: (prevState: any, formData: FormData) => Promise<any>;
  role: string;
};

export default function AnnouncementForm({
  actionType,
  events,
  initialData,
  formAction,
  role,
}: Props) {
  const [state, dispatchAction] = useActionState(formAction, undefined);
  const [isEventRelated, setIsEventRelated] = useState<boolean>(
    initialData?.type === "event" || role === "industry" || role === "university"
  );
  const userCanChooseType = role === "admin";

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
      <div className="event-page mt-16 mb-20 px-10 flex items-center justify-center">
        <div className="event-form w-full max-w-3xl rounded-lg bg-white px-20 py-10 shadow-md">
          <h2 className="event-form-title text-[#192f59] mb-10 text-center text-2xl font-semibold">
          {actionType} Announcement Form
        </h2>

        <form className="space-y-5" action={dispatchAction}>
          {actionType === "Edit" && (
            <>
              <input type="hidden" name="slug" value={initialData?.slug ?? ""} />
              <input
                type="hidden"
                name="type"
                value={isEventRelated ? "event" : "general"}
              />
            </>
          )}

          <FormField
            label="Title"
            name="title"
            type="text"
            defaultValue={initialData?.title ?? ""}
            error={state?.titleError}
          />

          <TextareaField
            label="Description"
            name="description"
            rows={4}
            defaultValue={initialData?.description ?? ""}
            error={state?.descriptionError}
          />

          {/* Admin can toggle event relation */}
          {userCanChooseType && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isEvent"
                checked={isEventRelated}
                onChange={() => setIsEventRelated(p => !p)}
              />
              <label>Is this related to an Event?</label>
            </div>
          )}

          {/* Show event dropdown when needed */}
          {isEventRelated && (
            <SelectField
              label="Related Event"
              name="eventId"
              options={events.map(e => ({ value: e.id, label: e.title }))}
              defaultValue={initialData?.eventId}
              error={state?.eventIdError}
              placeholder="Select an event"
            />
          )}

          {/* Industry/University always event */}
          {!userCanChooseType && (
            <input type="hidden" name="type" value="event" />
          )}

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