"use client";

import { useActionState } from "react";
import { submitReportSubmission } from "../servers/submitReportSubmissionAction";
import UploadField from "@/components/common/UploadField";
import { Button } from "@/components/ui/button";

type UploadFileFormProps = {
  id: string;
  slug: string;
};
export default function UploadFileForm({ id, slug }: UploadFileFormProps) {
  const [data, action, _isPending] = useActionState(
    submitReportSubmission,
    undefined,
  );
  return (
    <form action={action}>
      <div className="file-input-container">
        <input type="hidden" name="reportSubmissionId" value={id} />
        <input type="hidden" name="slug" value={slug} />
        <UploadField
          label="Report File"
          type="file"
          name="reportFile"
          error={data?.reportFileError}
          accept=".pdf"
          helper=" Max 3Mb size"
        />
      </div>
      <Button className="mx-auto block rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">
        Submit
      </Button>
    </form>
  );
}
