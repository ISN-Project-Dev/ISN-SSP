import FeedbackForm from "@/features/profile/components/FeedbackForm";
import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ id: string }>;
};

export default async function FeedbackPage({ params }: ParamProps) {
  const eventRegistration = await prisma.eventRegistration.findUnique({
    where: {
      id: (await params).id
    },

    include: {
      event: true,
      user: true
    },
  });

  if (!eventRegistration || !eventRegistration.event) {
    return <p>Event not found</p>;
  }

  const existingFeedback = await prisma.feedback.findUnique({
    where: {
      userId_eventId: {
        userId: eventRegistration.user.id,
        eventId: eventRegistration.event.id,
      },
    },
  });

  if (existingFeedback) {
    return (
      <p className="max-w-xl mx-auto mt-10 text-red-600 bg-white p-6 rounded shadow">You have already submitted feedback for this event. Only one feedback is allowed.</p>
    );
  }

  return (
    <>
      <FeedbackForm
        eventId={eventRegistration.event.id}
        eventRegistrationId={eventRegistration.id}
      />
    </>
  );
}
