import { supabase, Event, EventSignup } from '@/src/lib/supabase';

/**
 * Event Service
 * Clean service for managing events and event signups via Supabase
 */
export class EventService {
  /**
   * Get all events sorted by date (ascending)
   * Only returns future events by default
   * 
   * Note: Date comparison uses ISO date strings (YYYY-MM-DD) and compares
   * at the date level only (ignoring time). Events are filtered based on
   * the server's local date. For timezone-aware filtering, consider storing
   * and comparing full timestamps with timezone information.
   */
  async getAllEvents(includePast: boolean = false): Promise<Event[]> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      // Filter out past events unless explicitly requested
      if (!includePast) {
        const today = new Date().toISOString().split('T')[0];
        query = query.gte('date', today);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching events:', error);
        throw new Error('Failed to fetch events');
      }

      return data || [];
    } catch (error) {
      console.error('Event service error:', error);
      throw error;
    }
  }

  /**
   * Get a single event by ID
   */
  async getEventById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Not found
          return null;
        }
        console.error('Error fetching event:', error);
        throw new Error('Failed to fetch event');
      }

      return data;
    } catch (error) {
      console.error('Event service error:', error);
      throw error;
    }
  }

  /**
   * Register a user for an event
   * Note: Email should already be normalized before calling this method
   */
  async registerForEvent(signup: EventSignup): Promise<void> {
    try {
      const { error } = await supabase
        .from('event_signups')
        .insert({
          first_name: signup.first_name,
          last_name: signup.last_name,
          email: signup.email, // Already normalized at API boundary
          mobile: signup.mobile || null,
          event_id: signup.event_id,
          event_title: signup.event_title,
        });

      if (error) {
        console.error('Error registering for event:', error);
        throw new Error('Failed to register for event');
      }
    } catch (error) {
      console.error('Event signup error:', error);
      throw error;
    }
  }

  /**
   * Get all upcoming events (convenience method)
   */
  async getUpcomingEvents(): Promise<Event[]> {
    return this.getAllEvents(false);
  }

  /**
   * Get all events including past ones
   */
  async getAllEventsIncludingPast(): Promise<Event[]> {
    return this.getAllEvents(true);
  }
}

// Export a singleton instance
export const eventService = new EventService();
