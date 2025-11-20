"use client";

import { useActionState } from "react";
import { login } from "@/features/auth/servers/loginAction";
import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [data, action, isPending] = useActionState(login, undefined);
  return (
    <form action={action}>
      <h2 className="text-[#192f59] text-center mb-10 text-2xl font-semibold">Login Form</h2>
      <div className="space-y-5">
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          error={data?.emailError}
          defaultValue={data?.fieldData?.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          error={data?.passwordError}
          defaultValue={data?.fieldData?.password}
        />
        <span style={{ color: "red" }}>{data?.error}</span>
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="flex my-5 w-full rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
      >
        Login
      </Button>
    </form>
  );
}
