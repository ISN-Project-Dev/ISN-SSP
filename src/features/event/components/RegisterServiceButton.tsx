"use client";

import React from "react";
import { useActionState } from "react";
import { registerEvent } from "../../../features/event/servers/registerEventAction";

const RegisterServiceButton = ({
  userId,
  eventId,
  numberOfPeople,
}: {
  userId: string;
  eventId: string;
  numberOfPeople: number;
}) => {
  const [data, action, _isPending] = useActionState(registerEvent, undefined);

  return (
    <div className="flex w-full max-w-4xl flex-col justify-center items-center mt-20 gap-5">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full justify-center">
        <form action={action} className="w-full sm:w-auto flex justify-center">
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="eventId" value={eventId} />
          <input type="hidden" name="participationType" value="particapant" />
          <button className="w-full sm:w-auto text-base px-5 py-3 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369]">
            Register Event
          </button>
        </form>
        {numberOfPeople > 0 && (
          <form action={action} className="w-full sm:w-auto flex justify-center">
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="eventId" value={eventId} />
            <input type="hidden" name="participationType" value="helper" />
            <button className="w-full sm:w-auto text-base px-5 py-3 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369]">
              Apply Service
            </button>
          </form>
        )}
      </div>
      {data?.error && <span className="text-red-700">{data.error}</span>}
      {data?.message && <span className="text-green-600">{data.message}</span>}
    </div>
  );
};

export default RegisterServiceButton;
