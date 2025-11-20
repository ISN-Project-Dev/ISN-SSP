"use client"

import { Pie, PieChart, Label } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import Image from "next/image";

const medalColors = {
    Bronze: "#9fcae6",
    Silver: "#73a4ca",
    Gold: "#497aa7",
}

function MedallionsTooltip({ active, payload }: any) {
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

export function MedallionsPieChart({ data, total }: { data: any[]; total: number }) {
    const coloredData = data.map((d) => ({
        ...d,
        fill: medalColors[d.label as keyof typeof medalColors],
    }))

    if (!data?.length || total === 0) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="text-lg font-semibold text-[#192f59]">
                    <CardTitle>CEC Medallions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <Image
                            src="/noData.png"
                            alt="No data available"
                            className="h-20 w-20 mb-3 opacity-60"
                            draggable="false"
                            width={56}
                            height={56}
                        />
                        <p className="font-medium">No medallion data available yet</p>
                        <p className="text-xs text-gray-400 mt-1">Once participants earn medallions, this chart will appear.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>CEC Medallions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between pb-4">
                <div className="flex-[2] flex justify-center">
                    <ChartContainer
                        config={{ count: { label: "Medallions" } }}
                        className="w-[90%] max-w-[320px] h-[250px] aspect-square"
                    >
                        <PieChart>
                            <ChartTooltip content={<MedallionsTooltip />} />
                            <Pie
                                data={coloredData}
                                dataKey="count"
                                nameKey="label"
                                innerRadius={60}
                                outerRadius={95}
                                stroke="#fff"
                                strokeWidth={2}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-[#192f59] text-3xl font-bold"
                                                    >
                                                        {total}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-gray-500 text-sm"
                                                    >
                                                        Medallions
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className="flex-[1] flex flex-col gap-3 text-sm items-start">
                    {coloredData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: item.fill }}
                            />
                            <span className="text-[#192f59] font-medium w-16">{item.label}</span>
                            <span className="text-gray-500 w-10">{((item.count / total) * 100).toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
