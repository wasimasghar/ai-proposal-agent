import { GradientBackground } from "@/components/welcome/GradientBackground"
import { HeroContent } from "@/components/welcome/HeroContent"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <GradientBackground />
      <HeroContent onStart={onStart} />
    </div>
  )
}
