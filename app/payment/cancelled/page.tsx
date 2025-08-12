import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle, ArrowLeft, Zap } from "lucide-react"

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Mastery Academy</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Cancelled</h1>
          <p className="text-xl text-gray-300">Your payment was cancelled. No charges were made to your account.</p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">What would you like to do?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/courses">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse Other Courses
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If you experienced any issues during checkout, our AI-powered support team is here to help.
              </p>
              <Link href="/help">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
