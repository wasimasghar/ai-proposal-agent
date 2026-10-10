import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, CircleCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/classNames"

interface AgentProgressProps {
  /** All steps in order, e.g. "Reading your resume..." */
  steps: string[]
  /** Index of the step running now. steps.length (or more) means everything is done. */
  currentStep: number
  /** Text shown when all steps are done. */
  doneLabel?: string
}

const withoutDots = (step: string) => step.replace(/\.{3}$/, "")

/**
 * Claude-style progress: one live status line plus a collapsible list of finished steps.
 * It only needs `steps` and `currentStep`, so backend events can drive it later.
 */
export function AgentProgress({ steps, currentStep, doneLabel = "Done" }: AgentProgressProps) {
  const isDone = currentStep >= steps.length
  const finishedSteps = steps.slice(0, Math.min(currentStep, steps.length))
  const [showSteps, setShowSteps] = useState(true)

  // Keep the list open while working, fold it away once everything is finished.
  useEffect(() => {
    setShowSteps(!isDone)
  }, [isDone])

  return (
    <div className="space-y-2.5">
      {finishedSteps.length > 0 && (
        <button
          type="button"
          onClick={() => setShowSteps((value) => !value)}
          className="flex cursor-pointer items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ChevronDown className={cn("size-3.5 transition-transform", showSteps && "rotate-180")} />
          {showSteps ? "Hide steps" : `Show steps (${finishedSteps.length})`}
        </button>
      )}

      <AnimatePresence initial={false}>
        {showSteps && finishedSteps.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-1.5 overflow-hidden border-l border-border pl-4"
          >
            {finishedSteps.map((step) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-3.5 shrink-0 text-primary" />
                {withoutDots(step)}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <StatusIcon isDone={isDone} />
        <div className="relative h-6 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={isDone ? "done" : currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={cn("truncate text-sm leading-6", isDone ? "font-medium text-foreground" : "agent-shimmer")}
            >
              {isDone ? doneLabel : steps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ isDone }: { isDone: boolean }) {
  if (isDone) {
    return <CircleCheck className="size-5 shrink-0 text-primary" />
  }
  return (
    <span className="relative grid size-5 shrink-0 place-items-center">
      <span className="absolute inset-0 animate-pulse rounded-full bg-primary/40 blur-md" />
      <motion.span
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{
          rotate: { duration: 2.4, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative text-primary"
      >
        <Sparkles className="size-5" />
      </motion.span>
    </span>
  )
}
