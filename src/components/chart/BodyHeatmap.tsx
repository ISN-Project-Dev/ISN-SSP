"use client";

import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import Image from "next/image";

interface BodyHeatmapProps {
    data: {
        neck: number;
        shoulder: number;
        torso: number;
        pelvic: number;
        lowerLimb: number;
    };
}

const chartConfig = {
    score: {
        label: "Score",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const defaultColor = "#73a4ca";
const activeColor = "#497aa7";

export default function BodyHeatmap({ data }: BodyHeatmapProps) {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);

    const chartData = useMemo(
        () => [
            { region: "Neck", score: data.neck },
            { region: "Shoulder", score: data.shoulder },
            { region: "Torso", score: data.torso },
            { region: "Pelvic", score: data.pelvic },
            { region: "Lower Limb", score: data.lowerLimb },
        ],
        [data]
    );

    const handleHover = (region: string | null) => setActiveRegion(region);

    return (
        <div className="w-full max-w-[480px] mx-auto bg-white rounded-lg border border-blue p-3">
            <div className="relative w-full mt-5 h-[330px] flex justify-center">
                <Image
                    src="/humanBodyMap.png"
                    alt="Body Map"
                    fill
                    className="object-contain opacity-90"
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                />
                {[
                    { region: "Neck", top: "11%", left: "47.5%" },
                    { region: "Shoulder", top: "20%", left: "39%" },
                    { region: "Shoulder", top: "20%", left: "56.5%" },
                    { region: "Torso", top: "35%", left: "47.5%" },
                    { region: "Pelvic", top: "50%", left: "47.5%" },
                    { region: "Lower Limb", top: "70%", left: "42.5%" },
                    { region: "Lower Limb", top: "70%", left: "52.5%" },
                ].map((part, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-white cursor-pointer transition-all duration-200 ease-in-out"
                        onMouseEnter={() => handleHover(part.region)}
                        onMouseLeave={() => handleHover(null)}
                        style={{
                            top: part.top,
                            left: part.left,
                            width: "16px",
                            height: "16px",
                            backgroundColor:
                                activeRegion === part.region ? activeColor : defaultColor,
                            transform:
                                activeRegion === part.region ? "scale(1.1)" : "scale(1)",
                        }}
                    />
                ))}
            </div>
            <Card className="mt-4 shadow-none border-none">
                <CardHeader className="text-lg text-center font-semibold text-[#192f59]">
                    <CardTitle>Symmetry Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, left: 5, right: 5 }}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="region"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                            />
                            <YAxis
                                type="number"
                                axisLine={false}
                                tickLine={false}
                                width={25}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="score"
                                radius={8}
                                onMouseEnter={(_, index) =>
                                    handleHover(chartData[index].region)
                                }
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            activeRegion === entry.region
                                                ? activeColor
                                                : defaultColor
                                        }
                                        style={{
                                            transition: "fill 0.2s ease-in-out",
                                        }}
                                    />
                                ))}
                                <LabelList
                                    dataKey="score"
                                    position="top"
                                    className="fill-[#192f59] text-xs pointer-events-none"
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
