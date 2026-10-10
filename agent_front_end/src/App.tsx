import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { WorkspaceScreen } from "@/screens/WorkspaceScreen"

type Screen = "welcome" | "workspace"

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome")

  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence mode="wait">
        {screen === "welcome" ? (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <WelcomeScreen onStart={() => setScreen("workspace")} />
          </motion.div>
        ) : (
          // Only opacity here: a transform on this wrapper would break the fixed input bar.
          <motion.div key="workspace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <WorkspaceScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-center" />
    </TooltipProvider>
  )
}
