import prisma from "@/databases/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DeleteAnnouncementButton } from "@/features/announcement/components/DeleteAnnouncementButton";
import DeleteAlertBox from "@/features/event/components/DeleteAlertBox";

export default async function ViewAnnouncement(props: { params: { slug: string } }) {
  const { slug } = props.params;

  const announcement = await prisma.announcement.findUnique({
    where: { slug },
    include: {
      user: true,
      event: true,
    },
  });

  if (!announcement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Announcement not found.</p>
      </div>
    );
  }

  const isEventRelated = announcement.type === "event";

  return (
    <>
          <div className="relative w-full">
        <img
          src="/bluebg.jpg"
          alt="Header Background"
          className="w-full h-40 opacity-50"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-[#192f59] text-3xl font-bold bg-blue-50/30">
          Announcement Details
        </h2>
      </div>
    <div className="max-w-7xl w-full mx-auto  mt-16 mb-20 px-10">

      {/* <div className="flex justify-end mb-6">
          <Link href="/announcement">
            <button className="rounded bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1 px-4 py-2 text-white transition">
              Back to All
            </button>
          </Link>
      </div> */}


      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-[#46587a] rounded-t-xl p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-100 text-2xl">{announcement.title}</CardTitle>
            <div className="space-x-2">
              {/* <Link href={`/announcement/edit/${announcement.slug}`} passHref>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link> */}
              
              <DeleteAnnouncementButton slug={announcement.slug} />
            </div>
          </div>
          {isEventRelated && announcement.event && (
            <p className="mt-2 text-gray-200 text-sm opacity-80">
              Related to event: <strong>{announcement.event.title}</strong>
            </p>
          )}
        </CardHeader>

        <CardContent className="p-6 bg-white">
          <p className="prose prose-lg text-gray-700">
            {announcement.description}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center bg-gray-100 rounded-b-xl px-6 py-4">
                    <Link href="/announcement">
            <Button variant="ghost" size="sm">
              ← Back to All
            </Button>
          </Link>
          <span className="text-sm text-gray-500">
            Posted by <strong>{announcement.user?.name ?? "Unknown"}</strong> on{" "}
            {new Date(announcement.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}
