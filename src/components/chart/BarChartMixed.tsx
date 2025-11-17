"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function BarChartMixed({ data }: { data: any[] }) {
    const mainColor = "#497aa7"

    const coloredData = data.map((d) => ({
        ...d,
        fill: mainColor,
    }))

    return (
        <Card className="flex flex-col">
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Popular Events</CardTitle>
                <CardDescription className="pt-2 text-gray-500 font-medium">
                    Showing top 5 events
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-2">
                <ChartContainer
                    config={{ participants: { label: "Participants" } }}
                    className="w-full h-[250px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={coloredData}
                            layout="vertical"
                            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <YAxis
                                dataKey="label"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                width={150}
                            />
                            <XAxis type="number" axisLine={false} tickLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
