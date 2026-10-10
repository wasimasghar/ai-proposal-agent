import { useEffect, useState } from "react"
import { animate } from "framer-motion"
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/classNames"

function getVerdict(score: number) {
  if (score >= 75) return { label: "Strong match", className: "border-primary/40 bg-primary/10 text-primary" }
  if (score >= 50) return { label: "Partial match", className: "border-amber-400/40 bg-amber-400/10 text-amber-300" }
  return { label: "Weak match", className: "border-red-400/40 bg-red-400/10 text-red-400" }
}

interface OverallScoreChartProps {
  score: number
}

export function OverallScoreChart({ score }: OverallScoreChartProps) {
  const [shownScore, setShownScore] = useState(0)
  const verdict = getVerdict(score)

  // Count the number up in sync with the ring animation
  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (value) => setShownScore(Math.round(value)),
    })
    return () => controls.stop()
  }, [score])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative size-52 drop-shadow-[0_0_28px_rgba(250,204,21,0.2)] sm:size-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={[{ name: "Match", value: score }]}
            innerRadius="80%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            <RadialBar dataKey="value" cornerRadius={12} fill="#FACC15" background={{ fill: "#262626" }} animationDuration={1200} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-5xl font-semibold tabular-nums">
            {shownScore}
            <span className="text-2xl text-muted-foreground">%</span>
          </span>
          <span className="mt-1 text-xs text-muted-foreground">Overall match</span>
        </div>
      </div>
      <span className={cn("rounded-full border px-3 py-1 text-sm font-medium", verdict.className)}>{verdict.label}</span>
    </div>
  )
}
