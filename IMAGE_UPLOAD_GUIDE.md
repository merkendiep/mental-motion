# Blog Image Upload Feature - Quick Start

This document provides a quick overview of the new image upload feature for blog posts.

## What's New

Admins can now upload images directly to Supabase Storage when creating or editing blog posts, instead of manually providing image URLs.

## Features

✅ **File Upload**: Upload images directly from the blog admin interface  
✅ **Image Preview**: See uploaded images before saving  
✅ **Validation**: Automatic file type and size validation  
✅ **Dual Input**: Upload a file OR enter a URL manually  
✅ **Secure**: Admin-only access with authentication checks  
✅ **Clean Code**: Dedicated storage service following clean architecture  

## Quick Setup

### 1. Create Storage Bucket

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Storage** → **New bucket**
3. Create a bucket named: `mentalmotion`
4. ✅ Enable "Public bucket"
5. Click **Create bucket**

### 2. Configure Policies (Optional)

The default policies work fine, but for additional security, you can add:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mentalmotion');

-- Allow anyone to view public images
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'mentalmotion');
```

### 3. Test It Out

1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/admin/blog-posts
3. Create or edit a blog post
4. Use the "Banner Image" section to upload an image
5. Save and verify the image displays correctly

## Usage

### For Admins

When creating or editing a blog post:

1. **Upload a new image**:
   - Click "Choose File" under "Banner Image"
   - Select an image (JPEG, PNG, GIF, or WebP, max 5MB)
   - Wait for upload to complete
   - Image preview will appear automatically

2. **Or enter a URL manually**:
   - Type or paste a URL in the text input
   - Useful for external images or existing assets

### File Requirements

- **Formats**: JPEG, PNG, GIF, WebP
- **Max Size**: 5MB
- **Recommended Dimensions**: 1200x630 pixels (for optimal display)

## Architecture

### New Files

```
src/services/storageService.ts          # Storage service for Supabase
app/api/blog/upload/route.ts            # Upload API endpoint
SUPABASE_STORAGE_SETUP.md               # Detailed setup guide
```

### Modified Files

```
src/components/BlogEditClient.tsx       # Enhanced with upload UI
SUPABASE_SETUP.md                       # Updated with storage reference
```

## How It Works

1. **User uploads file** → BlogEditClient component
2. **Validation** → Client-side checks (type, size)
3. **API call** → `/api/blog/upload` with FormData
4. **Authentication** → Verify admin user
5. **Upload to Supabase** → StorageService.uploadFile()
6. **Return URL** → Public URL sent back to client
7. **Preview & Save** → Image displayed, URL stored in database

## Troubleshooting

### Upload fails
- ✅ Verify you're logged in as admin
- ✅ Check `mentalmotion` bucket exists and is public
- ✅ Verify file is under 5MB and correct format

### Images don't display
- ✅ Ensure bucket is set to public
- ✅ Check browser console for errors
- ✅ Verify Supabase URL in environment variables

### Storage quota exceeded
- ✅ Check Supabase storage usage (free tier: 1GB)
- ✅ Delete unused images
- ✅ Consider upgrading plan

## Documentation

For detailed information:
- **Full Setup Guide**: [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md)
- **Database Setup**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **General Info**: [README.md](./README.md)

## Future Enhancements

Potential improvements:
- [ ] Image gallery to browse uploaded images
- [ ] Automatic image resizing/optimization
- [ ] Drag & drop upload interface
- [ ] Multiple image upload
- [ ] Automatic cleanup of unused images

## Support

If you encounter issues:
1. Check the troubleshooting sections in documentation
2. Review Supabase dashboard for errors
3. Check browser console for client-side errors
4. Review server logs for API errors

---

**Built with clean architecture** 🚀  
Separated concerns: Service layer → API layer → UI layer
