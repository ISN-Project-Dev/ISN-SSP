"use client";

import { useActionState } from "react";
import { deleteAnnouncement } from "../servers/deleteAnnouncement";
import { Button } from "@/components/ui/button";

export function DeleteAnnouncementButton({ slug }: { slug: string }) {
  const [_, formAction] = useActionState(deleteAnnouncement, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="slug" value={slug} />
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
