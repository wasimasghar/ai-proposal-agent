import type { RefObject } from "react"
import { Sparkles } from "lucide-react"
import type { ResumeStatus } from "@/hooks/useAgentWorkspace"
import type { Resume } from "@/types/resume"
import { ClearButton } from "./ClearButton"
import { ResumeChip } from "./ResumeChip"

interface TopBarProps {
  resume: Resume | null
  resumeStatus: ResumeStatus
  resumeInputRef: RefObject<HTMLInputElement | null>
  onUpload: (file: File) => void
  onClear: () => void
  canClear: boolean
}

export function TopBar({ resume, resumeStatus, resumeInputRef, onUpload, onClear, canClear }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_20px_rgba(250,204,21,0.35)]">
            <Sparkles className="size-4" />
          </div>
          <span className="hidden font-heading font-semibold sm:inline">Proposal Agent</span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <ResumeChip resume={resume} status={resumeStatus} inputRef={resumeInputRef} onUpload={onUpload} />
          <ClearButton onConfirm={onClear} disabled={!canClear} />
        </div>
      </div>
    </header>
  )
}
