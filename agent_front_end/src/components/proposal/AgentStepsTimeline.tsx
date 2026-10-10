import { motion } from "framer-motion"
import { Workflow } from "lucide-react"

interface AgentStepsTimelineProps {
  steps: string[]
}

export function AgentStepsTimeline({ steps }: AgentStepsTimelineProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-medium">
        <Workflow className="size-4 text-primary" />
        How the agent worked
      </p>
      <ol className="ml-1.5 space-y-4 border-l border-border pl-5">
        {steps.map((step, index) => (
          <motion.li
            key={`${index}-${step}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[26.5px] top-1.5 size-3 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
            <p className="text-sm">
              <span className="mr-2 tabular-nums text-muted-foreground">{index + 1}.</span>
              {step}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
