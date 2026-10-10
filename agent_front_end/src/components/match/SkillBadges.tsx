import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SkillBadgesProps {
  matched: string[]
  missing: string[]
  /** True when the job listed no skills and these were guessed from the work described. */
  isInferred?: boolean
}

function InferredTag() {
  return (
    <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
      inferred
    </span>
  )
}

export function SkillBadges({ matched, missing, isInferred = false }: SkillBadgesProps) {
  return (
    <div className="space-y-4">
      {isInferred && (
        <p className="text-xs text-muted-foreground">
          The job didn't list any skills, so the agent picked them from the work described.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2.5 flex items-center text-sm font-medium">
            Skills you have <span className="ml-1 text-muted-foreground">({matched.length})</span>
            {isInferred && <InferredTag />}
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.length === 0 && <p className="text-sm text-muted-foreground">No matching skills.</p>}
            {matched.map((skill) => (
              <Badge key={skill} variant="outline" className="rounded-full border-primary/50 px-2.5 py-1 text-primary">
                <Check />
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 flex items-center text-sm font-medium">
            Missing skills <span className="ml-1 text-muted-foreground">({missing.length})</span>
            {isInferred && <InferredTag />}
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.length === 0 && <p className="text-sm text-muted-foreground">Nothing missing. Nice!</p>}
            {missing.map((skill) => (
              <Badge key={skill} variant="outline" className="rounded-full border-red-500/50 px-2.5 py-1 text-red-400">
                <X />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
