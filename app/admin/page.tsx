import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, TrendingUp, Calendar, MessageSquare, Shield, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import AdminAnalytics from "@/components/admin/admin-analytics"
import UserManagement from "@/components/admin/user-management"
import CourseManagement from "@/components/admin/course-management"
import ContentModeration from "@/components/admin/content-moderation"

export default async function AdminPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  // Get key metrics
  const [
    { count: totalUsers },
    { count: totalCourses },
    { count: totalEnrollments },
    { count: activeSessions },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
    supabase.from("live_sessions").select("*", { count: "exact", head: true }).eq("status", "live"),
    supabase
      .from("enrollments")
      .select(`
        *,
        profiles (full_name, email),
        courses (title)
      `)
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
              <Badge variant="secondary" className="bg-red-500/20 text-red-300">
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-300">Manage users, courses, and platform analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalUsers || 0}</p>
                  <p className="text-slate-400">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalCourses || 0}</p>
                  <p className="text-slate-400">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalEnrollments || 0}</p>
                  <p className="text-slate-400">Total Enrollments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{activeSessions || 0}</p>
                  <p className="text-slate-400">Live Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-slate-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="moderation" className="data-[state=active]:bg-slate-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="courses">
            <CourseManagement />
          </TabsContent>

          <TabsContent value="moderation">
            <ContentModeration />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure platform-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Platform Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Email Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Notification Settings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        User Permissions
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        API Keys Management
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Audit Logs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest platform activity and enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.map((activity: any) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {activity.profiles?.full_name || activity.profiles?.email} enrolled in {activity.courses?.title}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {new Date(activity.created_at).toLocaleDateString()} at{" "}
                      {new Date(activity.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Enrollment
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
