import { RotateCcw, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AgentErrorProps {
  message: string
  onRetry: () => void
}

export function AgentError({ message, onRetry }: AgentErrorProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4">
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-red-400" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-red-300">Something went wrong</p>
        <p className="mt-1 break-words text-sm text-zinc-300">{message}</p>
        <Button size="sm" variant="outline" onClick={onRetry} className="mt-3 rounded-full">
          <RotateCcw />
          Try again
        </Button>
      </div>
    </div>
  )
}
