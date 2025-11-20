"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Image from "next/image";

export function PopularEventsBarChart({ data }: { data: any[] }) {
    const mainColor = "#497aa7"

    const coloredData = data.map((d) => ({
        ...d,
        fill: mainColor,
    }))

    const hasData = Array.isArray(data) && data.length > 0 && data.some((d) => d.participants > 0)

    if (!hasData) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="text-lg font-semibold text-[#192f59]">
                    <CardTitle>Popular Events</CardTitle>
                    <CardDescription className="pt-2 text-gray-500 font-medium">Showing top 5 events</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <Image
                            src="/dataNotAvailable.png"
                            alt="No data available"
                            className="h-20 w-20 mb-3 opacity-60"
                            draggable="false"
                            width={56}
                            height={56}
                        />
                        <p className="font-medium">No event participation data available yet</p>
                        <p className="text-xs text-gray-400 mt-1">Once events have participants, this chart will appear.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card className="flex flex-col">
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Popular Events</CardTitle>
                <CardDescription className="pt-2 text-gray-500 font-medium">Showing top 5 events</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-2">
                <ChartContainer
                    config={{ participants: { label: "Participants" } }}
                    className="w-full h-[250px]"
                >
                    <BarChart
                        data={coloredData}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                        />
                        <YAxis
                            dataKey="label"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            width={150}
                        />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="participants"
                            radius={6}
                            barSize={20}
                            isAnimationActive={true}
                            fill={mainColor}
                        >
                            <LabelList
                                dataKey="participants"
                                position="right"
                                className="fill-[#192f59] text-xs"
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
