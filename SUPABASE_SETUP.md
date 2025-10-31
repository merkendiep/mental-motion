# Supabase Setup Guide

This guide explains how to set up Supabase for the Mental Motion application.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

## Database Schema

### 1. Events Table

This table stores all events that will be displayed in the calendar and event pages.

```sql
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_events_date ON events(date);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read events
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update events (adjust as needed)
CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### 2. Event Signups Table

This table stores user registrations for events.

```sql
CREATE TABLE event_signups (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  event_id TEXT NOT NULL,
  event_title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_event_signups_event_id ON event_signups(event_id);
CREATE INDEX idx_event_signups_email ON event_signups(email);
CREATE INDEX idx_event_signups_created_at ON event_signups(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE event_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert signups (public registration)
CREATE POLICY "Anyone can register for events"
  ON event_signups FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can view signups (adjust as needed)
CREATE POLICY "Authenticated users can view signups"
  ON event_signups FOR SELECT
  USING (auth.role() = 'authenticated');
```

## Migrating Existing Events

If you have existing events in the `src/data/events.ts` file, you can migrate them to Supabase:

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Select the `events` table
4. Insert rows manually or use the SQL Editor to bulk insert

Example SQL for bulk insert:

```sql
INSERT INTO events (id, title, date, time, location, description, created_at, updated_at)
VALUES
  ('1', 'Event Title', '2025-10-30', '11:00-13:00', 'Location', 'Description HTML', NOW(), NOW()),
  -- Add more events...
;
```

## Testing the Integration

After setting up the database and environment variables:

1. Start the development server: `npm run dev`
2. Navigate to `/calendar` to see events from Supabase
3. Click on an event to view details and test registration
4. Check the `event_signups` table in Supabase to verify registrations are being saved

## Security Notes

- The provided RLS policies are basic. Adjust them based on your security requirements.
- Consider adding more granular permissions for event management.
- Email addresses are stored in plain text - ensure your Supabase project has appropriate security measures.
- Consider adding duplicate registration checks (e.g., same email for same event).

## Troubleshooting

### Events not loading
- Check that your Supabase URL and anon key are correct
- Verify the `events` table exists and has data
- Check browser console for any API errors

### Registration not working
- Verify the `event_signups` table exists
- Check RLS policies allow public inserts
- Review server logs for any error messages
