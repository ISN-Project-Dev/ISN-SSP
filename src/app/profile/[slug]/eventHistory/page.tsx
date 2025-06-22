import prisma from "@/databases/db";
import UserRegisterEventTable from "@/features/profile/components/UserRegisterEventTable";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventHistory = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const userRegisterEventData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id as string,
    },
    include: {
      event: true,
    },
  });

  return (
    <UserRegisterEventTable
      isStudent={userData?.role === "student"}
      eventData={userRegisterEventData}
    />
  );
};

export default EventHistory;
