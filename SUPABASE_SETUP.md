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

### 3. Blog Posts Table

This table stores all blog posts that will be displayed on the blog pages.

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  banner TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Policy: Only authenticated users can insert/update/delete blog posts (adjust as needed)
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
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

## Migrating Existing Blog Posts

If you have existing blog posts in the `app/blog/page.tsx` file, you can migrate them to Supabase:

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Select the `blog_posts` table
4. Insert rows manually or use the SQL Editor to bulk insert

Example SQL for bulk insert:

```sql
INSERT INTO blog_posts (slug, title, banner, authors, description, content, date, published)
VALUES
  (
    'stabiele-basis-voor-jongvolwassenen-in-utrecht',
    'Stabiele basis voor jongvolwassenen in Utrecht',
    '/images/friendly-hug-outside.jpeg',
    ARRAY['Marik'],
    'Ik werk dagelijks met studenten en andere jongvolwassenen in Utrecht...',
    'Full content here...',
    '2025-10-21',
    true
  ),
  -- Add more blog posts...
;
```

**Note:** For the `content` field, you can include the full blog post text with proper formatting. The `authors` field uses PostgreSQL array syntax: `ARRAY['Author1', 'Author2']`.

## Testing the Integration

After setting up the database and environment variables:

1. Start the development server: `npm run dev`
2. Navigate to `/calendar` to see events from Supabase
3. Navigate to `/blog` to see blog posts from Supabase
3. Click on an event to view details and test registration
4. Check the `event_signups` table in Supabase to verify registrations are being saved

## Security Notes

- The provided RLS policies are basic. Adjust them based on your security requirements.
- Consider adding more granular permissions for event management.
- Email addresses are stored in plain text - ensure your Supabase project has appropriate security measures.
- Consider adding duplicate registration checks (e.g., same email for same event).
- **Important**: Event descriptions support HTML. Always sanitize HTML content before inserting it into the database to prevent XSS attacks. Consider using a library like [DOMPurify](https://github.com/cure53/DOMPurify) on the admin side when creating events.

## Troubleshooting

### Events not loading
- Check that your Supabase URL and anon key are correct
- Verify the `events` table exists and has data
- Check browser console for any API errors

### Registration not working
- Verify the `event_signups` table exists
- Check RLS policies allow public inserts
- Review server logs for any error messages
