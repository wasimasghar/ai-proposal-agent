import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { MatchReport as MatchReportData } from "@/types/match"
import { OverallScoreChart } from "./OverallScoreChart"
import { ProjectMatchCard } from "./ProjectMatchCard"
import { ScoreBreakdownChart } from "./ScoreBreakdownChart"
import { SkillBadges } from "./SkillBadges"

interface MatchReportProps {
  report: MatchReportData
}

export function MatchReport({ report }: MatchReportProps) {
  const totalSkills = report.matched_skills.length + report.missing_skills.length

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-[0_0_60px_-24px_rgba(250,204,21,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Match report</p>
          <h3 className="font-heading text-lg font-semibold">How well you fit this job</h3>
        </div>
        <Badge variant="outline" className="rounded-full border-primary/40 px-2.5 py-1 text-primary">
          {report.matched_skills.length} of {totalSkills} skills
        </Badge>
      </div>

      <div className="grid items-center gap-8 p-5 sm:p-6 md:grid-cols-2">
        <OverallScoreChart score={report.overall_match} />
        <ScoreBreakdownChart
          skills={report.skill_match}
          experience={report.experience_match}
          projects={report.project_match}
        />
      </div>

      <div className="border-t border-border px-5 py-5 sm:px-6">
        <SkillBadges
          matched={report.matched_skills}
          missing={report.missing_skills}
          isInferred={report.inferred_skills.length > 0}
        />
      </div>

      <div className="border-t border-border px-5 py-5 sm:px-6">
        <p className="mb-3 text-sm font-medium">Your best projects for this job</p>
        <div className="grid gap-3 md:grid-cols-3">
          {report.relevant_projects.slice(0, 3).map((project, index) => (
            <ProjectMatchCard key={project.name} project={project} rank={index + 1} />
          ))}
        </div>
      </div>
    </Card>
  )
}
