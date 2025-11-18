import prisma from "@/databases/db";
import UserDashboardButton from "@/features/profile/components/UserDashboardButton";
import HealthScoreRadialChart from "@/components/chart/HealthScoreRadialChart";
import RiskIndexRadialChart from "@/components/chart/RiskIndexRadialChart";
import BodyHeatmap from "@/components/chart/BodyHeatmap";
import RiskInjuryRadarChart from "@/components/chart/RiskInjuryRadarChart";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserDashboard = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: { slug: (await params).slug },
  });

  const riskData = await prisma.riskEvaluation.findUnique({
    where: { userId: userData?.id },
  });

  const radarData = riskData
    ? [
        { subject: "Mobility", value: riskData.mobility || 0, fullMark: 100 },
        { subject: "Stability", value: riskData.stability || 0, fullMark: 100 },
        { subject: "Symmetry", value: riskData.symmetry || 0, fullMark: 100 },
      ]
    : [];

  const bodyData = riskData
    ? {
        neck: riskData.neckRiskIndex || 0,
        shoulder: riskData.shoulderRiskIndex || 0,
        torso: riskData.torsoRiskIndex || 0,
        pelvic: riskData.pelvicRiskIndex || 0,
        lowerLimb: riskData.lowerLimbRiskIndex || 0,
      }
    : {
        neck: 0,
        shoulder: 0,
        torso: 0,
        pelvic: 0,
        lowerLimb: 0,
      };

  return (
    <div className="user-data-table-container w-full max-w-7xl mx-auto">
      <UserDashboardButton id={userData?.id || ""} />
      {riskData ? (
        <div className="border-none bg-white mt-10">
          {/* <h2 className="text-xl font-semibold text-[#192f59] text-center mb-8">
            Exercise Risk Evaluation Summary
          </h2> */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-4">
            <div className="flex flex-col items-center lg:w-[45%]">
              <div className="w-full">
                <BodyHeatmap data={bodyData} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 lg:w-[55%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="border-none">
                  <HealthScoreRadialChart
                    value={riskData.overallScore || 0}
                    label="Overall Score"
                  />
                </div>
                <div className="border-none">
                  <RiskIndexRadialChart
                    value={riskData.riskIndex || 0}
                    label="Risk Index"
                  />
                </div>
              </div>
              <div className="w-full">
                <RiskInjuryRadarChart data={radarData} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No risk evaluation data available.
        </p>
      )}
    </div>
  );
};

export default UserDashboard;
