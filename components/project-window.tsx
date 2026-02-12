"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, GitBranch, Clock, Shield } from "lucide-react"
import { projects, type Project } from "@/lib/data"

interface ProjectWindowProps {
  projectId: string | null
  onClose: () => void
}

function ProjectContent({ project }: { project: Project }) {
  const statusColor =
    project.status === "LIVE"
      ? "text-neon-green"
      : project.status === "IN_DEV"
        ? "text-neon-amber"
        : "text-muted-foreground"

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold text-foreground mb-1"
          >
            {project.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`flex items-center gap-1.5 text-xs ${statusColor}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusColor === "text-neon-green" ? "bg-neon-green" : statusColor === "text-neon-amber" ? "bg-neon-amber" : "bg-muted-foreground"} animate-pulse`} />
            {project.status}
          </motion.div>
        </div>
        {project.link && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View Source
          </motion.a>
        )}
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-muted-foreground leading-relaxed mb-6"
      >
        {project.description}
      </motion.p>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Technology Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              className="px-3 py-1.5 text-xs rounded-md bg-neon-cyan/5 text-neon-cyan border border-neon-cyan/20"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: Shield,
              label: "Build",
              value: "Passing",
              color: "text-neon-green",
              bgColor: "bg-neon-green/10",
              borderColor: "border-neon-green/20",
            },
            {
              icon: GitBranch,
              label: "Branches",
              value: "12",
              color: "text-neon-cyan",
              bgColor: "bg-neon-cyan/10",
              borderColor: "border-neon-cyan/20",
            },
            {
              icon: Clock,
              label: "Avg Response",
              value: "< 45ms",
              color: "text-neon-amber",
              bgColor: "bg-neon-amber/10",
              borderColor: "border-neon-amber/20",
            },
            {
              icon: ExternalLink,
              label: "Coverage",
              value: "92%",
              color: "text-neon-green",
              bgColor: "bg-neon-green/10",
              borderColor: "border-neon-green/20",
            },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className={`p-3 rounded-lg ${metric.bgColor} border ${metric.borderColor}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                <span className="text-xs text-muted-foreground">
                  {metric.label}
                </span>
              </div>
              <p className={`text-sm font-semibold ${metric.color}`}>
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectWindow({ projectId, onClose }: ProjectWindowProps) {
  const project = projectId
    ? projects.find((p) => p.id === projectId)
    : null

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          />

          {/* 3D Window */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-8 pointer-events-none">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                rotateX: 15,
                rotateY: -10,
                z: -200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateX: -10,
                rotateY: 5,
                z: -100,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.6,
              }}
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              className="w-full max-w-lg glass-strong rounded-xl neon-glow pointer-events-auto overflow-hidden"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors"
                      aria-label="Close project window"
                    />
                    <div className="w-3 h-3 rounded-full bg-neon-amber/70" />
                    <div className="w-3 h-3 rounded-full bg-neon-green/70" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {project.name.toLowerCase().replace(/\s+/g, "-")}.sys
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Window Content */}
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
