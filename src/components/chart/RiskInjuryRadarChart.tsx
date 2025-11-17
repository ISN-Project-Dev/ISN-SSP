"use client";

import React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type RiskInjuryRadarChartProps = {
  data: { subject: string; value: number; fullMark: number }[];
};

const chartConfig = {
  value: {
    label: "Score Index",
    color: "#497aa7",
  },
} satisfies ChartConfig;

export default function RiskInjuryRadarChart({
  data,
}: RiskInjuryRadarChartProps) {
  return (
    <Card className="bg-white shadow-none border border-blue">
      <CardHeader className="text-lg text-center font-semibold text-[#192f59]">
        <CardTitle>
          Activity Risk Screening Items
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <PolarAngleAxis
                dataKey="subject"
              />
              <PolarRadiusAxis angle={90} tick={{ fill: "#aaa", fontSize: 8 }} domain={[0, 100]} />
              <PolarGrid
                stroke="#444"
                radialLines={true}
                gridType="polygon"
                strokeOpacity={0.3}
              />
              <Radar
                name="Score Index"
                dataKey="value"
                fill="#497aa7"
                fillOpacity={0.6}
                stroke="#73a4ca"
                dot={{
                  r: 4,
                  fill: "#9fcae6",
                  strokeWidth: 1.5,
                  stroke: "#fff",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
