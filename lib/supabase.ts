import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      responses: {
        Row: {
          id: string
          name: string
          email: string
          score: number
          drink_type: string
          treatment_history: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          score: number
          drink_type: string
          treatment_history: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          score?: number
          drink_type?: string
          treatment_history?: string
          created_at?: string
        }
      }
    }
  }
}