"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image";

interface FeedbackRatingBarChartProps {
    data: any[]
    averageRating?: string
    totalResponses?: number
    feedbacks?: { user?: { name?: string }; comment?: string }[]
}

export function FeedbackRatingBarChart({
    data,
    averageRating = "0.0",
    totalResponses = 0,
    feedbacks = [],
}: FeedbackRatingBarChartProps) {
    const hasFeedback = feedbacks && feedbacks.length > 0
    const total = data.reduce((sum, d) => sum + d.count, 0)

    const ratingData = data.map((d) => ({
        ...d,
        percent: total ? Math.round((d.count / total) * 100) : 0,
    }))

    return (
        <Card className="flex flex-col">
            <CardHeader className="text-lg font-semibold text-[#192f59]">
                <CardTitle>Event Ratings</CardTitle>
                <CardDescription className="pt-2 text-gray-500 font-medium">
                    Based on {totalResponses}{" "}
                    {totalResponses === 1 ? "response" : "responses"}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row justify-between items-start gap-8">
                <div className="flex-1 w-full flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row items-center lg:items-center justify-center gap-6 w-full">
                        <div className="flex flex-col items-center text-center lg:text-left">
                            <div className="flex items-center gap-2">
                                <span className="text-5xl font-bold text-[#192f59]">{averageRating}</span>
                                <span className="text-gray-500 text-lg">/ 5</span>
                            </div>
                            <div className="flex mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-2xl ${i < Math.round(Number(averageRating))
                                            ? "text-yellow-300"
                                            : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-md text-gray-500 mt-2">Average Rating</p>
                        </div>
                        <div className="flex flex-col gap-3 w-full max-w-[330px]">
                            {ratingData.map((r, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-gray-700"
                                >
                                    <span className="w-12 text-right">
                                        {r.label.replace(" Stars", "").replace(" Star", "")}
                                    </span>
                                    <span className="text-yellow-300 text-base">★</span>
                                    <Progress
                                        value={r.percent}
                                        className="flex-1 h-3 bg-gray-200 mx-2"
                                    />
                                    <div className="w-20 text-right text-xs text-gray-500">
                                        {r.count} {r.count === 1 || r.count === 0 ? "response" : "responses"}{" "}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    {hasFeedback ? (
                        <div className="flex flex-col gap-2 h-[220px] overflow-y-auto pr-2">
                            {feedbacks.map((fb, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-md p-2 text-sm text-[#192f59] shadow-sm border border-gray-100"
                                >
                                    <p className="text-gray-700">{fb.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-4">
                            <Image
                                src="/dataNotAvailable.png"
                                alt="No feedback"
                                className="h-14 w-14 mb-2 opacity-60"
                                draggable="false"
                                width={56}
                                height={56}
                            />
                            <p className="font-medium text-sm">No feedback submitted yet</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
