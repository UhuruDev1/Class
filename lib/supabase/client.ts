import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Keep the original export for backward compatibility
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)
