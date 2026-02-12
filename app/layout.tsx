import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  title: "Jay | Backend Developer",
  description:
    "Personal portfolio of Jay -- a backend developer. Interactive terminal-based portfolio with a mission-control dashboard aesthetic.",
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
    <html lang="en" className={`${geistMono.variable} ${inter.variable}`}>
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
