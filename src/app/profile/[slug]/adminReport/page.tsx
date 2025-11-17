import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { AdminReportColumns } from "@/features/profile/components/AdminReportColumns";

const AdminReportPage = async () => {
  // Only fetch reports that are not "Not Submitted"
  const reportSubmissions = await prisma.reportSubmission.findMany({
    where: {
      status: { not: "Not Submitted" },
    },
    include: {
      User: { select: { name: true } },
      reportFile: { select: { filename: true, contentType: true, data: true } },
    },
  });

  // Map and clean data for table
  const formattedReports = await Promise.all(
    reportSubmissions.map(async (report) => {
      const event = await prisma.event.findUnique({
        where: { id: report.eventId },
        select: { title: true },
      });

      return {
        id: report.id,
        reportName: report.reportFile?.filename ?? "Unnamed Report",
        eventTitle: event?.title ?? "N/A",
        username: report.User?.name ?? "Unknown",
        status: report.status,
        downloadUrl:
          report.reportFile?.data && report.reportFile?.contentType
            ? `data:${report.reportFile.contentType};base64,${report.reportFile.data.toString("base64")}`
            : null,
      };
    })
  );

  return (
    <div className="admin-report-table-container my-2 w-full max-w-7xl overflow-auto">
      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">Report Management</h2>
      <div className="inner-data-table p-px">
        <DataTable
          filter={"username"}
          filterPlaceholder="Filter username..."
          columns={AdminReportColumns}
          data={formattedReports}
        />
      </div>
    </div>
  );
};

export default AdminReportPage;
