import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { UserReportSubmissionColumns } from "@/features/profile/components/UserReportSubmissionColumns";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserReport = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const eventRegistrationData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id,
    },

    select: {
      id: true,
      
      event: {
        select: {
          title: true,
        },
      },
    },
  });

  const reportSubmissionData = await prisma.reportSubmission.findMany({
    where: {
      userId: userData?.id,
    },
  });

  const fixedData = reportSubmissionData.map((report) => {
    // Find corresponding event registration for the report
    const eventRegistration = eventRegistrationData.find(
      (registration) => registration.id === report.eventRegistrationId,
    );

    return {
      id: report.id,
      eventRegistrationId: report.eventRegistrationId,
      userId: userData?.id,
      userSlug: userData?.slug,
      eventTitle: eventRegistration?.event.title,
      status: report.status,
      submittedAt: report.submittedAt,
    };
  });

  return (
    <div className="user-report-data-table-container my-2 w-full max-w-7xl overflow-auto">
      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">Report</h2>
      <div className="inner-data-table p-px">
        <DataTable
          filter={"eventTitle"}
          columns={UserReportSubmissionColumns}
          data={fixedData}
        />
      </div>
    </div>
  );
};

export default UserReport;
