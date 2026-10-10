import type { ChangeEvent, RefObject } from "react"
import { FileText, LoaderCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ResumeStatus } from "@/hooks/useAgentWorkspace"
import type { Resume } from "@/types/resume"

interface ResumeChipProps {
  resume: Resume | null
  status: ResumeStatus
  inputRef: RefObject<HTMLInputElement | null>
  onUpload: (file: File) => void
}

export function ResumeChip({ resume, status, inputRef, onUpload }: ResumeChipProps) {
  function openPicker() {
    inputRef.current?.click()
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) onUpload(file)
    event.target.value = "" // lets the same file be picked again
  }

  const fileInput = (
    <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleFile} />
  )

  if (status === "loading" || status === "uploading") {
    return (
      <div className="flex h-9 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 text-sm text-primary">
        <LoaderCircle className="size-4 animate-spin" />
        {status === "loading" ? "Loading resume..." : "Reading PDF..."}
        {fileInput}
      </div>
    )
  }

  if (!resume) {
    return (
      <>
        <Button size="sm" onClick={openPicker} className="h-9 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.3)]">
          <Upload />
          Upload resume
        </Button>
        {fileInput}
      </>
    )
  }

  return (
    <div className="flex h-9 min-w-0 items-center gap-2 rounded-full border border-border bg-card pl-3 pr-1 text-sm">
      <FileText className="size-4 shrink-0 text-primary" />
      <span className="truncate">
        <span className="hidden text-muted-foreground sm:inline">Resume: </span>
        {resume.name}
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={openPicker}
            aria-label="Replace resume"
            className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition hover:bg-primary hover:text-primary-foreground"
          >
            <Upload className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Replace resume (PDF)</TooltipContent>
      </Tooltip>
      {fileInput}
    </div>
  )
}
