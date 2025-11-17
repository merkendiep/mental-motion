# Partners Management Feature Guide

This guide explains how to use the new partners management feature to control partner logos displayed on the site.

## Overview

The partners management feature allows admins to:
- Add new partner organizations
- Upload partner logos to Supabase Storage
- Edit partner information (name, logo, website URL)
- Remove partners
- Preview partner logos before saving

## Quick Start

### 1. Setup Supabase Table

First, create the `partners` table in your Supabase database. Open the SQL Editor in your Supabase dashboard and run:

```sql
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_partners_name ON partners(name);
CREATE INDEX idx_partners_created_at ON partners(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read partners
CREATE POLICY "Partners are viewable by everyone"
  ON partners FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update/delete partners
CREATE POLICY "Authenticated users can insert partners"
  ON partners FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update partners"
  ON partners FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete partners"
  ON partners FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 2. Verify Storage Bucket

Ensure you have the `mentalmotion` storage bucket created and configured:

1. Go to Supabase Dashboard → Storage
2. Verify the `mentalmotion` bucket exists
3. Ensure the bucket is set to **Public**
4. The `/partners` subfolder will be created automatically when you upload your first logo

### 3. Access the Admin Page

1. Navigate to http://localhost:3000/admin/login (or your production URL)
2. Sign in with admin credentials
3. Go to http://localhost:3000/admin/partners

## Using the Partners Admin Page

### Adding a New Partner

1. Click the **"New"** button in the partner list panel
2. Fill in the required fields:
   - **Partner Name**: The name of the organization
   - **Logo**: Upload an image file OR enter a URL
   - **Website URL**: The partner's website (must be a valid URL)
3. Click **"Create Partner"**

### Uploading a Logo

You have two options for adding a partner logo:

**Option 1: Upload a file**
- Click "Choose File" under the Logo field
- Select an image file (JPEG, PNG, GIF, SVG, or WebP)
- Maximum file size: 5MB
- The logo will be automatically uploaded to `/partners` subfolder in Supabase Storage
- A preview will appear once the upload is complete

**Option 2: Enter a URL**
- Type or paste an image URL in the text input
- Useful for external images or existing assets
- A preview will appear if the URL is valid

### Editing an Existing Partner

1. Click on a partner in the list on the left
2. Modify the fields you want to change
3. Click **"Update Partner"**

### Deleting a Partner

1. Select the partner you want to delete
2. Click the **"Delete"** button
3. Confirm the deletion in the modal dialog
4. The partner will be permanently removed

**Note:** Deleting a partner does NOT automatically remove the logo file from storage. You may want to manually clean up unused images from the Supabase Storage bucket.

## Logo Requirements

### Supported Formats
- JPEG/JPG
- PNG
- GIF
- WebP
- SVG

### Recommended Specifications
- **File Size**: Under 5MB (required)
- **Dimensions**: 200-400px width recommended
- **Format**: PNG or SVG for logos with transparency
- **Background**: Transparent background recommended

### File Naming
When uploading files, they are automatically renamed with a timestamp to ensure uniqueness:
```
partners/1234567890-company-logo.png
```

## Features

### List View
- Shows all partners in chronological order (newest first)
- Displays partner name, logo thumbnail, and website URL
- Click any partner to edit

### Form Validation
- All fields are required
- Website URL must be a valid URL format
- Image files are validated for type and size
- Real-time error messages for invalid inputs

### Image Preview
- Uploaded logos are previewed immediately
- Invalid URLs show an error placeholder
- Preview helps verify the logo before saving

### Status Messages
- Success messages appear after create/update/delete operations
- Error messages explain what went wrong
- Upload progress indicator for file uploads

## Displaying Partners on Your Site

A ready-to-use component is provided for displaying partner logos on your public pages:

```tsx
import PartnerLogos from "@/src/components/PartnerLogos";

