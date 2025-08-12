"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { createClient } from "@/lib/supabase/client"
import { Users, BookOpen, DollarSign } from "lucide-react"

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  users: {
    label: "New Users",
    color: "hsl(var(--chart-3))",
  },
}

export default function AdminAnalytics() {
  const [enrollmentData, setEnrollmentData] = useState<any[]>([])
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      // Fetch enrollment data by month
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("created_at")
        .gte("created_at", new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString())

      // Process enrollment data
      const enrollmentsByMonth = enrollments?.reduce((acc: any, enrollment) => {
        const month = new Date(enrollment.created_at).toLocaleDateString("en-US", { month: "short" })
        acc[month] = (acc[month] || 0) + 1
        return acc
      }, {})

      const enrollmentChartData = Object.entries(enrollmentsByMonth || {}).map(([month, count]) => ({
        month,
        enrollments: count,
      }))

      // Fetch course categories
      const { data: courses } = await supabase.from("courses").select("category")

      const categoryCounts = courses?.reduce((acc: any, course) => {
        acc[course.category] = (acc[course.category] || 0) + 1
        return acc
      }, {})

      const categoryChartData = Object.entries(categoryCounts || {}).map(([category, count]) => ({
        category,
        count,
      }))

      // Mock revenue data (in real app, this would come from Stripe)
      const mockRevenueData = [
        { month: "Jan", revenue: 2400 },
        { month: "Feb", revenue: 1398 },
        { month: "Mar", revenue: 9800 },
        { month: "Apr", revenue: 3908 },
        { month: "May", revenue: 4800 },
        { month: "Jun", revenue: 3800 },
      ]

      setEnrollmentData(enrollmentChartData)
      setRevenueData(mockRevenueData)
      setCategoryData(categoryChartData)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"]

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-slate-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Revenue and Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$12,234</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,350</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">+180.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Course Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">73%</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">+19%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Enrollment Trends</CardTitle>
            <CardDescription className="text-slate-400">Monthly enrollment statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="enrollments" fill="var(--color-enrollments)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Growth</CardTitle>
            <CardDescription className="text-slate-400">Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Course Categories</CardTitle>
            <CardDescription className="text-slate-400">Distribution of courses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Platform Performance</CardTitle>
            <CardDescription className="text-slate-400">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Average Session Duration</span>
              <span className="text-white font-semibold">24 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Course Completion Rate</span>
              <span className="text-white font-semibold">73%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">User Retention (30 days)</span>
              <span className="text-white font-semibold">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Average Rating</span>
              <span className="text-white font-semibold">4.7/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Support Ticket Resolution</span>
              <span className="text-white font-semibold">2.3 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
