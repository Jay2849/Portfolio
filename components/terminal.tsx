"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects, experience, skills } from "@/lib/data"

interface TerminalLine {
  id: number
  type: "input" | "output" | "error" | "system" | "ascii"
  content: string
  color?: string
}

interface TerminalProps {
  onSelectProject: (projectId: string) => void
  onSectionChange: (section: string) => void
}

const ASCII_BANNER = `  ____   ___  ____ _____ _____ ___  _     ___ ___
 |  _ \\ / _ \\|  _ \\_   _|  ___/ _ \\| |   |_ _/ _ \\
 | |_) | | | | |_) || | | |_ | | | | |    | | | | |
 |  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
 |_|    \\___/|_| \\_\\|_| |_|   \\___/|_____|___\\___/`

const HELP_TEXT = `
Available commands:

  help          Show this help message
  about         About me
  projects      List all projects
  project <id>  View project details (e.g. project 1)
  experience    Work experience
  skills        Technical skills
  contact       Contact information
  clear         Clear the terminal
  neofetch      System information
`

const ABOUT_TEXT = `
> Jay -- Backend Developer

I build resilient, high-throughput systems that scale.
Passionate about distributed computing, system design,
and infrastructure automation.

When I'm not writing code, I'm reading about database
internals or contributing to open-source projects.

Location   : Earth
Focus      : Distributed Systems & Backend Architecture
Status     : Open to collaboration
`

const CONTACT_TEXT = `
> Contact Information

  GitHub     : github.com/Jay2849
  Email      : jay@example.dev
  LinkedIn   : linkedin.com/in/jay
  Website    : jay.dev
`

const NEOFETCH = `
  jay@portfolio
  ---------------
  OS       : PortfolioOS v2.0
  Shell    : zsh 5.9
  Terminal : web-term
  CPU      : Ideas @ 3.4GHz
  Memory   : Unlimited Ambition
  Uptime   : Since 2019
  Packages : 127 (npm)
  Theme    : Neon Cyberpunk
  Icons    : Lucide
  Font     : Geist Mono
`

