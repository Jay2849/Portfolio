"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Wifi, Battery, Signal, Shield } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-between px-4 py-1.5 bg-card/60 border-t border-border text-xs text-muted-foreground"
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-neon-green" />
          <span className="text-neon-green">SECURE</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3 text-neon-cyan" />
          Connected
        </span>
        <span className="flex items-center gap-1.5">
          <Signal className="w-3 h-3 text-neon-cyan" />
          Latency: 12ms
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>PortfolioOS v2.0</span>
        <span className="flex items-center gap-1.5">
          <Battery className="w-3 h-3 text-neon-green" />
          100%
        </span>
        <span className="font-mono text-neon-cyan tabular-nums">{time}</span>
      </div>
    </motion.footer>
  )
}
