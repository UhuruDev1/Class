import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Calendar, Clock, Users, Video, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function LiveSessionsPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user's enrolled courses for filtering
  const { data: enrollments } = await supabase.from("enrollments").select("course_id").eq("user_id", user.id)

  const enrolledCourseIds = enrollments?.map((e) => e.course_id) || []

  // Get live sessions
  const { data: sessions } = await supabase
    .from("live_sessions")
    .select(`
      *,
      courses (
        title,
        instructor_name,
        thumbnail_url
      )
    `)
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true })

  const upcomingSessions =
    sessions?.filter((session) => enrolledCourseIds.includes(session.course_id) || session.is_public) || []

  const publicSessions = sessions?.filter((session) => session.is_public) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Live Classrooms</h1>
          <p className="text-slate-300 text-lg">
            Join interactive learning sessions with expert instructors and fellow students
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{upcomingSessions.length}</p>
                  <p className="text-slate-400">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-slate-400">Community Support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Video className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">HD</p>
                  <p className="text-slate-400">Video Quality</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Upcoming Sessions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{session.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {session.courses?.title} • {session.courses?.instructor_name}
                        </CardDescription>
                      </div>
                      <Badge variant={session.status === "live" ? "destructive" : "secondary"}>
                        {session.status === "live" ? "LIVE" : "Scheduled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-300">{session.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(session.scheduled_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(session.scheduled_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {session.max_participants} max
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          disabled={session.status !== "live" && new Date(session.scheduled_at) > new Date()}
                        >
                          <Link href={`/live-sessions/${session.id}`}>
                            {session.status === "live" ? (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Join Live
                              </>
                            ) : (
                              <>
                                <Video className="h-4 w-4 mr-2" />
                                Enter Classroom
                              </>
                            )}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Public Sessions */}
        {publicSessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Public Sessions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {publicSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{session.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {session.courses?.instructor_name} • Free Session
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Public
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-300">{session.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(session.scheduled_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(session.scheduled_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Link href={`/live-sessions/${session.id}`}>
                          <Video className="h-4 w-4 mr-2" />
                          Join Free Session
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {upcomingSessions.length === 0 && publicSessions.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Video className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Sessions</h3>
              <p className="text-slate-400 mb-6">
                Check back later for new live classroom sessions, or explore our courses to get access to exclusive
                sessions.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
