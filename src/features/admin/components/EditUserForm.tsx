"use client";

import { useActionState } from "react";
import { editUser } from "@/features/auth/servers/editUserAction";
import FormField from "@/components/common/FormField";
import { SelectField } from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";
import DeleteUserAlertBox from "@/features/auth/components/DeleteUserAlertBox"; // ✅ Import it
import Image from "next/image";

type UserFormProps = {
  initialData: {
    id: string;
    slug: string;
    name: string | null;
    role: string;
    isActive: boolean;
  } | null;
};

const EditUserForm = ({ initialData }: UserFormProps) => {
  const [data, updateAction, _isPending] = useActionState(editUser, undefined);

  return (
    <>
      <div className="relative w-full">
        <Image
          src="/blueBackground.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
          width={1920}
          height={200}
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Edit User
        </h2>
      </div>
      <div className="event-page mt-16 mb-20 px-10 flex items-center justify-center">
        <div className="event-form w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
          <form
            className="space-y-5"
            action={updateAction}
          >
            <input
              name="id"
              type="hidden"
              value={initialData?.id ?? ""}
            />
            <input
              name="slug"
              type="hidden"
              value={initialData?.slug ?? ""}
            />
            <FormField
              defaultValue={data?.fieldData.name || initialData?.name}
              label="Name"
              name="name"
              type="text"
              error={data?.nameError}
            />
            <SelectField
              defaultValue={data?.fieldData.role || initialData?.role}
              label="Role"
              name="role"
              options={[
                { value: "user", label: "Non-Student" },
                { value: "student", label: "Student" },
                { value: "university", label: "University" },
                { value: "industry", label: "Industry" },
                { value: "admin", label: "Admin" },
              ]}
              error={data?.roleError}
            />
            <Button
              type="submit"
              className="w-full rounded-lg bg-[#192f59] px-4 py-2 font-medium text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
            >
              Save Changes
            </Button>
          </form>
          <div className="mt-4">
            <DeleteUserAlertBox id={initialData?.id ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserForm;
