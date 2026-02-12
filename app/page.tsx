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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
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
    <div className="h-dvh flex flex-col grid-bg overflow-hidden" style={{ backgroundColor: "hsl(220 20% 4%)", color: "hsl(180 10% 85%)" }}>
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: "hsl(220 20% 7% / 0.6)", borderBottom: "1px solid hsl(180 20% 15%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ backgroundColor: "hsl(180 100% 50% / 0.2)", border: "1px solid hsl(180 100% 50% / 0.3)" }}
            >
              <Monitor className="w-3 h-3" style={{ color: "hsl(180 100% 50%)" }} />
            </div>
            <h1 className="text-sm font-semibold tracking-wide">PortfolioOS</h1>
          </div>
          <span className="text-xs hidden sm:inline" style={{ color: "hsl(220 10% 50%)" }}>
            {"// Jay's Mission Control"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{
              backgroundColor: "hsl(142 76% 50% / 0.1)",
              color: "hsl(142 76% 50%)",
              border: "1px solid hsl(142 76% 50% / 0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "hsl(142 76% 50%)" }}
            />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Terminal Panel */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 lg:w-1/2 flex flex-col min-h-0"
          style={{ borderRight: "1px solid hsl(180 20% 15%)" }}
          aria-label="Terminal interface"
        >
          <div
            className="flex items-center gap-2 px-4 py-1 text-xs"
            style={{ backgroundColor: "hsl(220 20% 7% / 0.4)", borderBottom: "1px solid hsl(180 20% 15% / 0.5)", color: "hsl(220 10% 50%)" }}
          >
            <TerminalSquare className="w-3 h-3" style={{ color: "hsl(180 100% 50%)" }} />
            <span>TERMINAL</span>
            <span className="ml-auto" style={{ color: "hsl(180 100% 50% / 0.6)" }}>zsh</span>
          </div>
          <div className="flex-1 min-h-0">
            <Terminal onSelectProject={handleSelectProject} onSectionChange={handleSectionChange} />
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
          <div
            className="flex items-center gap-2 px-4 py-1 text-xs"
            style={{ backgroundColor: "hsl(220 20% 7% / 0.4)", borderBottom: "1px solid hsl(180 20% 15% / 0.5)", color: "hsl(220 10% 50%)" }}
          >
            <Monitor className="w-3 h-3" style={{ color: "hsl(180 100% 50%)" }} />
            <span>GUI DASHBOARD</span>
            <span className="ml-auto" style={{ color: "hsl(180 100% 50% / 0.6)" }}>{activeSection}</span>
          </div>
          <div className="flex-1 min-h-0">
            <GuiPanel activeSection={activeSection} selectedProjectId={selectedProjectId} />
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
