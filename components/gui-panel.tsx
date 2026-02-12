"use client"

import { motion, AnimatePresence } from "motion/react"
import {
  Server, Database, GitBranch, Activity, Cpu, HardDrive,
  Globe, Code2, Briefcase, User, Mail, Layers,
} from "lucide-react"
import { projects, experience, skills, type Project } from "@/lib/data"

const CYAN = "hsl(180 100% 50%)"
const GREEN = "hsl(142 76% 50%)"
const AMBER = "hsl(38 92% 55%)"
const MUTED = "hsl(220 10% 50%)"
const FG = "hsl(180 10% 85%)"
const CARD_BG = "hsl(220 20% 7% / 0.8)"
const BORDER = "hsl(180 20% 15%)"
const BG_DIM = "hsl(220 20% 4% / 0.5)"
const BORDER_DIM = "hsl(180 20% 15% / 0.3)"

interface GuiPanelProps {
  activeSection: string
  selectedProjectId: string | null
}

function StatusDot({ status }: { status: string }) {
  const c = status === "LIVE" ? GREEN : status === "IN_DEV" ? AMBER : MUTED
  return (
    <span className="flex items-center gap-1.5 text-xs" style={{ color: c }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: c }} />
      {status}
    </span>
  )
}

function GlassCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-lg p-4 neon-glow"
    >
      {children}
    </motion.div>
  )
}

