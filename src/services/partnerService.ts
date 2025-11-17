import { supabase, createServerSupabaseClient } from "@/src/lib/supabase";

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

  /**
   * Create a new partner
   */
  async createPartner(
    partnerData: Omit<Partner, "id" | "created_at" | "updated_at">
  ): Promise<Partner> {
    try {
      const { data, error } = await supabase
        .from("partners")
        .insert({
          ...partnerData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating partner:", error);
        throw new Error("Failed to create partner");
      }

      return data;
    } catch (error) {
      console.error("Partner creation error:", error);
      throw error;
    }
  }

  /**
   * Update a partner by ID
   */
  async updatePartner(id: number, updates: Partial<Partner>): Promise<Partner> {
    try {
      const { data, error } = await supabase
        .from("partners")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating partner:", error);

        if (error.code === "PGRST116") {
          throw new Error(`Partner with ID "${id}" not found in database`);
        }

        throw new Error("Failed to update partner");
      }

      return data;
    } catch (error) {
      console.error("Partner update error:", error);
      throw error;
    }
  }

  /**
   * Delete a partner by ID
   */
  async deletePartner(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("partners").delete().eq("id", id);

      if (error) {
        console.error("Error deleting partner:", error);

        if (error.code === "PGRST116") {
          throw new Error(`Partner with ID "${id}" not found in database`);
        }

        throw new Error("Failed to delete partner");
      }
    } catch (error) {
      console.error("Partner deletion error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const partnerService = new PartnerService();
