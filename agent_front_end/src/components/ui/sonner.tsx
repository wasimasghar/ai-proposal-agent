import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{ classNames: { icon: "text-primary" } }}
      style={
        {
          "--normal-bg": "#161616",
          "--normal-text": "#fafafa",
          "--normal-border": "#2a2a2a",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
