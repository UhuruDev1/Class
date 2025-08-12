import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Clock, Users, TrendingUp, Play, Award, Zap } from "lucide-react"
import { signOut } from "@/lib/actions/auth"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user enrollments with course details
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url,
        difficulty_level,
        category
      )
    `)
    .eq("user_id", user.id)

  // Get recent courses
  const { data: recentCourses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Mastery Academy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/social">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Community
                </Button>
              </Link>
              <form action={signOut}>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {profile?.full_name || user.email}!</h1>
          <p className="text-gray-300">Continue your AI learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-bold text-white">{enrollments?.length || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Hours Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-pink-400" />
                <span className="text-2xl font-bold text-white">24</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">2</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white">7 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Continue Learning</h2>
            <div className="space-y-4">
              {enrollments && enrollments.length > 0 ? (
                enrollments.map((enrollment: any) => (
                  <Card key={enrollment.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{enrollment.courses.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{enrollment.courses.description}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {enrollment.courses.difficulty_level}
                            </Badge>
                            <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">
                              {enrollment.courses.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Progress value={enrollment.progress_percentage} className="w-32" />
                              <span className="text-sm text-gray-300">{enrollment.progress_percentage}%</span>
                            </div>
                            <Link href={`/courses/${enrollment.courses.id}`}>
                              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
                    <p className="text-gray-300 mb-4">Start your AI learning journey by enrolling in a course</p>
                    <Link href="/courses">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Browse Courses
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Discover New Courses</h2>
            <div className="space-y-4">
              {recentCourses?.map((course) => (
                <Card key={course.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {course.difficulty_level}
                      </Badge>
                      <Link href={`/courses/${course.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/help">
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Zap className="w-4 h-4 mr-2" />
                    AI Help Desk
                  </Button>
                </Link>
                <Link href="/live-sessions">
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Users className="w-4 h-4 mr-2" />
                    Live Sessions
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Award className="w-4 h-4 mr-2" />
                    My Certificates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
