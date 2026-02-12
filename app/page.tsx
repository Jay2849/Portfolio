"use client"

import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { Terminal } from "@/components/terminal"
import { GuiPanel } from "@/components/gui-panel"
import { ProjectWindow } from "@/components/project-window"
import { StatusBar } from "@/components/status-bar"
import { Monitor, TerminalSquare } from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("welcome")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )
  const [showProjectWindow, setShowProjectWindow] = useState(false)

  const handleSelectProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId)
    setShowProjectWindow(true)
  }, [])

  const handleCloseProject = useCallback(() => {
    setShowProjectWindow(false)
  }, [])

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  return (
    <div className="h-dvh flex flex-col bg-background grid-bg overflow-hidden">
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 py-2 bg-card/60 border-b border-border"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
              <Monitor className="w-3 h-3 text-neon-cyan" />
            </div>
            <h1 className="text-sm font-semibold text-foreground tracking-wide">
              PortfolioOS
            </h1>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {"//"}  Jay&apos;s Mission Control
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-neon-green/10 text-neon-green border border-neon-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </motion.header>

      {/* Main Content: Terminal (left) + GUI (right) */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Terminal Panel */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 lg:w-1/2 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-border"
          aria-label="Terminal interface"
        >
          <div className="flex items-center gap-2 px-4 py-1 bg-card/40 border-b border-border/50 text-xs text-muted-foreground">
            <TerminalSquare className="w-3 h-3 text-neon-cyan" />
            <span>TERMINAL</span>
            <span className="ml-auto text-neon-cyan/60">
              zsh
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <Terminal
              onSelectProject={handleSelectProject}
              onSectionChange={handleSectionChange}
            />
          </div>
        </motion.section>

        {/* GUI Panel */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 lg:w-1/2 flex flex-col min-h-0"
          aria-label="GUI dashboard"
        >
          <div className="flex items-center gap-2 px-4 py-1 bg-card/40 border-b border-border/50 text-xs text-muted-foreground">
            <Monitor className="w-3 h-3 text-neon-cyan" />
            <span>GUI DASHBOARD</span>
            <span className="ml-auto text-neon-cyan/60">
              {activeSection}
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <GuiPanel
              activeSection={activeSection}
              selectedProjectId={selectedProjectId}
            />
          </div>
        </motion.section>
      </main>

      {/* Project Window Overlay */}
      <ProjectWindow
        projectId={showProjectWindow ? selectedProjectId : null}
        onClose={handleCloseProject}
      />

      {/* Status Bar */}
      <StatusBar />

      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-30" />
    </div>
  )
}
