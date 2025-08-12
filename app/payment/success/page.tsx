import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, BookOpen, Zap } from "lucide-react"
import { stripe } from "@/lib/stripe"

interface PaymentSuccessPageProps {
  searchParams: {
    session_id?: string
  }
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let course = null
  let session = null

  if (searchParams.session_id) {
    try {
      session = await stripe.checkout.sessions.retrieve(searchParams.session_id)

      if (session.metadata?.course_id) {
        const { data: courseData } = await supabase
          .from("courses")
          .select("*")
          .eq("id", session.metadata.course_id)
          .single()

        course = courseData
      }
    } catch (error) {
      console.error("Error retrieving session:", error)
    }
  }

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
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-300">Thank you for your purchase. You now have access to your course.</p>
        </div>

        {course && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BookOpen className="w-6 h-6" />
                <span>Course Enrolled</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  <div className="flex space-x-4">
                    <Link href={`/courses/${course.id}`}>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Start Learning
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Start Learning</h3>
                <p className="text-gray-300 mb-4">
                  Access your course materials immediately and begin your AI learning journey.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    View My Courses
                  </Button>
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Join the Community</h3>
                <p className="text-gray-300 mb-4">
                  Connect with other students and get help from our AI-powered assistant.
                </p>
                <Link href="/social">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Need help? Contact our{" "}
            <Link href="/help" className="text-purple-400 hover:text-purple-300">
              AI-powered support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
