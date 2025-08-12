import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Lock, Zap } from "lucide-react"
import EnrollButton from "@/components/courses/enroll-button"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get course details
  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      profiles:instructor_id (
        full_name,
        avatar_url
      ),
      lessons (
        id,
        title,
        duration_minutes,
        order_index,
        is_free
      )
    `)
    .eq("id", params.id)
    .eq("is_published", true)
    .single()

  if (!course) {
    notFound()
  }

  // Check if user is enrolled
  let enrollment = null
  let lessonProgress = []
  if (user) {
    const { data: enrollmentData } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", params.id)
      .single()

    enrollment = enrollmentData

    if (enrollment) {
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", user.id)
        .in(
          "lesson_id",
          course.lessons.map((l: any) => l.id),
        )

      lessonProgress = progressData || []
    }
  }

  const isEnrolled = !!enrollment
  const completedLessons = lessonProgress.filter((p: any) => p.completed_at).length
  const totalLessons = course.lessons.length
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/courses" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Mastery Academy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {course.difficulty_level}
                </Badge>
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">
                  {course.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  <span>{course.profiles?.full_name || "AI Instructor"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>4.8 (1,234 reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>5,678 students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>
                    {Math.ceil(
                      course.lessons.reduce((acc: number, lesson: any) => acc + (lesson.duration_minutes || 0), 0) / 60,
                    )}{" "}
                    hours
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar (if enrolled) */}
            {isEnrolled && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                    <span className="text-sm text-gray-300">
                      {completedLessons}/{totalLessons} lessons
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="mb-2" />
                  <p className="text-sm text-gray-300">{Math.round(progressPercentage)}% complete</p>
                </CardContent>
              </Card>
            )}

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
                <TabsTrigger value="curriculum" className="text-white data-[state=active]:bg-purple-600">
                  Curriculum
                </TabsTrigger>
                <TabsTrigger value="instructor" className="text-white data-[state=active]:bg-purple-600">
                  Instructor
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-purple-600">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="mt-6">
                <div className="space-y-4">
                  {course.lessons
                    .sort((a: any, b: any) => a.order_index - b.order_index)
                    .map((lesson: any, index: number) => {
                      const isCompleted = lessonProgress.some((p: any) => p.lesson_id === lesson.id && p.completed_at)
                      const canAccess = isEnrolled || lesson.is_free

                      return (
                        <Card key={lesson.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{lesson.title}</h4>
                                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <Clock className="w-4 h-4" />
                                    <span>{lesson.duration_minutes} min</span>
                                    {lesson.is_free && (
                                      <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                                        Free
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                                {canAccess ? (
                                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                    <Play className="w-4 h-4 mr-1" />
                                    {isCompleted ? "Review" : "Watch"}
                                  </Button>
                                ) : (
                                  <Lock className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {course.profiles?.full_name || "AI Expert Instructor"}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Leading AI researcher and practitioner with over 10 years of experience in machine learning,
                          deep learning, and artificial intelligence applications.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>50,000+ students</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>25 courses</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>4.9 rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <Card key={review} className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-white">Student Name</h4>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300">
                              Excellent course! The instructor explains complex AI concepts in a very understandable
                              way. The hands-on projects really helped me apply what I learned.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {course.price > 0 ? `$${course.price}` : "Free"}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {isEnrolled ? "You're enrolled in this course" : "One-time purchase, lifetime access"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user ? (
                  isEnrolled ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Enrolled
                    </Button>
                  ) : (
                    <EnrollButton courseId={course.id} price={course.price} />
                  )
                ) : (
                  <Link href="/auth/login">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Sign in to Enroll
                    </Button>
                  </Link>
                )}

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Lessons</span>
                    <span className="text-white">{totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Duration</span>
                    <span className="text-white">
                      {Math.ceil(
                        course.lessons.reduce((acc: number, lesson: any) => acc + (lesson.duration_minutes || 0), 0) /
                          60,
                      )}{" "}
                      hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Level</span>
                    <span className="text-white capitalize">{course.difficulty_level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Certificate</span>
                    <span className="text-white">Included</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-medium text-white mb-2">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>AI-powered help desk</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Community access</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
