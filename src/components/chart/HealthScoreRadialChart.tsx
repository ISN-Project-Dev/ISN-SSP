"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthScoreRadialChartProps {
    value: number;
    label?: string;
}

const HealthScoreRadialChart: React.FC<HealthScoreRadialChartProps> = ({
    value,
    label = "Overall Score",
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 800;
        const step = 16;
        const total = duration / step;
        const increment = value / total;
        const timer = setInterval(() => {
            start += increment;

            if (start >= value) {
                start = value;
                clearInterval(timer);
            }

            setAnimatedValue(start);
        }, step);

        return () => clearInterval(timer);
    }, [value]);

    const getStatus = (v: number) => {
        if (v < 40) return { text: "POOR", color: "#f44336", light: "#ef9a9a" };
        if (v < 75) return { text: "FAIR", color: "#ffb300", light: "#ffe082" };
        return { text: "EXCELLENT", color: "#4caf50", light: "#c8e6c9" };
    };

    const { text: statusText, color, light } = getStatus(animatedValue);
    const gaugeValue = (animatedValue / 100) * 100;
    const data = [{ name: "value", value: gaugeValue }];
    const [showTooltip, setShowTooltip] = useState(false);

    const getTooltipText = (status: string) => {
        switch (status) {
            case "POOR":
                return "Consider improving activity and lifestyle habits.";
            case "FAIR":
                return "You are on the right track with room for improvement.";
            case "EXCELLENT":
                return "Keep maintaining your current routine.";
            default:
                return "";
        }
    };

    return (
        <Card className="bg-white shadow-none border border-blue">
            <CardHeader className="text-lg text-center font-semibold text-[#192f59]">
                <CardTitle>{label}</CardTitle>
                <p className="text-xs text-gray-500 mt-1">Max: 100</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="relative w-full h-[180px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="70%"
                            outerRadius="100%"
                            startAngle={225}
                            endAngle={-45}
                            data={data}
                        >
                            <defs>
                                <linearGradient
                                    id="scoreGaugeGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={light}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={color}
                                    />
                                </linearGradient>
                            </defs>
                            <RadialBar
                                dataKey="value"
                                cornerRadius={8}
                                background={{ fill: "#e6e6e6" }}
                                fill="url(#scoreGaugeGradient)"
                            />
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                tick={false}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-3xl font-semibold text-gray-500">{animatedValue.toFixed(0)}</p>
                    </div>
                </div>
                <div className="relative">
                    <div
                        className="w-40 text-center py-2 rounded-sm text-white font-medium text-md cursor-pointer"
                        style={{ backgroundColor: color }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        {statusText}
                    </div>

                    {showTooltip && (
                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 z-50 bg-white text-gray-800 text-sm px-4 py-3 rounded-md shadow-lg border border-gray-200 w-72 text-center">
                            {getTooltipText(statusText)}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default HealthScoreRadialChart;
