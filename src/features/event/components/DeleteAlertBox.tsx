"use client";

import { useRouter } from "next/navigation";
import { deleteEvent } from "../servers/deleteEventAction";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { TrashIcon } from '@heroicons/react/24/solid'

export default function DeleteAlertBox({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteEvent(id);

      if (result.success) {
        router.push("/event");
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TrashIcon className="h-7 w-7 text-red-600 hover:text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this event?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone and will permanently delete your event from our data.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
