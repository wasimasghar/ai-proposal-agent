import { useEffect, useRef, type DependencyList } from "react"

/** Scrolls the returned element into view whenever one of the values changes. */
export function useScrollToBottom(values: DependencyList) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values)

  return ref
}
