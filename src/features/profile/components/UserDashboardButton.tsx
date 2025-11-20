"use client";
import React, { useActionState } from "react";
import { createUserDashboard } from "../servers/createUserDashboardAction";
import { Button } from "@/components/ui/button";

type TId = {
  id: string;
};

export default function UserDashboardButton({ id }: TId) {
  const [data, action, isPending] = useActionState(createUserDashboard, undefined);

  return (
    <form
      action={action}
      className="w-full mx-auto flex flex-col gap-3 bg-white rounded-md"
    >
      <div className="flex items-center gap-4">
        <input
          name="userDashboardFile"
          type="file"
          accept=".csv"
          className="block w-full text-sm border border-gray-200 rounded-lg file:cursor-pointer file:mr-5 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:h-9 file:text-sm file:font-medium hover:file:bg-gray-200"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mx-auto block rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
        >
          Upload File
        </Button>
      </div>
      <input
        name="id"
        type="hidden"
        value={id}
      />
      <div className="text-center mt-1">
        {data?.fileError && (
          <p className="text-red-500 text-sm">{data.fileError}</p>
        )}
        {data?.success && (
          <p className="text-green-600 text-sm">{data.success}</p>
        )}
      </div>
    </form>
  );
}
