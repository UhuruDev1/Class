"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Search, UserCheck, UserX, Crown, Mail, Calendar } from "lucide-react"

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, statusFilter])

  const fetchUsers = async () => {
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select(`
          *,
          enrollments (
            id,
            courses (title)
          )
        `)
        .order("created_at", { ascending: false })

      setUsers(profiles || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        switch (statusFilter) {
          case "premium":
            return user.subscription_status === "premium"
          case "free":
            return user.subscription_status === "free" || !user.subscription_status
          case "admin":
            return user.is_admin
          default:
            return true
        }
      })
    }

    setFilteredUsers(filtered)
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", userId)

      if (!error) {
        fetchUsers()
      }
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  const getSubscriptionBadge = (status: string) => {
    switch (status) {
      case "premium":
        return <Badge className="bg-purple-500/20 text-purple-300">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-yellow-500/20 text-yellow-300">Enterprise</Badge>
      default:
        return (
          <Badge variant="secondary" className="bg-slate-600/20 text-slate-300">
            Free
          </Badge>
        )
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
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-lg font-bold text-white">{users.length}</p>
                <p className="text-sm text-slate-400">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold text-white">
                  {users.filter((u) => u.subscription_status === "premium").length}
                </p>
                <p className="text-sm text-slate-400">Premium Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-lg font-bold text-white">{users.filter((u) => u.is_admin).length}</p>
                <p className="text-sm text-slate-400">Admin Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-lg font-bold text-white">
                  {users.filter((u) => new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-sm text-slate-400">New This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">User Management</CardTitle>
          <CardDescription className="text-slate-400">Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="free">Free Users</SelectItem>
                <SelectItem value="premium">Premium Users</SelectItem>
                <SelectItem value="admin">Admin Users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">User</TableHead>
                  <TableHead className="text-slate-300">Subscription</TableHead>
                  <TableHead className="text-slate-300">Enrollments</TableHead>
                  <TableHead className="text-slate-300">Joined</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.full_name || "No name"}</p>
                          <p className="text-sm text-slate-400">{user.email}</p>
                          {user.is_admin && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getSubscriptionBadge(user.subscription_status)}</TableCell>
                    <TableCell>
                      <span className="text-white">{user.enrollments?.length || 0} courses</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-300">{new Date(user.created_at).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleUserStatus(user.id, user.is_admin)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          {user.is_admin ? "Remove Admin" : "Make Admin"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
