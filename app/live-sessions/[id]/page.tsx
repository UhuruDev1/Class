import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import LiveClassroom from "@/components/live/live-classroom"

interface LiveSessionPageProps {
  params: {
    id: string
  }
}

export default async function LiveSessionPage({ params }: LiveSessionPageProps) {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get session details
  const { data: session } = await supabase
    .from("live_sessions")
    .select(`
      *,
      courses (
        title,
        instructor_name,
        thumbnail_url
      )
    `)
    .eq("id", params.id)
    .single()

  if (!session) {
    notFound()
  }

  // Check if user has access
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", session.course_id)
    .single()

  if (!enrollment && !session.is_public) {
    redirect("/courses")
  }

  return <LiveClassroom session={session} user={user} />
}
