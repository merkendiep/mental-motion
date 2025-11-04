import {
  supabase,
  createServerSupabaseClient,
  EventSignup,
} from "@/src/lib/supabase";

/**
 * Event Signup Service
 * Service for managing event signups
 */
export class SignupService {
  /**
   * Get all event signups
   * Uses server-side client for proper authentication in server components
   */
  async getAllSignups(): Promise<EventSignup[]> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const { data, error } = await supabaseServer
        .from("event_signups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching signups:", error);
        throw new Error("Failed to fetch signups");
      }

      return data || [];
    } catch (error) {
      console.error("Signup service error:", error);
      throw error;
    }
  }

  /**
   * Get signups for a specific event
   * Uses server-side client for proper authentication in server components
   */
  async getSignupsByEventId(eventId: string): Promise<EventSignup[]> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const { data, error } = await supabaseServer
        .from("event_signups")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching event signups:", error);
        throw new Error("Failed to fetch event signups");
      }

      return data || [];
    } catch (error) {
      console.error("Event signup service error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const signupService = new SignupService();
