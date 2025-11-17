# Supabase Storage Setup for Blog Images

This guide explains how to set up Supabase Storage for blog image uploads in the Mental Motion application.

## Overview

The blog admin panel now supports uploading images directly to Supabase Storage. Images are stored in a dedicated storage bucket and can be used as blog post banner images.

## Prerequisites

- A Supabase project (same one used for the database)
- Environment variables already configured (see `.env.example`)
- Admin access to the Supabase dashboard

## Setup Instructions

### 1. Create a Storage Bucket

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **New bucket**
5. Configure the bucket:
   - **Name**: `mentalmotion`
   - **Public bucket**: ✅ Enable (so images are publicly accessible)
   - **File size limit**: 5MB (optional, but recommended)
   - **Allowed MIME types**: Leave empty or specify: `image/jpeg,image/png,image/gif,image/webp`
6. Click **Create bucket**

### 2. Configure Storage Policies

By default, public buckets allow anyone to read files, but only authenticated users can upload. We need to ensure that only admins can upload images.

The application already handles authentication and admin checks in the API routes, so the default policies should work fine. However, if you want to add additional security at the storage level:

#### Option A: Allow all authenticated users to upload (recommended)

```sql
-- Policy: Authenticated users can upload files
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'mentalmotion'
);

-- Policy: Authenticated users can update their uploads
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'mentalmotion');

-- Policy: Authenticated users can delete files
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'mentalmotion');

-- Policy: Anyone can view public files
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'mentalmotion');
```

#### Option B: More restrictive policies (optional)

If you want only specific admin emails to upload (not recommended as it duplicates the API-level check):

```sql
-- Replace with your actual admin emails
CREATE POLICY "Only admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'mentalmotion' AND
  auth.jwt() ->> 'email' IN ('admin@example.com', 'another-admin@example.com')
);
```

### 3. Verify Storage Configuration

1. In your Supabase Dashboard, go to **Storage** → **mentalmotion**
2. Try uploading a test image manually to verify the bucket is working
3. Copy the public URL of the test image
4. Verify you can access the image URL in your browser

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the admin blog page: http://localhost:3000/admin/blog-posts
3. Login as an admin user
4. Create or edit a blog post
5. Try uploading an image using the file upload input
6. Verify the image appears in the preview
7. Save the blog post and check that the image displays correctly on the public blog page

## How It Works

### Storage Service (`src/services/storageService.ts`)

The `StorageService` class provides clean methods for interacting with Supabase Storage:

- `uploadFile(file, path?)` - Uploads a file and returns the public URL
  - Files are automatically saved in the `/blogs` subfolder for organization
- `deleteFile(path)` - Deletes a file from storage
- `getPublicUrl(path)` - Gets the public URL for a file
- `listFiles(path?)` - Lists files in a directory

### Upload API Route (`app/api/blog/upload/route.ts`)

The API route handles:
- Authentication verification (admin only)
- File validation (type, size)
- Upload to Supabase Storage
- Returns the public URL

### Blog Edit Client (`src/components/BlogEditClient.tsx`)

The component provides:
- File input for uploading images
- Image preview
- Upload progress indication
- Manual URL input (as a fallback)

## File Specifications

### Supported File Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limit
- Maximum: 5MB per file

### File Naming and Organization
Files are automatically organized and renamed:
- **Location**: All blog images are saved in the `/blogs` subfolder within the bucket
- **Naming**: Files are renamed with a timestamp prefix to avoid collisions
```
blogs/{timestamp}-{sanitized-filename}
```

Example: `blogs/1700241234567-blog-banner.jpg`

## Troubleshooting

### Upload fails with "Unauthorized" error
- Verify you're logged in as an admin user
- Check that your email is in the `ADMIN_EMAILS` environment variable

### Upload fails with "Failed to upload file"
- Verify the `mentalmotion` bucket exists
- Check that the bucket is set to public
- Verify storage policies allow authenticated uploads
- Check the Supabase storage quota hasn't been exceeded

### Images don't display after upload
- Verify the bucket is set to **public**
- Check that the public URL is correct
- Verify your Supabase project URL is correct in `.env.local`
- Check browser console for CORS errors

### Storage quota exceeded
- Go to Supabase Dashboard → Settings → Billing
- Check your storage usage
- Free tier includes 1GB of storage
- Upgrade plan if needed or delete old unused images

## Security Considerations

### Authentication
- All uploads require authentication via the API route
- Admin status is verified before allowing uploads
- The `blogStorageService` uses the client-side Supabase client, but authentication is enforced at the API route level

### File Validation
- File type validation (client and server-side)
- File size limits (5MB max)
- Filename sanitization to prevent path traversal

### Public Access
- Images are stored in a public bucket (required for display on the website)
- Only authenticated admins can upload
- Anyone can view uploaded images (by design, since they're blog banners)

## Best Practices

### Image Optimization
Consider optimizing images before upload:
- Use appropriate dimensions (recommended: 1200x630 for blog banners)
- Compress images to reduce file size
- Use WebP format for better compression
- Use tools like TinyPNG, ImageOptim, or online compressors

### Naming Conventions
While the system auto-generates unique filenames, consider:
- Using descriptive filenames before upload
- Organizing images by date or category (future enhancement)

### Storage Management
- Regularly review uploaded images
- Delete unused images to save storage
- Consider implementing automatic cleanup for deleted blog posts (future enhancement)

## Future Enhancements

Potential improvements to consider:

1. **Image Resizing**: Automatically resize uploaded images to optimal dimensions
2. **Multiple Formats**: Generate multiple sizes (thumbnail, medium, large)
3. **Image Gallery**: Browse previously uploaded images
4. **Bulk Upload**: Upload multiple images at once
5. **Drag & Drop**: Drag and drop interface for uploads
6. **Automatic Cleanup**: Delete images when blog posts are deleted
7. **Image Compression**: Automatic compression on upload
8. **CDN Integration**: Serve images through a CDN for better performance

## Additional Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Storage Row Level Security](https://supabase.com/docs/guides/storage/security/access-control)
- [Next.js File Upload Tutorial](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#formdata)
