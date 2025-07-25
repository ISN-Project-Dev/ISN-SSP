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
      <div className="flex gap-10">
        <form action={action}>
          <input type="hidden" name="userId" value={userId}></input>
          <input type="hidden" name="eventId" value={eventId}></input>
          <input type="hidden" name="participationType" value="particapant" />
          <button className="items-center justify-center text-base px-5 py-3 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">Register Event</button>
        </form>
        {numberOfPeople && numberOfPeople > 0 ? (
          <form action={action}>
            <input type="hidden" name="userId" value={userId}></input>
            <input type="hidden" name="eventId" value={eventId}></input>
            <input type="hidden" name="participationType" value="helper" />
            <button className="tems-center justify-center text-base px-5 py-3 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">Apply Service</button>
          </form>
        ) : (
          ""
        )}
      </div>
      {data?.error && <span className="text-red-700">{data?.error}</span>}
      {data?.message && <span className="text-green-600">{data?.message}</span>}
    </div>
  );
};

export default RegisterServiceButton;
