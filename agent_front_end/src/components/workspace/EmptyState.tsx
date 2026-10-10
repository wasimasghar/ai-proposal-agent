import { motion } from "framer-motion"
import { ClipboardPaste, Sparkles } from "lucide-react"
import type { ExampleJob } from "@/data/exampleJobs"

interface EmptyStateProps {
  examples: ExampleJob[]
  onPickExample: (text: string) => void
}

export function EmptyState({ examples, onPickExample }: EmptyStateProps) {
  return (
    <div className="flex min-h-[calc(100dvh-16rem)] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_50px_rgba(250,204,21,0.2)]"
      >
        <ClipboardPaste className="size-7" />
      </motion.div>

      <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Paste a job description to begin</h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        The agent compares it with your resume, shows how well you match and then writes the proposal.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {examples.map((example, index) => (
          <motion.button
            key={example.label}
            type="button"
            onClick={() => onPickExample(example.text)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-zinc-300 transition hover:border-primary/50 hover:text-primary"
          >
            <Sparkles className="size-3.5 text-primary" />
            {example.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
