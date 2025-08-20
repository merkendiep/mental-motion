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

export interface Newsletter {
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
    const data = {
      email,
      newsletters,
    };
    return await pb.collection("newsletter_subscriptions").create(data);
  },

  // Get all subscriptions
  async getAll() {
    return await pb.collection("newsletter_subscriptions").getFullList();
  },

  // Update subscription
  async update(id: string, data: Partial<Newsletter>) {
    return await pb.collection("newsletter_subscriptions").update(id, data);
  },

  // Delete subscription
  async delete(id: string) {
    return await pb.collection("newsletter_subscriptions").delete(id);
  },
};
