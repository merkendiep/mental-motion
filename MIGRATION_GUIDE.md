# Event Migration Guide

This guide helps you migrate existing events from `src/data/events.ts` to Supabase.

## Prerequisites

1. ✅ Supabase project created
2. ✅ Database schema created (see SUPABASE_SETUP.md)
3. ✅ Environment variables configured

## Migration Methods

### Method 1: Supabase Dashboard (Recommended for small datasets)

1. Open your Supabase project dashboard
2. Navigate to **Table Editor** → **events**
3. Click **Insert** → **Insert row**
4. Fill in the fields from `src/data/events.ts`:
   - `id`: Keep the same ID from static data
   - `title`: Event title
   - `date`: Date in YYYY-MM-DD format
   - `time`: Time as string (e.g., "11:00-13:00")
   - `location`: Full location string
   - `description`: HTML description
   - `created_at`: Auto-generated or set manually
   - `updated_at`: Auto-generated or set manually

### Method 2: SQL Insert (Recommended for bulk migration)

1. Open **SQL Editor** in Supabase dashboard
2. Use the template below, replacing with your event data:

```sql
INSERT INTO events (id, title, date, time, location, description)
VALUES
  (
    '1',
    'Verbinden in een wereld vol Prikkels',
    '2025-10-30',
    '11:00-13:00',
    'MentalMotion, Wolff en Dekenplein 5, 3532 XH',
    '<p>We leven in een tijd waarin er continu prikkels op ons afkomen...</p>'
  ),
  (
    '3',
    'Peer-groep',
    '2025-10-13',
    '16:00 - 18:00',
    'MentalMotion, Wolff en Dekenplein 5, 3532 XH',
    '<p>Voel jij je soms alleen in alles wat op je afkomt?...</p>'
  )
  -- Add more events...
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  date = EXCLUDED.date,
  time = EXCLUDED.time,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  updated_at = NOW();
```

**Important Notes:**
- Escape single quotes in text by doubling them: `'it's'` → `'it''s'`
- For HTML descriptions with quotes, be extra careful with escaping
- The `ON CONFLICT` clause updates if the ID already exists

### Method 3: Node.js Migration Script

Create a migration script to automate the process:

```javascript
// migrate-events.js
import { createClient } from '@supabase/supabase-js';
import { staticEvents } from './src/data/events.ts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for migrations

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateEvents() {
  console.log(`Migrating ${staticEvents.length} events...`);
  
  for (const event of staticEvents) {
    console.log(`Migrating event: ${event.title}`);
    
    const { error } = await supabase
      .from('events')
      .upsert({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        created_at: event.created,
        updated_at: event.updated,
      });
    
    if (error) {
      console.error(`Error migrating event ${event.id}:`, error);
    } else {
      console.log(`✓ Migrated: ${event.title}`);
    }
  }
  
  console.log('Migration complete!');
}

migrateEvents();
```

Run it:
```bash
node migrate-events.js
```

## Verification

After migration, verify the data:

1. **Check total count:**
   ```sql
   SELECT COUNT(*) FROM events;
   ```

2. **View recent events:**
   ```sql
   SELECT id, title, date FROM events ORDER BY date DESC LIMIT 10;
   ```

3. **Test in application:**
   - Visit `/calendar` page
   - Verify all events appear correctly
   - Click on events to view details
   - Check dates, times, locations, and descriptions

## Rollback

If something goes wrong:

1. **Clear all events:**
   ```sql
   DELETE FROM events;
   ```

2. **Re-run migration**

3. **Or restore from backup:**
   - Supabase keeps automatic backups
   - Go to Database → Backups in dashboard

## Post-Migration

After successful migration:

1. ✅ Test event listing page
2. ✅ Test event detail pages
3. ✅ Test event registration
4. ✅ Verify signups work
5. ✅ Check event_signups table has proper data

Optional cleanup:
- Keep `src/data/events.ts` as backup reference
- Or delete if confident in migration
- Update deployment documentation

## Troubleshooting

### Events not showing up
- Check Supabase URL and anon key in env vars
- Verify RLS policies allow public SELECT
- Check browser console for errors

### HTML descriptions look wrong
- Verify HTML is properly escaped in SQL
- Check for quote escaping issues
- Test with simple HTML first

### Dates appear incorrect
- Ensure dates are in YYYY-MM-DD format
- Check timezone settings in Supabase
- Verify date filtering logic in eventService

## Future Events Management

After migration, manage events directly in Supabase:

1. **Add new event:** Use Supabase dashboard or SQL
2. **Update event:** Edit in table editor
3. **Delete event:** Remove from table (consider soft deletes)
4. **Future improvement:** Build admin panel in application

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Join Supabase Discord: https://discord.supabase.com
- Check GitHub issues in project
