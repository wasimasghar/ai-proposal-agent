import type { KeyboardEvent } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MIN_JOB_LENGTH } from "@/data/limits"
import { cn } from "@/lib/classNames"

interface JobInputBarProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled: boolean
}

export function JobInputBar({ value, onChange, onSend, disabled }: JobInputBarProps) {
  const length = value.trim().length
  const isTooShort = length > 0 && length < MIN_JOB_LENGTH
  const canSend = length >= MIN_JOB_LENGTH && !disabled

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift + Enter makes a new line
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      if (canSend) onSend()
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-linear-to-t from-background via-background/95 to-transparent pb-[max(1rem,env(safe-area-inset-bottom))] pt-10">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div
          className={cn(
            "flex items-end gap-2 rounded-3xl border border-border bg-card p-2 pl-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] focus-within:border-primary/50 focus-within:shadow-[0_0_0_4px_rgba(250,204,21,0.08),0_8px_40px_-12px_rgba(250,204,21,0.3)]",
            disabled && "opacity-70",
          )}
        >
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder={disabled ? "The agent is working..." : "Paste the job description..."}
            className="max-h-48 min-h-10 resize-none border-0 bg-transparent px-0 py-2.5 text-[15px] shadow-none focus-visible:ring-0 md:text-[15px]"
          />
          <Button
            size="icon"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send job description"
            className="size-10 shrink-0 rounded-full shadow-[0_0_24px_rgba(250,204,21,0.35)]"
          >
            <ArrowUp className="size-5" />
          </Button>
        </div>
        {isTooShort ? (
          <p className="mt-2 text-center text-xs text-amber-300">
            {length} / {MIN_JOB_LENGTH} characters. Paste the full job description.
          </p>
        ) : (
          <p className="mt-2 hidden text-center text-xs text-zinc-500 sm:block">
            Enter to send · Shift + Enter for a new line
          </p>
        )}
      </div>
    </div>
  )
}
