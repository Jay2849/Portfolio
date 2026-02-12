"use client"

import { motion, AnimatePresence } from "motion/react"
import { X, ExternalLink, GitBranch, Clock, Shield } from "lucide-react"
import { projects, type Project } from "@/lib/data"

const CYAN = "hsl(180 100% 50%)"
const GREEN = "hsl(142 76% 50%)"
const AMBER = "hsl(38 92% 55%)"
const MUTED = "hsl(220 10% 50%)"
const FG = "hsl(180 10% 85%)"

interface ProjectWindowProps {
  projectId: string | null
  onClose: () => void
}

function ProjectContent({ project }: { project: Project }) {
  const statusColor = project.status === "LIVE" ? GREEN : project.status === "IN_DEV" ? AMBER : MUTED

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-xl font-semibold mb-1" style={{ color: FG }}>
            {project.name}
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-1.5 text-xs" style={{ color: statusColor }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
            {project.status}
          </motion.div>
        </div>
        {project.link && (
          <motion.a initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-opacity hover:opacity-80" style={{ backgroundColor: "hsl(180 100% 50% / 0.1)", color: CYAN, border: "1px solid hsl(180 100% 50% / 0.2)" }}>
            <ExternalLink className="w-3 h-3" />
            View Source
          </motion.a>
        )}
      </div>

      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>
        {project.description}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>Technology Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 + i * 0.05 }} className="px-3 py-1.5 text-xs rounded-md" style={{ backgroundColor: "hsl(180 100% 50% / 0.05)", color: CYAN, border: "1px solid hsl(180 100% 50% / 0.2)" }}>
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Shield, label: "Build", value: "Passing", color: GREEN, bg: "hsl(142 76% 50% / 0.1)", border: "hsl(142 76% 50% / 0.2)" },
            { icon: GitBranch, label: "Branches", value: "12", color: CYAN, bg: "hsl(180 100% 50% / 0.1)", border: "hsl(180 100% 50% / 0.2)" },
            { icon: Clock, label: "Avg Response", value: "< 45ms", color: AMBER, bg: "hsl(38 92% 55% / 0.1)", border: "hsl(38 92% 55% / 0.2)" },
            { icon: ExternalLink, label: "Coverage", value: "92%", color: GREEN, bg: "hsl(142 76% 50% / 0.1)", border: "hsl(142 76% 50% / 0.2)" },
          ].map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }} className="p-3 rounded-lg" style={{ backgroundColor: metric.bg, border: `1px solid ${metric.border}` }}>
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-3.5 h-3.5" style={{ color: metric.color }} />
                <span className="text-xs" style={{ color: MUTED }}>{metric.label}</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: metric.color }}>{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectWindow({ projectId, onClose }: ProjectWindowProps) {
  const project = projectId ? projects.find((p) => p.id === projectId) : null

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40" style={{ backgroundColor: "hsl(220 20% 4% / 0.6)", backdropFilter: "blur(4px)" }} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateX: 15, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: -10, rotateY: 5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.6 }}
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              className="w-full max-w-lg glass-strong rounded-xl neon-glow pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${MUTED}`, backgroundColor: "hsl(220 20% 7% / 0.5)" }}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={onClose} className="w-3 h-3 rounded-full transition-opacity hover:opacity-80" style={{ backgroundColor: "hsl(0 70% 50% / 0.7)" }} aria-label="Close project window" />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(38 92% 55% / 0.7)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(142 76% 50% / 0.7)" }} />
                  </div>
                  <span className="text-xs ml-2" style={{ color: MUTED }}>{project.name.toLowerCase().replace(/\s+/g, "-")}.sys</span>
                </div>
                <button onClick={onClose} className="transition-opacity hover:opacity-80" style={{ color: MUTED }} aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                <ProjectContent project={project} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
