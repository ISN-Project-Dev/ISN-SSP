"use client";

import { useActionState } from "react";
import { register } from "@/features/auth/servers/registerAction";
import FormField from "@/components/common/FormField";
import { SelectField } from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [data, action, isPending] = useActionState(register, undefined);
  return (
    <form action={action}>
      {/* Adjusted for vertical spacing */}
      <h2 className="text-center mb-10 text-2xl font-semibold">
        Register Form
      </h2>
      {/* Full Name Input */}
      <div className="space-y-5">
        <FormField
          defaultValue={data?.fieldData?.name}
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          error={data?.nameError}
        />
        {/* Email Input */}
        <FormField
          defaultValue={data?.fieldData?.email}
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          error={data?.emailError}
        />
        {/* Password Input */}
        <FormField
          defaultValue={data?.fieldData?.password}
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          error={data?.passwordError}
        />
        {/* Role Selection */}
        <SelectField
          defaultValue={data?.fieldData?.role}
          label="Role"
          name="role"
          options={[
            { value: "user", label: "Non-Student" },
            { value: "student", label: "Student" },
            { value: "university", label: "University" },
            { value: "industry", label: "Industry" },
          ]}
          placeholder="Select a role"
          error={data?.roleError}
        />

        <span style={{ color: "red" }}>{data?.error}</span>


      </div>
      {/* Register Button */}
      <Button
        disabled={isPending}
        type="submit"
        className="flex my-5 w-full rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
      >
        Register
      </Button>
    </form>
  );
}
