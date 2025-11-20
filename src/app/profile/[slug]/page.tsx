import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProfileId({ params }: ParamProps) {
  const { slug } = await params;

  const data = await prisma.user.findUnique({
    where: {
      slug: slug,
    },

    select: {
      name: true,
      email: true,
      userDetail: true,
    },
  });

  const userDetail = data?.userDetail;

  function formatDate(date: Date | null | undefined): string {
    if (!(date instanceof Date)) return "";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Return the formatted date string
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  return (
    <div className="my-2">
      <h2 className="mb-2 text-xl font-semibold text-[#192f59]">Profile Details</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-y-5 text-base text-gray-700">
        <div>
          <p className="font-semibold">Name</p>
          <p>{data?.name || "—"}</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p>{data?.email || "—"}</p>
        </div>
        <div>
          <p className="font-semibold">Age</p>
          <p>{userDetail?.age || "—"}</p>
        </div>
        <div>
          <p className="font-semibold">Gender</p>
          <p>{userDetail?.gender || "—"}</p>
        </div>
        {/* <div>
          <p className="font-semibold">Mobile Phone</p>
          <p>{userDetail?.phoneNumber || "—"}</p>
          <p>—</p>
        </div> */}
        <div>
          <p className="font-semibold">Date of Birth</p>
          <p>{formatDate(userDetail?.dateOfBirth)}</p>
        </div>
        {/* <div>
          <p className="font-semibold">Ethnicity</p>
          <p>{userDetail?.ethnicity || "—"}</p>
          <p>—</p>
        </div> */}
        <div>
          <p className="font-semibold">University</p>
          <p>{userDetail?.university || "—"}</p>
        </div>
        <div>
          <p className="font-semibold">Height</p>
          <p>{userDetail?.height || "—"}</p>
        </div>
        <div>
          <p className="font-semibold">Weight</p>
          <p>{userDetail?.weight || "—"}</p>
        </div>
        {/* <div>
          <p className="font-semibold">Highest Degree</p>
          <p>{userDetail?.highestDegree || "—"}</p>
          <p>—</p>
        </div> */}
      </div>
    </div>
  );
}