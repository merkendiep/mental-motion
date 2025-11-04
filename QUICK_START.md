# Quick Start: Admin Event Editing

## For First-Time Setup

1. **Add Environment Variables** (in `.env.local`):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ADMIN_EMAILS=your-email@example.com
   ```

2. **Create Admin User in Supabase**:
   - Go to Supabase Dashboard → Authentication → Users
   - Add new user with email matching one in `ADMIN_EMAILS`
   - Set password for the user

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## For Daily Use

1. **Login**: Navigate to `http://localhost:3000/admin/login`
2. **Enter Credentials**: Use admin email and password
3. **Edit Events**: Go to `/events/edit` or you'll be redirected automatically
4. **Select Event**: Click any event in the left panel
5. **Make Changes**: Edit fields and use the rich text editor
6. **Save**: Click "Update Event" button
7. **Done**: See success message and updated data

## URLs

- **Login**: `/admin/login`
- **Edit Events**: `/events/edit`
- **View Events**: `/calendar` (public)
- **Individual Event**: `/event/[id]` (public)

## Rich Text Editor Controls

| Button | Function |
|--------|----------|
| **B** | Bold text |
| **I** | Italic text |
| **S** | Strikethrough |
| H2 | Heading 2 |
| H3 | Heading 3 |
| • List | Bullet list |
| 1. List | Numbered list |
| " Quote | Blockquote |
| ― | Horizontal rule |
| ↶ | Undo |
| ↷ | Redo |

## Troubleshooting

### Can't Login?
- Check email is in `ADMIN_EMAILS` environment variable
- Verify user exists in Supabase Authentication
- Ensure password is correct

### Can't See Edit Page?
- Must be logged in first
- Email must be in admin list
- Check browser console for errors

### Changes Not Saving?
- Check network tab for API errors
- Verify Supabase credentials are correct
- Ensure RLS policies allow updates for authenticated users

## Environment Variables Required

```bash
# Required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Required for admin access
ADMIN_EMAILS=admin@example.com,another-admin@example.com
```

## Security Notes

- ⚠️ Never commit `.env.local` to git
- ⚠️ Keep Supabase anon key secure
- ⚠️ Use strong passwords for admin accounts
- ⚠️ Regularly review admin email list
- ⚠️ Consider adding 2FA in production

## Files to Know

- **Login Page**: `app/admin/login/page.tsx`
- **Edit Page**: `app/events/edit/page.tsx`
- **API Endpoint**: `app/api/events/update/route.ts`
- **Auth Utils**: `src/lib/auth.ts`
- **Event Service**: `src/services/eventService.ts`

## Need More Help?

- See `ADMIN_FEATURE.md` for detailed documentation
- See `ADMIN_UI_DOCS.md` for UI layout details
- Check `IMPLEMENTATION_COMPLETE.md` for technical details
