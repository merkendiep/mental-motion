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

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
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

// Events service
export const eventsService = {
  // Get all events
  async getAll() {
    try {
      return await pb.collection("events").getFullList<Event>();
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },

  // Get events with pagination
  async getList(page: number = 1, perPage: number = 50) {
    try {
      return await pb.collection("events").getList<Event>(page, perPage);
    } catch (error) {
      console.error("Error fetching events list:", error);
      return {
        page: 1,
        perPage: 50,
        totalItems: 0,
        totalPages: 0,
        items: [] as Event[],
      };
    }
  },

  // Get events sorted by date
  async getAllSorted() {
    try {
      return await pb.collection("events").getFullList<Event>({
        sort: "date",
      });
    } catch (error) {
      console.error("Error fetching sorted events:", error);
      return [];
    }
  },

  // Get upcoming events
  async getUpcoming(limit: number = 10) {
    try {
      const today = new Date().toISOString().split("T")[0];
      return await pb.collection("events").getFullList<Event>({
        filter: `date >= "${today}"`,
        sort: "date",
        perPage: limit,
      });
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      return [];
    }
  },

  // Get single event by ID
  async getById(id: string) {
    try {
      return await pb.collection("events").getOne<Event>(id);
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  },

  // Create new event
  async create(data: Omit<Event, "id" | "created" | "updated">) {
    try {
      return await pb.collection("events").create<Event>(data);
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  // Update event
  async update(id: string, data: Partial<Event>) {
    try {
      return await pb.collection("events").update<Event>(id, data);
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  },

  // Delete event
  async delete(id: string) {
    try {
      return await pb.collection("events").delete(id);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  },
};
