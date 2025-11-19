import prisma from "@/databases/db";
import { DataTable } from "@/components/ui/DataTable";
import { AdminEventDataColumns } from "@/features/admin/components/AdminEventTableColumns";
import { AdminUserDataColumns } from "@/features/admin/components/AdminUserTableColumns";
import { PopularEventsBarChart } from "@/components/chart/PopularEventsBarChart"
import { MedallionsPieChart } from "@/components/chart/MedallionsPieChart"
import { EventTypesPieChart } from "@/components/chart/EventTypesPieChart";
import { MonthlyEventsLineChart } from "@/components/chart/MonthlyEventsLineChart"

export default async function Admin() {
  const activeUsers = await prisma.user.count({
    where: {
      isActive: true,
    },
  });

  const totalUsers = await prisma.user.count();

  const activeUsersPercentage = (activeUsers / totalUsers) * 100;

  const mostPopularEvent = await prisma.event.findFirst({
    orderBy: {
      eventRegistrations: {
        _count: "desc",
      },
    },
    include: {
      eventRegistrations: true,
    },
  });

  // Count total events and total participants
  const totalEvents = await prisma.event.count();
  const totalEventRegistrations = await prisma.eventRegistration.count();

  // Avoid division by zero
  const avgParticipants =
    totalEvents > 0 ? Math.round(totalEventRegistrations / totalEvents) : 0;

  const eventData = await prisma.event.findMany({
    include: {
      eventCertificate: {
        select: {
          filename: true,
        },
      },
    },
  });

  // Separate events based on date
  const now = new Date();

  const upcomingEvents = eventData.filter((event) => {
    if (!event.date) return false;
    return new Date(event.date) >= now;
  });

  const endedEvents = eventData.filter((event) => {
    if (!event.date) return true;
    return new Date(event.date) < now;
  });

  const rawEvents = await prisma.event.findMany({
    select: {
      createdAt: true,
    },
  });

  const groupedData = rawEvents.reduce(
    (acc, event) => {
      const date = event.createdAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(groupedData).map(([date, count]) => ({
    label: date,
    eventCreated: count,
  }));

  const userData = await prisma.user.findMany();

  // Fetch all users with their event registrations and event credit hours
  const users = await prisma.user.findMany({
    include: {
      eventRegistrations: {
        include: {
          event: true,
        },
      },
    },
  })

  // Compute total credit hours for each user
  const userCredits = users.map((user) => {
    const totalCredit = user.eventRegistrations.reduce(
      (sum, reg) => sum + (reg.event?.creditHour || 0),
      0
    )
    return { ...user, totalCredit }
  })

  // Classify users into medal tiers
  const bronzeCount = userCredits.filter((u) => u.totalCredit >= 100).length
  const silverCount = userCredits.filter((u) => u.totalCredit >= 500).length
  const goldCount = userCredits.filter((u) => u.totalCredit >= 1000).length

  const totalMedallions = bronzeCount + silverCount + goldCount
  const medalData = [
    { label: "Bronze", count: bronzeCount },
    { label: "Silver", count: silverCount },
    { label: "Gold", count: goldCount },
  ]

  const monthlyHeldEvents = await prisma.event.findMany({
    select: { date: true },
    where: {
      date: { not: null },
    },
  })

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const eventsByMonth = Array(12).fill(0)
  monthlyHeldEvents.forEach((event) => {
    const eventDate = new Date(event.date as Date)
    const monthIndex = eventDate.getMonth()
    eventsByMonth[monthIndex] += 1
  })

  const monthlyEventData = monthNames.map((month, index) => ({
    month,
    count: eventsByMonth[index],
  }))

  return (
    <main className="admin-main flex flex-col items-center justify-center px-4 py-6">
      <div className="mt-10 grid w-full max-w-7xl px-10 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Active Users */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#192f59]">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-[#192f59] mt-2">
            {activeUsersPercentage.toFixed(0)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total Active Users: {activeUsers}/{totalUsers}
          </p>
        </div>
        {/* Registered Users */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#192f59]">
            Total Registered Users
          </h3>
          <p className="text-3xl font-bold text-[#192f59] mt-2">
            {totalUsers}
          </p>
        </div>
        {/* Avg Participants per Event */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#192f59] text-center">
            Average Participants
          </h3>
          <h3 className="text-lg font-semibold text-[#192f59] text-center">
            Per Event
          </h3>
          <p className="text-3xl font-bold text-[#192f59] mt-2">
            {avgParticipants}
          </p>
        </div>
        {/* Total Event */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#192f59] text-center">
            Total Events Held
          </h3>
          <p className="text-3xl font-bold text-[#192f59] mt-2">
            {totalEvents}
          </p>
        </div>
      </div>
      <div className="my-6 grid w-full px-10 max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CEC Medallions Chart */}
        <MedallionsPieChart data={medalData} total={totalMedallions} />
        {/* Event Types Chart */}
        <EventTypesPieChart
          data={(
            await prisma.event.groupBy({
              by: ["type"],
              _count: { type: true },
            })
          ).map((e) => ({
            type: e.type || "Unknown",
            count: e._count.type,
          }))}
        />
        {/* Popular Events Chart */}
        <PopularEventsBarChart
          data={(
            await prisma.event.findMany({
              include: { eventRegistrations: true },
            })
          )
            .map((e) => ({
              label: e.title,
              participants: e.eventRegistrations.length,
            }))
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 5)}
        />
        {/* Monthly Events Chart */}
        <MonthlyEventsLineChart data={monthlyEventData} />
      </div>
      {/* Upcoming Events */}
      <div className="event-data-table-container my-8 w-full max-w-7xl px-10 overflow-auto">
        <h2 className="mb-5 text-xl font-semibold text-[#192f59]">Upcoming Events</h2>
        <p className="text-sm text-gray-500 mb-2">
          Showing {upcomingEvents.length} upcoming events
        </p>
        <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <DataTable
            filter="title"
            filterPlaceholder="Filter upcoming events..."
            columns={AdminEventDataColumns}
            data={upcomingEvents}
          />
        </div>
      </div>
      {/* Ended Events */}
      <div className="event-data-table-container my-8 w-full max-w-7xl px-10 overflow-auto">
        <h2 className="mb-5 text-xl font-semibold text-[#192f59]">Ended Events</h2>
        <p className="text-sm text-gray-500 mb-2">
          Showing {endedEvents.length} ended events
        </p>
        <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <DataTable
            filter="title"
            filterPlaceholder="Filter ended events..."
            columns={AdminEventDataColumns}
            data={endedEvents}
          />
        </div>
      </div>
      <div className="user-data-table-container my-8 w-full max-w-7xl px-10 overflow-auto">
        <h2 className="mb-5 text-xl font-semibold text-[#192f59]">
          User Management
        </h2>
        <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <DataTable
            filter="name"
            filterPlaceholder="Filter name..."
            columns={AdminUserDataColumns}
            data={userData}
          />
        </div>
      </div>
    </main>
  );
}
