import { PenLine, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export type QuestionAnswer = "yes" | "no" | null

interface AgentQuestionProps {
  question: string
  answer: QuestionAnswer
  onYes: () => void
  onNo: () => void
}

export function AgentQuestion({ question, answer, onYes, onNo }: AgentQuestionProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(250,204,21,0.35)]">
        <Sparkles className="size-4" />
      </div>

      <div className="flex-1 rounded-2xl rounded-tl-sm border border-border bg-card p-4">
        <p className="text-sm sm:text-base">{question}</p>

        {answer === null ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={onYes} className="rounded-full shadow-[0_0_24px_rgba(250,204,21,0.3)]">
              <PenLine />
              Yes, write it
            </Button>
            <Button variant="outline" onClick={onNo} className="rounded-full">
              No, stop here
            </Button>
          </div>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">
            You chose: <span className="text-foreground">{answer === "yes" ? "Yes, write it" : "No, stop here"}</span>
          </p>
        )}
      </div>
    </div>
  )
}
