"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A line chart showing total events held per month"

export function LineChartLabel({ data }: { data: { month: string; count: number }[] }) {
    return (
        <Card>
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Monthly Events Held</CardTitle>
                <CardDescription className="pt-2 text-gray-500 font-medium">Showing total events per month</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-[250px] w-full" config={{ count: { label: "Events Held" } }}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 30,
                            left: 20,
                            right: 20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
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
                            <LabelList position="top" offset={12} className="fill-[#192f59] text-xs" />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
