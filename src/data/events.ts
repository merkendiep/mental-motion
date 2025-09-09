// Static events data for the application
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

export const staticEvents: Event[] = [
  {
    id: "1",
    title: "Mental Motion Workshop: Mindfulness & Beweging",
    date: "2025-09-15",
    time: "19:00",
    location: "De peer",
    description: "Een test event",
    created: "2024-12-01T10:00:00Z",
    updated: "2024-12-01T10:00:00Z",
  },
];

// Helper functions to interact with static events data
export const eventsService = {
  // Get all events sorted by date
  async getAllSorted(): Promise<Event[]> {
    // Sort events by date (ascending)
    return staticEvents
      .filter((event) => new Date(event.date) >= new Date()) // Only future events
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    return staticEvents.find((event) => event.id === id) || null;
  },

  // Get all events (including past ones)
  async getAll(): Promise<Event[]> {
    return staticEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },
};
