"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { deleteAnnouncement } from "../servers/deleteAnnouncement";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, } from "@/components/ui/alert-dialog";

export function DeleteAnnouncementButton({ slug }: { slug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Create a new FormData object and append the slug to it
      const formData = new FormData();
      formData.append("slug", slug);

      // Pass formData as the second argument to deleteAnnouncement
      const result = await deleteAnnouncement({}, formData); // First argument can be empty since it's not used

      if (result.success) {
        setIsOpen(false); // Close the modal on success
        router.push("/announcement"); // Redirect to announcement list
      }
    } catch (error) {
      console.error("Failed to delete announcement:", error);
    }
  };

  return (
    <>
      <AlertDialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <AlertDialogTrigger asChild>
          <TrashIcon className="h-7 w-7 text-red-500 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this announcement?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone and will permanently delete the announcement from our data.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
