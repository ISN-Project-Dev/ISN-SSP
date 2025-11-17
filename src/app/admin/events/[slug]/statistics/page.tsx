import prisma from "@/databases/db"
import EventStatistics from "@features/admin/components/EventStatistics"

type ParamProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventStatisticsPage({ params }: ParamProps) {
    const event = await prisma.event.findUnique({
        where: { slug: (await params).slug },
        include: {
            eventRegistrations: {
                include: {
                    user: {
                        include: { userDetail: true },
                    },
                },
            },
            feedbacks: true,

        },
    })

    if (!event) {
        return (
            <main className="flex flex-col items-center justify-center h-screen text-gray-500">
                Event not found
            </main>
        )
    }

    return <EventStatistics event={event} />
}
