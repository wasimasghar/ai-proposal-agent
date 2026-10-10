import { useEffect, useState } from "react"

/**
 * While `isRunning` is true, moves to the next step every `intervalMs`
 * and waits on the last step until the request finishes.
 */
export function useTimedSteps(isRunning: boolean, totalSteps: number, intervalMs = 2500) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(() => {
      setStep((current) => Math.min(current + 1, totalSteps - 1))
    }, intervalMs)
    return () => {
      clearInterval(timer)
      setStep(0) // start from the first message next time
    }
  }, [isRunning, totalSteps, intervalMs])

  return step
}
