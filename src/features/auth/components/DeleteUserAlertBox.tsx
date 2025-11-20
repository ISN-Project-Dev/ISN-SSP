"use client";

import { useRouter } from "next/navigation";
import { deleteUser } from "../servers/deleteUserAction";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteAlertBox({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deleteUser(id);

            if (result.success) {
                router.push("/admin");
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="submit"
                    className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500 focus:ring-1 focus:ring-red-400 focus:ring-offset-1"
                >
                    Delete User
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this user?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone and will permanently delete your user from our data.</AlertDialogDescription>
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
