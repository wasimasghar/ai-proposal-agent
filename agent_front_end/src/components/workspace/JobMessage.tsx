import { useState } from "react"
import { Briefcase, ChevronDown } from "lucide-react"
import { cn } from "@/lib/classNames"

interface JobMessageProps {
  text: string
}

export function JobMessage({ text }: JobMessageProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 180 || text.split("\n").length > 3

  return (
    <div className="flex justify-end">
      <div className="max-w-[92%] rounded-2xl rounded-tr-sm border border-primary/20 bg-primary/[0.06] px-4 py-3 sm:max-w-[80%]">
        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-primary">
          <Briefcase className="size-3.5" />
          Job description
        </p>
        <p className={cn("whitespace-pre-wrap text-sm leading-relaxed text-zinc-200", !expanded && "line-clamp-3")}>
          {text}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 flex cursor-pointer items-center gap-1 text-xs text-muted-foreground transition hover:text-primary"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>
    </div>
  )
}
