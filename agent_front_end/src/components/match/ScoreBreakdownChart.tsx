import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ScoreBreakdownChartProps {
  skills: number
  experience: number
  projects: number
}

export function ScoreBreakdownChart({ skills, experience, projects }: ScoreBreakdownChartProps) {
  const data = [
    { label: "Skills", value: skills },
    { label: "Experience", value: experience },
    { label: "Projects", value: projects },
  ]

  return (
    <div className="flex flex-col">
      <p className="mb-2 text-sm font-medium">Score breakdown</p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#2A2A2A" strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#A1A1AA", fontSize: 12 }} />
            <YAxis domain={[0, 100]} ticks={[0, 50, 100]} tickLine={false} axisLine={false} tick={{ fill: "#71717A", fontSize: 11 }} />
            <Tooltip
              cursor={{ fill: "rgba(250,204,21,0.06)" }}
              contentStyle={{ background: "#161616", border: "1px solid #2A2A2A", borderRadius: 12 }}
              labelStyle={{ color: "#A1A1AA" }}
              itemStyle={{ color: "#FACC15" }}
              formatter={(value) => [`${value}%`, "Score"]}
            />
            <Bar dataKey="value" fill="#FACC15" radius={[8, 8, 0, 0]} maxBarSize={56} animationDuration={900}>
              <LabelList dataKey="value" position="top" fill="#FAFAFA" fontSize={12} formatter={(value: unknown) => `${value}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
