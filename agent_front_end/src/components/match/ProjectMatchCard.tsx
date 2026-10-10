import { motion } from "framer-motion"
import type { RelevantProject } from "@/types/match"

interface ProjectMatchCardProps {
  project: RelevantProject
  rank: number
}

export function ProjectMatchCard({ project, rank }: ProjectMatchCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">#{rank}</p>
          <p className="truncate font-medium">{project.name}</p>
        </div>
        <span className="font-heading text-lg font-semibold tabular-nums text-primary">{project.relevance}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[#262626]">
        <motion.div
          className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(250,204,21,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${project.relevance}%` }}
          transition={{ duration: 0.9, delay: 0.2 + rank * 0.1, ease: "easeOut" }}
        />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{project.reason}</p>
    </div>
  )
}
