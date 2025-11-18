"use client"

import { UniversityPieChart } from "@/components/chart/UniversityPieChart"
import { GenderPieChart } from "@/components/chart/GenderPieChart"
import { FeedbackRatingBarChart } from "@/components/chart/FeedbackRatingBarChart"
import { Button } from "@/components/ui/button"

export default function EventStatistics({ event }: { event: any }) {
  const universityCount: Record<string, number> = {}
  const genderCount: Record<string, number> = {}

  event.eventRegistrations.forEach((reg: any) => {
    const uni = reg.user?.userDetail?.university || "Unknown"
    const gender = reg.user?.userDetail?.gender || "Unknown"
    universityCount[uni] = (universityCount[uni] || 0) + 1
    genderCount[gender] = (genderCount[gender] || 0) + 1
  })

  const universityData = Object.entries(universityCount).map(([key, value]) => ({
    label: key,
    count: value,
    fill: "var(--color-chrome)",
  }))

  const genderData = Object.entries(genderCount).map(([key, value]) => ({
    label: key,
    count: value,
    fill: "var(--color-safari)",
  }))

  const totalParticipants = event.eventRegistrations.length

  const ratingCount: Record<string, number> = {}

    ; (event.feedbacks ?? []).forEach((feedback: any) => {
      const rating = feedback?.rating ?? 0
      ratingCount[rating] = (ratingCount[rating] || 0) + 1
    })

  const ratingData = [5, 4, 3, 2, 1].map((star) => ({
    label: `${star}`,
    count: ratingCount[star] || 0,
  }))

  const totalRatings = Object.entries(ratingCount).reduce(
    (sum, [rating, count]) => sum + Number(rating) * count,
    0
  )

  const totalResponses = Object.values(ratingCount).reduce((sum, c) => sum + c, 0)
  const averageRating = totalResponses ? (totalRatings / totalResponses).toFixed(1) : "0.0"

  return (
    <main className="mt-10 flex flex-col items-center px-6 py-8">
      <div className="mb-8 flex w-full max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-bold text-[#192f59]">
          Statistics for {event.title}
        </h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          ← Back to Admin
        </Button>
      </div>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <UniversityPieChart data={universityData} />
        <GenderPieChart data={genderData} total={totalParticipants} />
        <div className="md:col-span-2">
          <FeedbackRatingBarChart
            data={ratingData}
            averageRating={averageRating}
            totalResponses={totalResponses}
            feedbacks={event.feedbacks}
          />
        </div>
      </div>
    </main>
  )
}
