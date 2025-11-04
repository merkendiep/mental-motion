import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "CRITICAL: Supabase URL or Anon Key is missing. " +
      "The application will not be able to fetch events or save registrations. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables."
  );
}

// Create a single supabase client for interacting with your database (client-side only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a server-side Supabase client that handles cookies properly
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

// Database types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EventSignup {
  id?: number;
  first_name: string;
  last_name: string;
  email: string; // Expected to be already normalized (lowercase, trimmed)
  mobile?: string;
  event_id: string;
  event_title: string;
  created_at?: string;
}
