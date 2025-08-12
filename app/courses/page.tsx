import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BookOpen, Clock, Users, Star, Search, Filter, Zap } from "lucide-react"

export default async function CoursesPage() {
  const supabase = createClient()

  // Get all published courses
  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      profiles:instructor_id (
        full_name,
        avatar_url
      )
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  // Get course categories
  const categories = [...new Set(courses?.map((course) => course.category).filter(Boolean))]

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
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
              <Link href="/social">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Explore AI Courses</h1>
          <p className="text-xl text-gray-300">Master artificial intelligence with expert-led courses</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search courses..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 cursor-pointer">
            All Courses
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Card
              key={course.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {course.difficulty_level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                <CardDescription className="text-gray-300 line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">{course.profiles?.full_name || "AI Instructor"}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">1.2k</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">8 hours</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {course.price > 0 ? `$${course.price}` : "Free"}
                  </span>
                </div>

                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    {course.price > 0 ? "Enroll Now" : "Start Learning"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses?.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-gray-300">Check back soon for new AI courses!</p>
          </div>
        )}
      </div>
    </div>
  )
}
