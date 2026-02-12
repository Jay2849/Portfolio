"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Wifi, Battery, Signal, Shield } from "lucide-react"

const CYAN = "hsl(180 100% 50%)"
const GREEN = "hsl(142 76% 50%)"
const MUTED = "hsl(220 10% 50%)"
const BORDER = "hsl(180 20% 15%)"

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
      className="flex items-center justify-between px-4 py-1.5 text-xs"
      style={{ backgroundColor: "hsl(220 20% 7% / 0.6)", borderTop: `1px solid ${BORDER}`, color: MUTED }}
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3 h-3" style={{ color: GREEN }} />
          <span style={{ color: GREEN }}>SECURE</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3" style={{ color: CYAN }} />
          Connected
        </span>
        <span className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" style={{ color: CYAN }} />
          Latency: 12ms
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>PortfolioOS v2.0</span>
        <span className="flex items-center gap-1.5">
          <Battery className="w-3 h-3" style={{ color: GREEN }} />
          100%
        </span>
        <span className="font-mono tabular-nums" style={{ color: CYAN }}>{time}</span>
      </div>
    </motion.footer>
  )
}
