"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { MessageSquare, Flag, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react"

export default function ContentModeration() {
  const [posts, setPosts] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchModerationData()
  }, [])

  const fetchModerationData = async () => {
    try {
      // Fetch recent posts
      const { data: postsData } = await supabase
        .from("posts")
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      // Fetch recent comments
      const { data: commentsData } = await supabase
        .from("comments")
        .select(`
          *,
          profiles (
            full_name,
            email
          ),
          posts (
            title
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      setPosts(postsData || [])
      setComments(commentsData || [])

      // Mock reports data (in real app, this would come from a reports table)
      setReports([
        {
          id: 1,
          type: "post",
          content_id: "123",
          reason: "Inappropriate content",
          reporter: "user@example.com",
          status: "pending",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          type: "comment",
          content_id: "456",
          reason: "Spam",
          reporter: "another@example.com",
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
    } catch (error) {
      console.error("Error fetching moderation data:", error)
    } finally {
      setLoading(false)
    }
  }

  const moderateContent = async (contentType: string, contentId: string, action: "approve" | "reject") => {
    try {
      // In a real app, you would update the content status
      console.log(`${action} ${contentType} ${contentId}`)
      // Refresh data after moderation
      fetchModerationData()
    } catch (error) {
      console.error("Error moderating content:", error)
    }
  }

  const deleteContent = async (contentType: string, contentId: string) => {
    try {
      const { error } = await supabase
        .from(contentType === "post" ? "posts" : "comments")
        .delete()
        .eq("id", contentId)

      if (!error) {
        fetchModerationData()
      }
    } catch (error) {
      console.error("Error deleting content:", error)
    }
  }

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
      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-lg font-bold text-white">{posts.length}</p>
                <p className="text-sm text-slate-400">Recent Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-lg font-bold text-white">{comments.length}</p>
                <p className="text-sm text-slate-400">Recent Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-lg font-bold text-white">{reports.length}</p>
                <p className="text-sm text-slate-400">Pending Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold text-white">98%</p>
                <p className="text-sm text-slate-400">Auto-Moderated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Moderation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Content Moderation</CardTitle>
          <CardDescription className="text-slate-400">Review and moderate user-generated content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="posts" className="data-[state=active]:bg-slate-600">
                Posts
              </TabsTrigger>
              <TabsTrigger value="comments" className="data-[state=active]:bg-slate-600">
                Comments
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-slate-600">
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Author</TableHead>
                      <TableHead className="text-slate-300">Content</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id} className="border-slate-700">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{post.profiles?.full_name || "Anonymous"}</p>
                            <p className="text-sm text-slate-400">{post.profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-white font-medium truncate">{post.title || "Untitled"}</p>
                            <p className="text-sm text-slate-400 truncate">{post.content}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">{new Date(post.created_at).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteContent("post", post.id)}
                              className="border-red-600 text-red-300 hover:bg-red-700/20"
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
            </TabsContent>

            <TabsContent value="comments">
              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Author</TableHead>
                      <TableHead className="text-slate-300">Comment</TableHead>
                      <TableHead className="text-slate-300">Post</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments.map((comment) => (
                      <TableRow key={comment.id} className="border-slate-700">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{comment.profiles?.full_name || "Anonymous"}</p>
                            <p className="text-sm text-slate-400">{comment.profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-white max-w-md truncate">{comment.content}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-slate-300 max-w-32 truncate">{comment.posts?.title || "Unknown Post"}</p>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteContent("comment", comment.id)}
                              className="border-red-600 text-red-300 hover:bg-red-700/20"
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
            </TabsContent>

            <TabsContent value="reports">
              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Reporter</TableHead>
                      <TableHead className="text-slate-300">Content Type</TableHead>
                      <TableHead className="text-slate-300">Reason</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id} className="border-slate-700">
                        <TableCell>
                          <span className="text-white">{report.reporter}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-white">{report.reason}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">{new Date(report.created_at).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moderateContent(report.type, report.content_id, "approve")}
                              className="border-green-600 text-green-300 hover:bg-green-700/20"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moderateContent(report.type, report.content_id, "reject")}
                              className="border-red-600 text-red-300 hover:bg-red-700/20"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