export default function MyPage() {
  return (
    <div>
      {/* Your page content */}
      
      <PartnerLogos />
    </div>
  );
}
```

The `PartnerLogos` component:
- Fetches all partners from the database
- Displays them in a responsive grid layout
- Shows logos in grayscale, colored on hover
- Links to partner websites in a new tab
- Automatically handles empty state (no display if no partners)

## Architecture

### Files Structure
```
app/admin/partners/
└── page.tsx                    # Admin page (server component)

app/api/partners/
├── route.ts                    # POST, PUT, DELETE endpoints
└── upload/
    └── route.ts                # Logo upload endpoint

src/services/
└── partnerService.ts           # Partner CRUD service

src/components/
├── PartnerEditClient.tsx       # Client component for admin UI
└── PartnerLogos.tsx            # Public display component
```

### API Endpoints

**POST /api/partners**
- Creates a new partner
- Requires: `name`, `logo`, `url`
- Returns: Created partner object

**PUT /api/partners**
- Updates an existing partner
- Requires: `id`, `name`, `logo`, `url`
- Returns: Updated partner object

**DELETE /api/partners**
- Deletes a partner
- Requires: `id`
- Returns: Success message

**POST /api/partners/upload**
- Uploads a logo file to Supabase Storage
- Requires: File in FormData
- Returns: Public URL of uploaded image

### Security

All API endpoints require:
1. Valid authentication (user must be signed in)
2. Admin authorization (user email must be in `ADMIN_EMAILS`)

The partners table uses Row Level Security:
- Anyone can read partners (public display)
- Only authenticated users can create/update/delete

## Troubleshooting

### Upload Fails
- ✅ Verify you're logged in as admin
- ✅ Check file size (must be under 5MB)
- ✅ Verify file format is supported
- ✅ Ensure `mentalmotion` bucket exists and is public

### Partners Not Loading
- ✅ Verify the `partners` table exists in Supabase
- ✅ Check RLS policies are configured correctly
- ✅ Check browser console for errors
- ✅ Verify Supabase credentials in environment variables

### Image Not Displaying
- ✅ Ensure the Supabase storage bucket is set to public
- ✅ Check the image URL is accessible
- ✅ Verify CORS settings if using external images
- ✅ Check browser console for 403/404 errors

### Cannot Access Admin Page
- ✅ Verify you're logged in
- ✅ Check your email is in the `ADMIN_EMAILS` environment variable
- ✅ Ensure Supabase authentication is working

## Best Practices

1. **Logo Quality**: Use high-quality logos that represent the partner well
2. **Consistent Sizing**: Try to use logos with similar dimensions for visual consistency
3. **Transparent Backgrounds**: Use PNG or SVG with transparent backgrounds when possible
4. **File Organization**: Logos are automatically organized in the `/partners` subfolder
5. **Regular Cleanup**: Periodically clean up unused images from Supabase Storage
6. **URL Validation**: Always test partner website URLs before saving

## Future Enhancements

Potential improvements:
- [ ] Display order management (drag and drop)
- [ ] Partner categories or tags
- [ ] Automatic image optimization/resizing
- [ ] Bulk import from CSV
- [ ] Partner statistics (clicks, views)
- [ ] Automatic cleanup of orphaned logo files
- [ ] Logo gallery browser for existing uploads
- [ ] Multiple logo sizes (thumbnail, full size)

## Related Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Database schema and configuration
- [Supabase Storage Setup](./SUPABASE_STORAGE_SETUP.md) - Storage bucket configuration
- [Admin Feature Guide](./ADMIN_FEATURE.md) - General admin features documentation
- [Image Upload Guide](./IMAGE_UPLOAD_GUIDE.md) - Blog image upload documentation

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase dashboard for errors
3. Check browser console for client-side errors
4. Review server logs for API errors
5. Verify environment variables are set correctly

---

**Built with clean architecture** 🚀  
Following the same patterns as blog posts and events management.
