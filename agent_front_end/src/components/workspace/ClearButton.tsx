import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ClearButtonProps {
  onConfirm: () => void
  disabled?: boolean
}

export function ClearButton({ onConfirm, disabled }: ClearButtonProps) {
  const [open, setOpen] = useState(false)

  function confirm() {
    onConfirm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled} aria-label="Clear workspace" className="h-9 rounded-full">
          <Trash2 />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Clear the workspace?</DialogTitle>
          <DialogDescription>
            This removes the job description, the match report and the proposal. Your uploaded resume stays.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={confirm} className="rounded-full">
            Yes, clear everything
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