export function Terminal({ onSelectProject, onSectionChange }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lineCounter, setLineCounter] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addLines = useCallback(
    (
      newLines: { type: TerminalLine["type"]; content: string; color?: string }[]
    ) => {
      setLineCounter((prev) => {
        let counter = prev
        const mapped = newLines.map((l) => ({
          ...l,
          id: counter++,
        }))
        setLines((old) => [...old, ...mapped])
        return counter
      })
    },
    []
  )

  useEffect(() => {
    addLines([
      { type: "ascii", content: ASCII_BANNER, color: "text-neon-cyan" },
      { type: "system", content: "" },
      {
        type: "system",
        content: "Welcome to PortfolioOS v2.0",
        color: "text-neon-cyan",
      },
      {
        type: "system",
        content: 'Type "help" to see available commands.',
        color: "text-muted-foreground",
      },
      { type: "system", content: "" },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const parts = trimmed.split(/\s+/)
      const command = parts[0]
      const arg = parts[1]

      addLines([{ type: "input", content: `~$ ${cmd}` }])

      switch (command) {
        case "": {
          break
        }

        case "help": {
          addLines(
            HELP_TEXT.split("\n").map((l) => ({
              type: "output" as const,
              content: l,
            }))
          )
          break
        }

        case "about": {
          onSectionChange("about")
          addLines(
            ABOUT_TEXT.split("\n").map((l) => ({
              type: "output" as const,
              content: l,
              color: l.startsWith(">") ? "text-neon-cyan" : undefined,
            }))
          )
          break
        }

        case "projects": {
          onSectionChange("projects")
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: "> Project Registry",
              color: "text-neon-cyan",
            },
            { type: "output", content: "" },
          ])
          projects.forEach((p, i) => {
            const statusColor =
              p.status === "LIVE"
                ? "text-neon-green"
                : p.status === "IN_DEV"
                  ? "text-neon-amber"
                  : "text-muted-foreground"
            addLines([
              {
                type: "output",
                content: `  [${i + 1}] ${p.name}`,
                color: "text-neon-cyan",
              },
              {
                type: "output",
                content: `      Status: ${p.status}`,
                color: statusColor,
              },
              {
                type: "output",
                content: `      Stack:  ${p.tech.join(", ")}`,
              },
              { type: "output", content: "" },
            ])
          })
          addLines([
            {
              type: "system",
              content: '  Use "project <number>" for details.',
              color: "text-muted-foreground",
            },
            { type: "output", content: "" },
          ])
          break
        }

        case "project": {
          if (!arg) {
            addLines([
              {
                type: "error",
                content: 'Usage: project <number> (e.g. "project 1")',
              },
            ])
            break
          }
          const idx = parseInt(arg) - 1
          if (isNaN(idx) || idx < 0 || idx >= projects.length) {
            addLines([
              {
                type: "error",
                content: `Project ${arg} not found. Use "projects" to see the list.`,
              },
            ])
            break
          }
          const p = projects[idx]
          onSelectProject(p.id)
          onSectionChange("project-detail")
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: `> Loading ${p.name}...`,
              color: "text-neon-green",
            },
            {
              type: "system",
              content: "  [Window opened in GUI panel]",
              color: "text-muted-foreground",
            },
            { type: "output", content: "" },
          ])
          break
        }

        case "experience": {
          onSectionChange("experience")
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: "> Work Experience",
              color: "text-neon-cyan",
            },
            { type: "output", content: "" },
          ])
          experience.forEach((e) => {
            addLines([
              {
                type: "output",
                content: `  ${e.role} @ ${e.company}`,
                color: "text-neon-cyan",
              },
              {
                type: "output",
                content: `  ${e.period}`,
                color: "text-neon-amber",
              },
              { type: "output", content: `  ${e.description}` },
              {
                type: "output",
                content: `  Stack: ${e.tech.join(", ")}`,
                color: "text-muted-foreground",
              },
              { type: "output", content: "" },
            ])
          })
          break
        }

        case "skills": {
          onSectionChange("skills")
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: "> Technical Skills",
              color: "text-neon-cyan",
            },
            { type: "output", content: "" },
          ])
          skills.forEach((s) => {
            addLines([
              {
                type: "output",
                content: `  [${s.category}]`,
                color: "text-neon-amber",
              },
              {
                type: "output",
                content: `   ${s.items.join("  |  ")}`,
              },
              { type: "output", content: "" },
            ])
          })
          break
        }

        case "contact": {
          onSectionChange("contact")
          addLines(
            CONTACT_TEXT.split("\n").map((l) => ({
              type: "output" as const,
              content: l,
              color: l.startsWith(">") ? "text-neon-cyan" : undefined,
            }))
          )
          break
        }

        case "neofetch": {
          addLines(
            NEOFETCH.split("\n").map((l) => ({
              type: "output" as const,
              content: l,
              color: l.includes(":") ? undefined : "text-neon-cyan",
            }))
          )
          break
        }

        case "clear": {
          setLines([])
          break
        }

        default: {
          addLines([
            {
              type: "error",
              content: `Command not found: ${command}. Type "help" for available commands.`,
            },
          ])
        }
      }
    },
    [addLines, onSelectProject, onSectionChange]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setCommandHistory((prev) => [input, ...prev])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIdx = historyIndex + 1
        setHistoryIndex(newIdx)
        setInput(commandHistory[newIdx])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1
        setHistoryIndex(newIdx)
        setInput(commandHistory[newIdx])
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const commands = [
        "help",
        "about",
        "projects",
        "project",
        "experience",
        "skills",
        "contact",
        "clear",
        "neofetch",
      ]
      const match = commands.find((c) => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-neon-amber/70" />
          <div className="w-3 h-3 rounded-full bg-neon-green/70" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          terminal -- jay@portfolio:~
        </span>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
      >
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className={`whitespace-pre-wrap ${
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "ascii"
                    ? line.color || "text-neon-cyan"
                    : line.type === "system"
                      ? line.color || "text-muted-foreground"
                      : line.color || "text-foreground"
              }`}
            >
              {line.type === "input" ? (
                <span>
                  <span className="text-neon-green">{">"}</span>{" "}
                  <span className="text-neon-cyan">{"~"}</span>
                  <span className="text-muted-foreground">{"$ "}</span>
                  <span className="text-foreground">
                    {line.content.replace("~$ ", "")}
                  </span>
                </span>
              ) : (
                line.content
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-neon-green">{">"}</span>{" "}
          <span className="text-neon-cyan">{"~"}</span>
          <span className="text-muted-foreground">{"$ "}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground text-sm font-mono"
            style={{ caretColor: "hsl(180 100% 50%)" }}
            autoFocus
            spellCheck={false}
            aria-label="Terminal command input"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-2 h-4 bg-neon-cyan/80 inline-block"
          />
        </div>
      </div>
    </div>
  )
}
