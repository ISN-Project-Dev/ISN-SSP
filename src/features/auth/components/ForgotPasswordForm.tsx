"use client";

import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/features/auth/servers/forgotPasswordAction";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
  const [data, action, isPending] = useActionState(forgotPassword, undefined);

  return (
    <form action={action}>
      <h2 className="text-center mb-10 text-2xl font-semibold">Forgot Password</h2>
      <div className="space-y-5">
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your Email"
        />
      </div>
      <span style={{ color: "red" }}>{data?.error}</span>
      <span style={{ color: "green" }}>{data?.message}</span>
      <Button
        disabled={isPending}
        type="submit"
        className="flex w-full my-5 rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
      >
        Send
      </Button>
    </form>
  );
}