function WelcomeView() {
  const metrics = [
    { icon: Server, label: "Systems", value: "12+", color: CYAN },
    { icon: Database, label: "Databases", value: "5", color: GREEN },
    { icon: GitBranch, label: "Commits", value: "2.4K+", color: AMBER },
    { icon: Activity, label: "Uptime", value: "99.9%", color: CYAN },
  ]

  return (
    <div className="flex flex-col gap-4">
      <GlassCard>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(180 100% 50% / 0.1)", border: "1px solid hsl(180 100% 50% / 0.2)" }}>
            <Cpu className="w-5 h-5" style={{ color: CYAN }} />
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: FG }}>Mission Control</h2>
            <p className="text-xs" style={{ color: MUTED }}>System Status: All Operational</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-2 p-2 rounded-md"
              style={{ backgroundColor: BG_DIM, border: `1px solid ${BORDER_DIM}` }}
            >
              <m.icon className="w-4 h-4" style={{ color: m.color }} />
              <div>
                <p className="text-xs" style={{ color: MUTED }}>{m.label}</p>
                <p className="text-sm font-semibold" style={{ color: m.color }}>{m.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.15}>
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>Quick Actions</h3>
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
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-md cursor-default transition-opacity hover:opacity-80"
              style={{ backgroundColor: "hsl(220 20% 4% / 0.3)", border: `1px solid ${BORDER_DIM}`, color: MUTED }}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.cmd}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard delay={0.3}>
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>Network Activity</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "API Requests", value: "1,247/s", percent: 78, color: CYAN },
            { label: "DB Connections", value: "42/50", percent: 84, color: AMBER },
            { label: "Cache Hit Rate", value: "97.3%", percent: 97, color: GREEN },
            { label: "Memory Usage", value: "3.2 GB", percent: 64, color: CYAN },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: MUTED }}>{item.label}</span>
                <span style={{ color: FG }}>{item.value}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: BG_DIM }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
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
          <Layers className="w-4 h-4" style={{ color: CYAN }} />
          <h2 className="text-sm font-semibold" style={{ color: FG }}>Project Registry</h2>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>{projects.length} projects indexed</p>
      </GlassCard>
      {projects.map((p, i) => (
        <GlassCard key={p.id} delay={0.1 + i * 0.08}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold" style={{ color: CYAN }}>{p.name}</h3>
            <StatusDot status={p.status} />
          </div>
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: MUTED }}>{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: "hsl(180 100% 50% / 0.1)", color: CYAN, border: "1px solid hsl(180 100% 50% / 0.2)" }}>
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
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" style={{ color: CYAN }} />
          <h2 className="text-sm font-semibold" style={{ color: FG }}>Work Experience</h2>
        </div>
      </GlassCard>
      {experience.map((e, i) => (
        <GlassCard key={e.company} delay={0.1 + i * 0.1}>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold" style={{ color: CYAN }}>{e.role}</h3>
            <span className="text-xs whitespace-nowrap ml-2" style={{ color: AMBER }}>{e.period}</span>
          </div>
          <p className="text-xs mb-2" style={{ color: GREEN }}>{e.company}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: MUTED }}>{e.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {e.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: "hsl(142 76% 50% / 0.1)", color: GREEN, border: "1px solid hsl(142 76% 50% / 0.2)" }}>
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
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4" style={{ color: CYAN }} />
          <h2 className="text-sm font-semibold" style={{ color: FG }}>Technical Skills</h2>
        </div>
      </GlassCard>
      {skills.map((s, i) => (
        <GlassCard key={s.category} delay={0.1 + i * 0.1}>
          <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: AMBER }}>{s.category}</h3>
          <div className="flex flex-wrap gap-2">
            {s.items.map((item, j) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + j * 0.05 }}
                className="px-3 py-1.5 text-xs rounded-md transition-opacity hover:opacity-80"
                style={{ backgroundColor: "hsl(180 100% 50% / 0.05)", color: FG, border: "1px solid hsl(180 100% 50% / 0.15)" }}
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
            <Globe className="w-4 h-4" style={{ color: CYAN }} />
            <h2 className="text-sm font-semibold" style={{ color: FG }}>{project.name}</h2>
          </div>
          <StatusDot status={project.status} />
        </div>
        <p className="text-xs leading-relaxed mb-4" style={{ color: MUTED }}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: "hsl(180 100% 50% / 0.1)", color: CYAN, border: "1px solid hsl(180 100% 50% / 0.2)" }}>
              {t}
            </span>
          ))}
        </div>
      </GlassCard>
      <GlassCard delay={0.15}>
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>System Diagnostics</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Build Status", value: "Passing", color: GREEN },
            { label: "Test Coverage", value: "94%", color: CYAN },
            { label: "Last Deploy", value: "2h ago", color: AMBER },
            { label: "Response Time", value: "< 50ms", color: GREEN },
          ].map((item) => (
            <div key={item.label} className="p-2 rounded-md" style={{ backgroundColor: BG_DIM, border: `1px solid ${BORDER_DIM}` }}>
              <p className="text-xs" style={{ color: MUTED }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</p>
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
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(180 100% 50% / 0.1)", border: "1px solid hsl(180 100% 50% / 0.2)" }}>
            <User className="w-6 h-6" style={{ color: CYAN }} />
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: FG }}>Jay</h2>
            <p className="text-xs" style={{ color: CYAN }}>Backend Developer</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
          I build resilient, high-throughput systems that scale. Passionate about distributed computing, system design, and infrastructure automation.
        </p>
      </GlassCard>
      <GlassCard delay={0.15}>
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: MUTED }}>Focus Areas</h3>
        <div className="flex flex-col gap-2">
          {["Distributed Systems", "Backend Architecture", "Infrastructure Automation", "Database Internals"].map((area, i) => (
            <motion.div key={area} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-2 text-xs" style={{ color: FG }}>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: CYAN }} />
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
          <Mail className="w-4 h-4" style={{ color: CYAN }} />
          <h2 className="text-sm font-semibold" style={{ color: FG }}>Contact Information</h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: "GitHub", value: "github.com/Jay2849", icon: GitBranch },
            { label: "Email", value: "jay@example.dev", icon: Mail },
            { label: "Website", value: "jay.dev", icon: Globe },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-center gap-3 p-2 rounded-md" style={{ backgroundColor: BG_DIM, border: `1px solid ${BORDER_DIM}` }}>
              <item.icon className="w-4 h-4" style={{ color: CYAN }} />
              <div>
                <p className="text-xs" style={{ color: MUTED }}>{item.label}</p>
                <p className="text-xs" style={{ color: FG }}>{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export function GuiPanel({ activeSection, selectedProjectId }: GuiPanelProps) {
  const selectedProject = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) : null

  const renderContent = () => {
    switch (activeSection) {
      case "projects": return <ProjectsView />
      case "experience": return <ExperienceView />
      case "skills": return <SkillsView />
      case "project-detail": return selectedProject ? <ProjectDetailView project={selectedProject} /> : <WelcomeView />
      case "about": return <AboutView />
      case "contact": return <ContactView />
      default: return <WelcomeView />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: CARD_BG }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: CYAN }} />
          <span className="text-xs" style={{ color: MUTED }}>gui-dashboard -- {activeSection || "overview"}</span>
        </div>
        <span className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
          <Activity className="w-3 h-3" style={{ color: GREEN }} />
          ONLINE
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeSection + selectedProjectId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
