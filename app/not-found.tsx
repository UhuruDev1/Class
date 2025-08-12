"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-purple-400 mb-4">404</div>
          <CardTitle className="text-white">Page Not Found</CardTitle>
          <CardDescription className="text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
