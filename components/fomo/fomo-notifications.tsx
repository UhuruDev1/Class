"use client"

import { useFomo } from "@/lib/fomo/context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ShoppingBag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FomoNotifications() {
  const { notifications, removeNotification } = useFomo()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification, index) => (
        <Card
          key={notification.id}
          className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl animate-in slide-in-from-right-full duration-500"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={notification.avatar || "/placeholder.svg"}
                    alt={notification.userName}
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <ShoppingBag className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{notification.userName}</p>
                  <p className="text-gray-300 text-xs truncate">{notification.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-white text-sm font-medium leading-tight">Just purchased "{notification.courseName}"</p>

              <div className="flex items-center justify-between">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30 text-xs">
                  {notification.packageType}
                </Badge>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-bold text-sm">{notification.price}</span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    now
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle pulse animation */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
