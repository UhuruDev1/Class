import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/login-form"

export default async function LoginPage() {
  if (isSupabaseConfigured) {
    try {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        redirect("/dashboard")
      }
    } catch (error) {
      // If there's an error with Supabase, continue to show login form
      console.warn("Supabase authentication check failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
