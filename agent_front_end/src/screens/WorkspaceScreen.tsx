import { AgentError } from "@/components/agent/AgentError"
import { AgentProgress } from "@/components/agent/AgentProgress"
import { AgentQuestion } from "@/components/agent/AgentQuestion"
import { FadeIn } from "@/components/FadeIn"
import { MatchReport } from "@/components/match/MatchReport"
import { AgentStepsTimeline } from "@/components/proposal/AgentStepsTimeline"
import { ProposalCard } from "@/components/proposal/ProposalCard"
import { EmptyState } from "@/components/workspace/EmptyState"
import { JobInputBar } from "@/components/workspace/JobInputBar"
import { JobMessage } from "@/components/workspace/JobMessage"
import { TopBar } from "@/components/workspace/TopBar"
import { MATCH_STEPS, PROPOSAL_STEPS } from "@/data/agentSteps"
import { exampleJobs } from "@/data/exampleJobs"
import { toolLabel } from "@/data/toolLabels"
import { useAgentWorkspace } from "@/hooks/useAgentWorkspace"
import { useScrollToBottom } from "@/hooks/useScrollToBottom"

export function WorkspaceScreen() {
  const workspace = useAgentWorkspace()
  const { status, matchReport, proposal, error } = workspace
  const bottomRef = useScrollToBottom([status, workspace.matchStep, workspace.proposalStep, workspace.answer])

  const showMatchProgress = status === "matching" || matchReport !== null
  const showProposalProgress = status === "writing" || proposal !== null

  return (
    <div className="relative min-h-dvh">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.10),transparent_70%)]"
      />

      <TopBar
        resume={workspace.resume}
        resumeStatus={workspace.resumeStatus}
        resumeInputRef={workspace.resumeInputRef}
        onUpload={workspace.uploadResumeFile}
        onClear={workspace.clear}
        canClear={workspace.jobText !== null}
      />

      <main className="relative mx-auto w-full max-w-3xl px-4 pb-44 pt-6">
        {workspace.jobText === null ? (
          <EmptyState examples={exampleJobs} onPickExample={workspace.setDraft} />
        ) : (
          <div className="space-y-6">
            <FadeIn>
              <JobMessage text={workspace.jobText} />
            </FadeIn>

            {showMatchProgress && (
              <FadeIn delay={0.1}>
                <AgentProgress
                  steps={MATCH_STEPS}
                  currentStep={status === "matching" ? workspace.matchStep : MATCH_STEPS.length}
                  doneLabel="Match report ready"
                />
              </FadeIn>
            )}

            {matchReport && (
              <FadeIn>
                <MatchReport report={matchReport} />
              </FadeIn>
            )}

            {matchReport && (
              <FadeIn delay={0.3}>
                <AgentQuestion
                  question="Do you want me to continue and write the proposal?"
                  answer={workspace.answer}
                  onYes={workspace.writeProposal}
                  onNo={workspace.stopHere}
                />
              </FadeIn>
            )}

            {workspace.answer === "no" && (
              <FadeIn className="flex justify-center">
                <p className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                  Stopped. Paste another job anytime.
                </p>
              </FadeIn>
            )}

            {showProposalProgress && (
              <FadeIn>
                <AgentProgress
                  steps={PROPOSAL_STEPS}
                  currentStep={status === "writing" ? workspace.proposalStep : PROPOSAL_STEPS.length}
                  doneLabel="Proposal ready"
                />
              </FadeIn>
            )}

            {proposal && (
              <>
                <FadeIn>
                  <ProposalCard proposal={proposal} onRegenerate={workspace.writeProposal} />
                </FadeIn>
                <FadeIn delay={0.15}>
                  <AgentStepsTimeline steps={proposal.steps.map(toolLabel)} />
                </FadeIn>
              </>
            )}

            {status === "error" && error && (
              <FadeIn>
                <AgentError message={error.message} onRetry={workspace.retry} />
              </FadeIn>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <JobInputBar
        value={workspace.draft}
        onChange={workspace.setDraft}
        onSend={workspace.sendJob}
        disabled={workspace.isRunning}
      />
    </div>
  )
}
