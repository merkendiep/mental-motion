import { createServerSupabaseClient } from "@/src/lib/supabase";

/**
 * Partner Interface
 */
export interface Partner {
  id?: number;
  name: string;
  logo: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Partner Service
 * Clean service for managing partners via Supabase
 */
export class PartnerService {
  /**
   * Get all partners sorted by creation date (descending)
   */
  async getAllPartners(): Promise<Partner[]> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const { data, error } = await supabaseServer
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching partners:", error);
        throw new Error("Failed to fetch partners");
      }

      return data || [];
    } catch (error) {
      console.error("Partner service error:", error);
      throw error;
    }
  }

  /**
   * Get a single partner by ID
   */
  async getPartnerById(id: number): Promise<Partner | null> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const { data, error } = await supabaseServer
        .from("partners")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Not found
          return null;
        }
        console.error("Error fetching partner:", error);
        throw new Error("Failed to fetch partner");
      }

      return data;
    } catch (error) {
      console.error("Partner service error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const partnerService = new PartnerService();
