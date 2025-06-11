import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { ApplyServiceColumns } from "@/features/profile/components/ApplyServiceColumns";

const UserService = async () => {
  const applyServiceData = await prisma.eventRegistration.findMany({
    where: {
      participationType: "helper",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      event: {
        select: {
          title: true, // Include the event certificate data
        },
      },
    },
  });

  return (
    <div className="user-report-data-table-container my-2 w-full max-w-7xl overflow-auto">
      <h2 className="mb-5 text-xl font-semibold text-[#192f59]">
        Service
      </h2>
      {/* Admin User Data Table */}
      <div className="inner-data-table p-px">
        <DataTable
          filter={"username"}
          columns={ApplyServiceColumns}
          data={applyServiceData}
        />
      </div>
    </div>
  );
};

export default UserService;
