"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Image from "next/image";

export function MonthlyEventsLineChart({ data }: { data: { month: string; count: number }[] }) {
    const hasData = Array.isArray(data) && data.length > 0 && data.some((d) => d.count > 0)

    if (!hasData) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="text-lg font-semibold text-[#192f59]">
                    <CardTitle>Monthly Events Held</CardTitle>
                    <CardDescription className="pt-2 text-gray-500 font-medium">Showing total events per month</CardDescription>
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
                        <p className="font-medium">No monthly event data available yet</p>
                        <p className="text-xs text-gray-400 mt-1">Once events are created, this chart will appear.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card>
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Monthly Events Held</CardTitle>
                <CardDescription className="pt-2 text-gray-500 font-medium">Showing total events per month</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="h-[250px] w-full"
                    config={{
                        count: { label: "Events Held" }
                    }}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 30,
                            left: 20,
                            right: 20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#497aa7"
                            strokeWidth={2}
                            connectNulls={true}
                            dot={{
                                fill: "#497aa7",
                            }}
                            activeDot={{ r: 6 }}
                        >
                            <LabelList position="top"
                                offset={12}
                                className="fill-[#192f59] text-xs"
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
