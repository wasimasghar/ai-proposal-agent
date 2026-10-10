import { useState } from "react"
import { Check, Copy, FileText, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Proposal } from "@/types/proposal"

interface ProposalCardProps {
  proposal: Proposal
  onRegenerate: () => void
}

export function ProposalCard({ proposal, onRegenerate }: ProposalCardProps) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    try {
      await navigator.clipboard.writeText(proposal.text)
      setCopied(true)
      toast.success("Copied")
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error("Could not copy. Select the text and copy it yourself.")
    }
  }

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-[0_0_60px_-20px_rgba(250,204,21,0.3)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Proposal</p>
          <h3 className="font-heading text-lg font-semibold">Ready to send</h3>
        </div>
        <Badge variant="outline" className="rounded-full border-primary/40 px-2.5 py-1 text-primary">
          {proposal.word_count} words
        </Badge>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <p className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-200">{proposal.text}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="size-3.5 shrink-0" />
          <span className="truncate">{proposal.draft_file ? `Saved to ${proposal.draft_file}` : "Not saved to a file"}</span>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRegenerate} className="rounded-full">
            <RefreshCw />
            Regenerate
          </Button>
          <Button size="sm" onClick={copyText} className="rounded-full">
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
