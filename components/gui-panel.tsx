"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  Database,
  GitBranch,
  Activity,
  Cpu,
  HardDrive,
  Globe,
  Code2,
  Briefcase,
  User,
  Mail,
  Layers,
} from "lucide-react"
import { projects, experience, skills, type Project } from "@/lib/data"

interface GuiPanelProps {
  activeSection: string
  selectedProjectId: string | null
}

function StatusIndicator({ status }: { status: string }) {
  const color =
    status === "LIVE"
      ? "bg-neon-green"
      : status === "IN_DEV"
        ? "bg-neon-amber"
        : "bg-muted-foreground"
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} />
      {status}
    </span>
  )
}

function GlassCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-lg p-4 neon-glow ${className}`}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  )
}

function WelcomeView() {
  const metrics = [
    { icon: Server, label: "Systems", value: "12+", color: "text-neon-cyan" },
    {
      icon: Database,
      label: "Databases",
      value: "5",
      color: "text-neon-green",
    },
    {
      icon: GitBranch,
      label: "Commits",
      value: "2.4K+",
      color: "text-neon-amber",
    },
    {
      icon: Activity,
      label: "Uptime",
      value: "99.9%",
      color: "text-neon-cyan",
    },
  ]

  return (
    <div className="flex flex-col gap-4 h-full">
      <GlassCard className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
            <Cpu className="w-5 h-5 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Mission Control
            </h2>
            <p className="text-xs text-muted-foreground">
              System Status: All Operational
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-2 p-2 rounded-md bg-background/50 border border-border/50"
            >
              <m.icon className={`w-4 h-4 ${m.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className={`text-sm font-semibold ${m.color}`}>{m.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.15} className="flex-shrink-0">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { cmd: "projects", icon: Layers },
            { cmd: "experience", icon: Briefcase },
            { cmd: "skills", icon: Code2 },
            { cmd: "about", icon: User },
            { cmd: "contact", icon: Mail },
            { cmd: "neofetch", icon: HardDrive },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-md bg-background/30 border border-border/30 text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors cursor-default"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.cmd}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.3} className="flex-1 min-h-0">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Network Activity
        </h3>
        <div className="flex flex-col gap-2">
          {[
            {
              label: "API Requests",
              value: "1,247/s",
              percent: 78,
            },
            {
              label: "DB Connections",
              value: "42/50",
              percent: 84,
            },
            {
              label: "Cache Hit Rate",
              value: "97.3%",
              percent: 97,
            },
            {
              label: "Memory Usage",
              value: "3.2 GB",
              percent: 64,
            },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground">{item.value}</span>
              </div>
              <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className={`h-full rounded-full ${
                    item.percent > 90
                      ? "bg-neon-green"
                      : item.percent > 80
                        ? "bg-neon-amber"
                        : "bg-neon-cyan"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function ProjectsView() {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4 text-neon-cyan" />
          <h2 className="text-sm font-semibold text-foreground">
            Project Registry
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {projects.length} projects indexed
        </p>
      </GlassCard>
      {projects.map((p, i) => (
        <GlassCard key={p.id} delay={0.1 + i * 0.08}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-neon-cyan">{p.name}</h3>
            <StatusIndicator status={p.status} />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
              >
                {t}
              </span>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function ExperienceView() {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-4 h-4 text-neon-cyan" />
          <h2 className="text-sm font-semibold text-foreground">
            Work Experience
          </h2>
        </div>
      </GlassCard>
      {experience.map((e, i) => (
        <GlassCard key={e.company} delay={0.1 + i * 0.1}>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold text-neon-cyan">{e.role}</h3>
            <span className="text-xs text-neon-amber whitespace-nowrap ml-2">
              {e.period}
            </span>
          </div>
          <p className="text-xs text-neon-green mb-2">{e.company}</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {e.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {e.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20"
              >
                {t}
              </span>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function SkillsView() {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center gap-2 mb-1">
          <Code2 className="w-4 h-4 text-neon-cyan" />
          <h2 className="text-sm font-semibold text-foreground">
            Technical Skills
          </h2>
        </div>
      </GlassCard>
      {skills.map((s, i) => (
        <GlassCard key={s.category} delay={0.1 + i * 0.1}>
          <h3 className="text-xs font-medium text-neon-amber uppercase tracking-wider mb-3">
            {s.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {s.items.map((item, j) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + j * 0.05 }}
                className="px-3 py-1.5 text-xs rounded-md bg-neon-cyan/5 text-foreground border border-neon-cyan/15 hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-colors"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function ProjectDetailView({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-neon-cyan" />
            <h2 className="text-sm font-semibold text-foreground">
              {project.name}
            </h2>
          </div>
          <StatusIndicator status={project.status} />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
            >
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-neon-cyan hover:text-neon-green transition-colors"
          >
            <Globe className="w-3 h-3" />
            View Repository
          </a>
        )}
      </GlassCard>

      <GlassCard delay={0.15}>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          System Diagnostics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Build Status", value: "Passing", color: "text-neon-green" },
            { label: "Test Coverage", value: "94%", color: "text-neon-cyan" },
            { label: "Last Deploy", value: "2h ago", color: "text-neon-amber" },
            { label: "Response Time", value: "< 50ms", color: "text-neon-green" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-2 rounded-md bg-background/30 border border-border/30"
            >
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className={`text-sm font-semibold ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function AboutView() {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
            <User className="w-6 h-6 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Jay</h2>
            <p className="text-xs text-neon-cyan">Backend Developer</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I build resilient, high-throughput systems that scale. Passionate about
          distributed computing, system design, and infrastructure automation.
        </p>
      </GlassCard>
      <GlassCard delay={0.15}>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Focus Areas
        </h3>
        <div className="flex flex-col gap-2">
          {[
            "Distributed Systems",
            "Backend Architecture",
            "Infrastructure Automation",
            "Database Internals",
          ].map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-xs text-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-neon-cyan" />
              {area}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function ContactView() {
  return (
    <div className="flex flex-col gap-3">
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-neon-cyan" />
          <h2 className="text-sm font-semibold text-foreground">
            Contact Information
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: "GitHub", value: "github.com/Jay2849", icon: GitBranch },
            { label: "Email", value: "jay@example.dev", icon: Mail },
            { label: "Website", value: "jay.dev", icon: Globe },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-md bg-background/30 border border-border/30"
            >
              <item.icon className="w-4 h-4 text-neon-cyan" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-xs text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export function GuiPanel({ activeSection, selectedProjectId }: GuiPanelProps) {
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return <ProjectsView />
      case "experience":
        return <ExperienceView />
      case "skills":
        return <SkillsView />
      case "project-detail":
        return selectedProject ? (
          <ProjectDetailView project={selectedProject} />
        ) : (
          <WelcomeView />
        )
      case "about":
        return <AboutView />
      case "contact":
        return <ContactView />
      default:
        return <WelcomeView />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* GUI Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs text-muted-foreground">
            gui-dashboard -- {activeSection || "overview"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-neon-green" />
            ONLINE
          </span>
        </div>
      </div>

      {/* GUI Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + selectedProjectId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
