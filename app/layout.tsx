import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  title: "Jay | Backend Developer - PortfolioOS",
  description:
    "Personal portfolio of Jay - a backend developer. Interactive terminal-based portfolio with a mission-control dashboard aesthetic.",
}

export const viewport: Viewport = {
  themeColor: "#00e5ff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="font-mono antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
