"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreGaugeProps {
    value: number;
    label?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
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

    return (
        <Card className="bg-white shadow-none border border-blue">
            <CardHeader className="text-lg text-center font-semibold text-[#192f59]">
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                {/* Gauge */}
                <div className="relative w-full h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
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
                                <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={light} />
                                    <stop offset="100%" stopColor={color} />
                                </linearGradient>
                            </defs>
                            <RadialBar
                                dataKey="value"
                                cornerRadius={8}
                                background={{ fill: "#e6e6e6" }}
                                fill="url(#scoreGaugeGradient)"
                            />
                            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <p
                            className="text-3xl font-semibold text-gray-500"
                        >
                            {animatedValue.toFixed(0)}
                        </p>
                    </div>
                </div>
                <div
                    className="px-8 py-3 rounded-sm text-white font-medium text-md"
                    style={{ backgroundColor: color }}
                >
                    {statusText}
                </div>
            </CardContent>
        </Card>
    );
};

export default ScoreGauge;
