import FeedbackForm from "@/features/profile/components/FeedbackForm";
import prisma from "@/databases/db";

type ParamProps = {
  params: { id: string };
};

export default async function FeedbackPage({ params }: ParamProps) {
  // Fetch eventRegistration to get eventId and userId
  const eventRegistration = await prisma.eventRegistration.findUnique({
    where: { id: params.id },
    include: { event: true, user: true },
  });

  if (!eventRegistration || !eventRegistration.event) {
    return <div>Event not found</div>;
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
      <div className="max-w-xl mx-auto mt-10 text-red-600 bg-white p-6 rounded shadow">
        You have already submitted feedback for this event. Only one feedback is allowed.
      </div>
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
