import { motion, type Variants } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

interface HeroContentProps {
  onStart: () => void
}

export function HeroContent({ onStart }: HeroContentProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
    >
      <motion.span
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary backdrop-blur"
      >
        <Sparkles className="size-3.5" />
        AI Agent
      </motion.span>

      <motion.h1
        variants={item}
        className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      >
        Your AI{" "}
        <span className="bg-linear-to-r from-yellow-200 via-primary to-amber-500 bg-clip-text text-transparent">
          Proposal Agent
        </span>
      </motion.h1>

      <motion.p variants={item} className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
        Writes job-winning proposals for any job, using your real skills and projects.
      </motion.p>

      <motion.div variants={item} className="mt-10">
        <Button
          size="lg"
          onClick={onStart}
          className="group h-14 rounded-full px-9 text-base font-semibold shadow-[0_0_40px_rgba(250,204,21,0.45)] hover:shadow-[0_0_60px_rgba(250,204,21,0.6)]"
        >
          Start
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500"
      >
        <span>Reads your resume</span>
        <span className="text-primary/60">•</span>
        <span>Scores the match</span>
        <span className="text-primary/60">•</span>
        <span>Writes the proposal</span>
      </motion.p>
    </motion.div>
  )
}
