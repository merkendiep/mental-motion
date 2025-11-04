# Admin Event Editing Feature

This document describes the admin event editing feature that allows authorized users to edit event details through a web interface.

## Overview

The admin event editing feature provides:
- Secure admin authentication using Supabase Auth
- Event selection and editing interface
- WYSIWYG editor for event descriptions (using Tiptap)
- Protected routes that require admin authentication

## Setup

### 1. Environment Configuration

Add the following environment variables to your `.env.local` file:

```bash
# Existing Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Configuration
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

The `ADMIN_EMAILS` variable should contain a comma-separated list of email addresses that are allowed to access the admin interface.

### 2. Supabase Authentication Setup

Ensure Supabase Authentication is enabled in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Settings
3. Ensure "Email" provider is enabled
4. Create admin users in the Authentication > Users section

### 3. Database Permissions

The event update functionality uses the existing RLS policies. Ensure your Supabase database has the appropriate policies:

```sql
-- Policy: Authenticated users can update events
CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');
```

## Usage

### Accessing the Admin Interface

1. Navigate to `/admin/login` to sign in with admin credentials
2. Enter the email and password of an admin user (email must be in ADMIN_EMAILS)
3. After successful authentication, you'll be redirected to `/events/edit`

### Editing Events

1. On the `/events/edit` page, you'll see:
   - A list of all events (left panel)
   - An edit form (right panel)
   
2. Click on any event in the list to load it into the editor

3. Edit any of the following fields:
   - **Title**: Event title
   - **Date**: Event date (date picker)
   - **Time**: Event time (text field, e.g., "11:00-13:00")
   - **Location**: Event location
   - **Description**: Event description with rich text formatting

4. Use the WYSIWYG editor toolbar to format the description:
   - Bold, Italic, Strikethrough
   - Headings (H2, H3)
   - Bullet and numbered lists
   - Blockquotes
   - Horizontal rules
   - Undo/Redo

5. Click "Update Event" to save changes

6. A success message will appear, and the page will refresh to show the updated data

## Architecture

### Components

- **`/app/admin/login/page.tsx`**: Admin login page
- **`/app/events/edit/page.tsx`**: Server component that checks authentication and loads events
- **`/src/components/EventEditClient.tsx`**: Client component with the editing interface
- **`/src/components/RichTextEditor.tsx`**: Tiptap-based WYSIWYG editor component

### API Routes

- **`/app/api/events/update/route.ts`**: PUT endpoint for updating events
  - Validates authentication
  - Checks admin status
  - Updates event in Supabase

### Services

- **`/src/lib/auth.ts`**: Authentication utilities
  - `isAdmin()`: Checks if a user email is in the admin list
  - `getCurrentUser()`: Gets the current authenticated user
  - `signInWithEmail()`: Signs in with email/password
  - `signOut()`: Signs out the current user
  
- **`/src/services/eventService.ts`**: Event management
  - `updateEvent()`: Updates an event in Supabase

## Security Considerations

1. **Authentication Required**: All admin routes check for valid authentication
2. **Admin Authorization**: Only users with emails in `ADMIN_EMAILS` can access admin features
3. **Server-Side Validation**: API routes validate authentication and admin status before updates
4. **HTML Sanitization**: While the editor outputs HTML, the content is stored and rendered as-is. Consider adding HTML sanitization on the admin side for production use with untrusted admins.

## Troubleshooting

### Cannot Access Admin Interface

- Verify your email is in the `ADMIN_EMAILS` environment variable
- Ensure you're using the correct Supabase credentials
- Check that the user exists in Supabase Authentication

### Events Not Updating

- Check browser console for API errors
- Verify Supabase RLS policies allow authenticated users to update events
- Ensure the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly

### Editor Not Loading

- Clear browser cache
- Check that tiptap dependencies are installed: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`
- Verify there are no JavaScript errors in the browser console

## Future Enhancements

Potential improvements for the admin feature:

1. Add ability to create new events
2. Add ability to delete events
3. Add image upload for event banners
4. Add preview mode before saving changes
5. Add change history/audit log
6. Implement role-based access control (beyond simple email list)
7. Add HTML sanitization for event descriptions
8. Add batch operations (update multiple events at once)
