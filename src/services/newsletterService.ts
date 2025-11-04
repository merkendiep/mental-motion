import { supabase, createServerSupabaseClient } from "@/src/lib/supabase";

/**
 * Newsletter Subscription Interface
 */
export interface NewsletterSubscription {
  id?: number;
  email: string;
  organization?: string;
  newsletters: string[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Newsletter Service
 * Clean service for managing newsletter subscriptions via Supabase
 */
export class NewsletterService {
  /**
   * Subscribe user to newsletters
   * Checks for existing subscription and updates if found, creates new if not
   */
  async subscribe(subscription: NewsletterSubscription): Promise<void> {
    try {
      const normalizedEmail = subscription.email.toLowerCase().trim();

      // Check if subscription already exists
      const { data: existing, error: fetchError } = await supabase
        .from("newsletter_subscriptions")
        .select("id, newsletters, organization")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing subscription:", fetchError);
        throw new Error("Failed to check existing subscription");
      }

      if (existing) {
        // Update existing subscription - merge newsletters
        const mergedNewsletters = Array.from(
          new Set([...existing.newsletters, ...subscription.newsletters])
        );

        const { error: updateError } = await supabase
          .from("newsletter_subscriptions")
          .update({
            newsletters: mergedNewsletters,
            organization: subscription.organization || existing.organization,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error updating subscription:", updateError);
          throw new Error("Failed to update subscription");
        }
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from("newsletter_subscriptions")
          .insert({
            email: normalizedEmail,
            organization: subscription.organization || null,
            newsletters: subscription.newsletters,
          });

        if (insertError) {
          console.error("Error creating subscription:", insertError);
          throw new Error("Failed to create subscription");
        }
      }
    } catch (error) {
      console.error("Newsletter service error:", error);
      throw error;
    }
  }

  /**
   * Get a subscription by email
   */
  async getSubscriptionByEmail(
    email: string
  ): Promise<NewsletterSubscription | null> {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Not found
          return null;
        }
        console.error("Error fetching subscription:", error);
        throw new Error("Failed to fetch subscription");
      }

      return data;
    } catch (error) {
      console.error("Newsletter service error:", error);
      throw error;
    }
  }

  /**
   * Unsubscribe user from specific newsletters
   */
  async unsubscribe(
    email: string,
    newslettersToRemove: string[]
  ): Promise<void> {
    try {
      const normalizedEmail = email.toLowerCase().trim();

      const { data: existing, error: fetchError } = await supabase
        .from("newsletter_subscriptions")
        .select("id, newsletters")
        .eq("email", normalizedEmail)
        .single();

      if (fetchError) {
        if (fetchError.code === "PGRST116") {
          // Already not subscribed
          return;
        }
        throw new Error("Failed to fetch subscription");
      }

      // Remove specified newsletters
      const updatedNewsletters = existing.newsletters.filter(
        (n: string) => !newslettersToRemove.includes(n)
      );

      if (updatedNewsletters.length === 0) {
        // Delete subscription if no newsletters left
        const { error: deleteError } = await supabase
          .from("newsletter_subscriptions")
          .delete()
          .eq("id", existing.id);

        if (deleteError) {
          throw new Error("Failed to delete subscription");
        }
      } else {
        // Update with remaining newsletters
        const { error: updateError } = await supabase
          .from("newsletter_subscriptions")
          .update({
            newsletters: updatedNewsletters,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          throw new Error("Failed to update subscription");
        }
      }
    } catch (error) {
      console.error("Newsletter service error:", error);
      throw error;
    }
  }

  /**
   * Get all subscriptions (for admin use)
   * Uses server-side client for proper authentication in server components
   */
  async getAllSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      const supabaseServer = await createServerSupabaseClient();
      const { data, error } = await supabaseServer
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw new Error("Failed to fetch subscriptions");
      }

      return data || [];
    } catch (error) {
      console.error("Newsletter service error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const newsletterService = new NewsletterService();
