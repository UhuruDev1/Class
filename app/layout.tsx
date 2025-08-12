import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LanguageProvider } from "@/lib/i18n/context"
import { FomoProvider } from "@/lib/fomo/context"
import { FomoNotifications } from "@/components/fomo/fomo-notifications"
import "./globals.css"

export const metadata: Metadata = {
  title: "OfCourse AI - Master AI with Expert-Led Courses",
  description:
    "Learn AI, Machine Learning, and LLMs with comprehensive courses, live classrooms, and AI-powered support. From fundamentals to advanced production systems.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LanguageProvider>
          <FomoProvider>
            {children}
            <FomoNotifications />
          </FomoProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
