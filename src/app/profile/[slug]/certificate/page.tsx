import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { UserCertificateColumns } from "@/features/profile/components/UserCertificateColumns";
import { Progress } from "@/components/ui/progress";
import fs from "fs";
import path from "path";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserCertificate = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const eventRegistrationData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id as string,
    },
    include: {
      event: {
        include: {
          eventCertificate: true,
        },
      },
    },
  });

  const reportSubmissionData = await prisma.reportSubmission.findMany({
    where: {
      userId: userData?.id as string,
      status: "Approved",
    },
  });

  // Only count credit hours for events that have approved reports
  const approvedEventRegistrationIds = new Set(
    reportSubmissionData.map((report) => report.eventRegistrationId)
  );

  const totalCredits = eventRegistrationData.reduce((sum, reg) => {
    if (approvedEventRegistrationIds.has(reg.id)) {
      const credit = reg.event?.creditHour ?? 0;
      return sum + credit;
    }
    return sum;
  }, 0);

  // Progress & Level Detection
  const goal = 1000;
  const percentComplete = Math.min((totalCredits / goal) * 100, 100);

  let level = "None";
  if (totalCredits >= 1000) level = "Gold";
  else if (totalCredits >= 500) level = "Silver";
  else if (totalCredits >= 100) level = "Bronze";

  // Build earned certificates from events
  const certificateThatSubmittedReportData = eventRegistrationData
    .filter((registration) => {
      return reportSubmissionData.some(
        (report) => report.eventRegistrationId === registration.id
      );
    })
    .map((registration) => {
      const event = registration.event;
      const approvedReport = reportSubmissionData.find(
        (report) => report.eventRegistrationId === registration.id
      );

      if (event && event.eventCertificate) {
        const eventCertificate = event.eventCertificate;
        const base64Data = eventCertificate.data.toString("base64");
        const downloadUrl = `data:${eventCertificate.contentType};base64,${base64Data}`;

        return {
          id: eventCertificate.id,
          filename: eventCertificate.filename,
          contentType: eventCertificate.contentType,
          downloadUrl,
          generatedDate:
            approvedReport?.updatedAt || approvedReport?.submittedAt || null,
          cecEarned: event.creditHour ?? 0,
        };
      }
      return null;
    })
    .filter((certificate) => certificate !== null);

  // Add Level Certificate (Bronze / Silver / Gold)
  const levelCertificates: any[] = [];

  // Helper: find the first time user reached a level threshold
  const findLevelAchievedDate = (threshold: number) => {
    let cumulativeCredits = 0;
    const reportsSorted = reportSubmissionData
      .map((r) => ({
        ...r,
        creditHour: eventRegistrationData.find(
          (reg) => reg.id === r.eventRegistrationId
        )?.event?.creditHour ?? 0,
      }))
      .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

    for (const report of reportsSorted) {
      cumulativeCredits += report.creditHour;
      if (cumulativeCredits >= threshold) {
        return report.updatedAt || report.submittedAt;
      }
    }
    return null;
  };

  // Add Level Certificates
  const addLevelCertificate = (level: string, fileName: string, achievedDate: Date | null) => {
    const filePath = path.join(process.cwd(), "public/certificates", fileName);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      const base64 = fileData.toString("base64");
      levelCertificates.push({
        id: `level-${level.toLowerCase()}`,
        filename: `${level} Certificate.pdf`,
        contentType: "application/pdf",
        downloadUrl: `data:application/pdf;base64,${base64}`,
        generatedDate: achievedDate,
        cecEarned: 0,
      });
    }
  };

  // Use real achievement dates
  if (totalCredits >= 100)
    addLevelCertificate("Bronze", "Bronze Certificate.pdf", findLevelAchievedDate(100));
  if (totalCredits >= 500)
    addLevelCertificate("Silver", "Silver Certificate.pdf", findLevelAchievedDate(500));
  if (totalCredits >= 1000)
    addLevelCertificate("Gold", "Gold Certificate.pdf", findLevelAchievedDate(1000));

  // Merge both lists
  const allCertificates = [
    ...certificateThatSubmittedReportData,
    ...levelCertificates,
  ];

  return (
    <div className="certificate-data-table-container my-2 w-full max-w-7xl overflow-auto">
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[#192f59] mb-4">
          CEC Progress
        </h2>
        <div className="w-full">
          <Progress value={percentComplete} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-gray-700">
            <div>
              <p className="font-semibold text-[#192f59]">
                {percentComplete.toFixed(1)}%
              </p>
              <p>Percent Complete</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#192f59]">{totalCredits}</p>
              <p>Credits Earned</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            Current Level:{" "}
            <span
              className={`font-semibold ${level === "Gold"
                  ? "text-yellow-500"
                  : level === "Silver"
                    ? "text-gray-400"
                    : level === "Bronze"
                      ? "text-amber-700"
                      : "text-gray-500"
                }`}
            >
              {level}
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">
        Certificate
      </h2>
      <div className="inner-data-table p-px">
        <DataTable
          filter={"filename"}
          filterPlaceholder="Filter certificate name..."
          columns={UserCertificateColumns}
          data={allCertificates}
        />
      </div>
    </div>
  );
};

export default UserCertificate;
