"use client"

import { Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const bluePalette = [
    "#9fcae6",
    "#73a4ca",
    "#497aa7",
    "#2e5b88",
]

function EventTypesTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
        const item = payload[0]

        return (
            <div className="rounded-md bg-white p-2 shadow-md border text-xs">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.payload.fill }}
                    />
                    <span className="font-medium text-[#192f59]">{item.name}</span>
                    <span className="text-gray-500">({item.value})</span>
                </div>
            </div>
        )
    }

    return null
}

export function PieChartLabel({ data }: { data: any[] }) {
    const sortedData = [...data].sort((a, b) => b.count - a.count)

    const coloredData = sortedData.map((d, i) => ({
        ...d,
        fill: bluePalette[i % bluePalette.length],
    }))

    const total = coloredData.reduce((sum, d) => sum + d.count, 0)

    return (
        <Card className="flex flex-col">
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between pb-4">
                <div className="flex-[2] flex justify-center">
                    <ChartContainer
                        config={{ count: { label: "Events" } }}
                        className="w-[90%] max-w-[320px] h-[250px] aspect-square"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip content={<EventTypesTooltip />} />
                                <Pie
                                    data={coloredData}
                                    dataKey="count"
                                    nameKey="type"
                                    outerRadius={95}
                                    stroke="#fff"
                                    strokeWidth={2}
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, outerRadius, value }: any) => {
                                        const RADIAN = Math.PI / 180
                                        const radius = outerRadius + 20
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN)
                                        const percentage = ((value / total) * 100).toFixed(1)

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#192f59"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="text-xs"
                                            >
                                                {percentage}%
                                            </text>
                                        )
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                <div className="flex-[1] flex flex-col gap-3 text-sm">
                    {coloredData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: item.fill }}
                            ></div>
                            <span className="text-[#192f59] font-medium">{item.type}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
