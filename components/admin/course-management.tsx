"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Search, BookOpen, Users, DollarSign, Eye, Edit, Trash2 } from "lucide-react"

export default function CourseManagement() {
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, categoryFilter])

  const fetchCourses = async () => {
    try {
      const { data: coursesData } = await supabase
        .from("courses")
        .select(`
          *,
          enrollments (
            id,
            user_id
          )
        `)
        .order("created_at", { ascending: false })

      setCourses(coursesData || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((course) => course.category === categoryFilter)
    }

    setFilteredCourses(filtered)
  }

  const toggleCourseStatus = async (courseId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("courses").update({ is_published: !currentStatus }).eq("id", courseId)

      if (!error) {
        fetchCourses()
      }
    } catch (error) {
      console.error("Error updating course status:", error)
    }
  }

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case "Beginner":
        return <Badge className="bg-green-500/20 text-green-300">Beginner</Badge>
      case "Intermediate":
        return <Badge className="bg-yellow-500/20 text-yellow-300">Intermediate</Badge>
      case "Advanced":
        return <Badge className="bg-red-500/20 text-red-300">Advanced</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const categories = [...new Set(courses.map((course) => course.category))].filter(Boolean)

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700 rounded w-1/4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-lg font-bold text-white">{courses.length}</p>
                <p className="text-sm text-slate-400">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-lg font-bold text-white">{courses.filter((c) => c.is_published).length}</p>
                <p className="text-sm text-slate-400">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold text-white">
                  {courses.reduce((total, course) => total + (course.enrollments?.length || 0), 0)}
                </p>
                <p className="text-sm text-slate-400">Total Enrollments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-lg font-bold text-white">
                  ${courses.reduce((total, course) => total + (course.price || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-slate-400">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Course Management</CardTitle>
              <CardDescription className="text-slate-400">Manage courses and their content</CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Add New Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Courses Table */}
          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Course</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">Difficulty</TableHead>
                  <TableHead className="text-slate-300">Price</TableHead>
                  <TableHead className="text-slate-300">Enrollments</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id} className="border-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{course.title}</p>
                          <p className="text-sm text-slate-400">{course.instructor_name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {course.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{getDifficultyBadge(course.difficulty_level)}</TableCell>
                    <TableCell>
                      <span className="text-white">${course.price || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white">{course.enrollments?.length || 0}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={course.is_published ? "default" : "secondary"}>
                        {course.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleCourseStatus(course.id, course.is_published)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          {course.is_published ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-300 hover:bg-red-700/20 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No courses found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
