import PocketBase from "pocketbase";

// Initialize PocketBase client
const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"
);

// Optionally disable auto-refresh if you prefer manual control
// pb.autoCancellation(false);

export default pb;

// Example types for your collections (you can customize these based on your needs)
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created: string;
  updated: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  newsletters: string[]; // Array of newsletter types the user subscribed to
  created: string;
  updated: string;
}

// Helper functions for common operations
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string, newsletters: string[]) {
    try {
      const data = {
        email: email.toLowerCase().trim(),
        newsletters,
      };
      return await pb.collection("newsletter_subscriptions").create(data);
    } catch (error: any) {
      // Re-throw with more context
      throw error;
    }
  },

  // Check if email already exists
  async checkExistingEmail(email: string) {
    try {
      const records = await pb
        .collection("newsletter_subscriptions")
        .getList(1, 1, {
          filter: `email = "${email.toLowerCase().trim()}"`,
        });
      return records.items.length > 0 ? records.items[0] : null;
    } catch (error) {
      return null;
    }
  },

  // Update existing subscription
  async updateSubscription(email: string, newsletters: string[]) {
    try {
      const existing = await this.checkExistingEmail(email);
      if (existing) {
        return await pb
          .collection("newsletter_subscriptions")
          .update(existing.id, {
            newsletters,
          });
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Get all subscriptions
  async getAll() {
    return await pb.collection("newsletter_subscriptions").getFullList();
  },

  // Update subscription by ID
  async update(id: string, data: Partial<NewsletterSubscription>) {
    return await pb.collection("newsletter_subscriptions").update(id, data);
  },

  // Delete subscription
  async delete(id: string) {
    return await pb.collection("newsletter_subscriptions").delete(id);
  },

  // Get subscription statistics
  async getStats() {
    try {
      const records = await this.getAll();
      const stats = {
        totalSubscribers: records.length,
        newsletterCounts: {} as Record<string, number>,
      };

      records.forEach((record: any) => {
        record.newsletters.forEach((newsletter: string) => {
          stats.newsletterCounts[newsletter] =
            (stats.newsletterCounts[newsletter] || 0) + 1;
        });
      });

      return stats;
    } catch (error) {
      throw error;
    }
  },
};
