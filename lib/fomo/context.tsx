"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface FomoNotification {
  id: string
  userName: string
  email: string
  courseName: string
  packageType: string
  price: string
  avatar: string
  timestamp: Date
}

interface FomoContextType {
  notifications: FomoNotification[]
  addNotification: (notification: Omit<FomoNotification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
}

const FomoContext = createContext<FomoContextType | undefined>(undefined)

// Mock data for FOMO notifications
const mockPurchases: Omit<FomoNotification, "id" | "timestamp">[] = [
  {
    userName: "Sarah M.",
    email: "s****@gmail.com",
    courseName: "LLM Fundamentals Mastery",
    packageType: "Professional Plan",
    price: "$99",
    avatar: "/professional-woman-headshot.png",
  },
  {
    userName: "David K.",
    email: "d****@outlook.com",
    courseName: "AI Agents Architecture",
    packageType: "Enterprise Plan",
    price: "$299",
    avatar: "/professional-man-headshot.png",
  },
  {
    userName: "Maria L.",
    email: "m****@yahoo.com",
    courseName: "RAG Systems Deep Dive",
    packageType: "Professional Plan",
    price: "$99",
    avatar: "/latina-professional-headshot.png",
  },
  {
    userName: "James W.",
    email: "j****@gmail.com",
    courseName: "Fine-tuning Masterclass",
    packageType: "Professional Plan",
    price: "$99",
    avatar: "/african-american-man-headshot.png",
  },
  {
    userName: "Lisa C.",
    email: "l****@hotmail.com",
    courseName: "Complete AI Bundle",
    packageType: "Enterprise Plan",
    price: "$299",
    avatar: "/asian-woman-professional-headshot.png",
  },
  {
    userName: "Michael R.",
    email: "m****@gmail.com",
    courseName: "Production AI Systems",
    packageType: "Professional Plan",
    price: "$99",
    avatar: "/middle-aged-man-headshot.png",
  },
  {
    userName: "Anna S.",
    email: "a****@icloud.com",
    courseName: "AI Safety & Ethics",
    packageType: "Professional Plan",
    price: "$99",
    avatar: "/blonde-woman-headshot.png",
  },
  {
    userName: "Carlos M.",
    email: "c****@gmail.com",
    courseName: "Multi-Agent Systems",
    packageType: "Enterprise Plan",
    price: "$299",
    avatar: "/hispanic-man-professional-headshot.png",
  },
]

export function FomoProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<FomoNotification[]>([])

  const addNotification = useCallback((notification: Omit<FomoNotification, "id" | "timestamp">) => {
    const newNotification: FomoNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setNotifications((prev) => [...prev, newNotification])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, 5000)
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  // Generate random notifications
  useEffect(() => {
    const generateRandomNotification = () => {
      const randomPurchase = mockPurchases[Math.floor(Math.random() * mockPurchases.length)]
      addNotification(randomPurchase)
    }

    // Initial notification after 3 seconds
    const initialTimeout = setTimeout(generateRandomNotification, 3000)

    // Then random intervals between 15-45 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 30000 + 15000 // 15-45 seconds
      setTimeout(generateRandomNotification, randomDelay)
    }, 45000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [addNotification])

  return (
    <FomoContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </FomoContext.Provider>
  )
}

export function useFomo() {
  const context = useContext(FomoContext)
  if (context === undefined) {
    throw new Error("useFomo must be used within a FomoProvider")
  }
  return context
}
