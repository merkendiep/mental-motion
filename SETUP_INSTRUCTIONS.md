# 🎉 Image Upload Feature - Setup Instructions

## What I Built For You

I've successfully implemented a complete image upload system for your blog admin page! Admins can now upload images directly to Supabase Storage when creating or editing blog posts.

## ✨ Features

✅ **Direct File Upload** - Upload images from your computer  
✅ **Image Preview** - See the image before saving  
✅ **Dual Input Method** - Upload a file OR paste a URL  
✅ **Validation** - Automatic checks for file type and size  
✅ **Secure** - Only admins can upload  
✅ **Clean Code** - Professional architecture with separate service layer  

## 🚀 How to Connect Supabase Storage

### Step 1: Create Storage Bucket (5 minutes)

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your Mental Motion project

2. **Navigate to Storage**
   - Click "Storage" in the left sidebar
   - Click the green "New bucket" button

3. **Create the bucket**
   - **Name**: Type exactly `mentalmotion`
   - **Public bucket**: ✅ Toggle this ON (images need to be publicly accessible)
   - **File size limit**: Leave default or set to 5MB
   - Click "Create bucket"

### Step 2: Configure Policies (Optional - 2 minutes)

The default policies should work fine, but for extra security you can add these policies:

1. In Supabase, go to **Storage** → **Policies**
2. Click "New Policy" and add these:

**Policy 1: Allow authenticated uploads**
```sql
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mentalmotion');
```

**Policy 2: Allow public viewing**
```sql
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'mentalmotion');
```

**Policy 3: Allow authenticated deletion**
```sql
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'mentalmotion');
```

> **Note**: The API already checks for admin authentication, so these policies are an extra layer of security.

### Step 3: Test It Out! (2 minutes)

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Go to the blog admin page**
   - Visit: http://localhost:3000/admin/blog-posts
   - Login with your admin account

3. **Try uploading an image**
   - Click "Create New Blog Post" or edit an existing one
   - Scroll to "Banner Image" section
   - Click "Choose File" and select an image
   - Wait for upload to complete (you'll see a preview)
   - Save the blog post

4. **Verify it works**
   - Go to your blog page and check the image displays correctly

## 📋 What Changed in Your Code

I made minimal, surgical changes:

### New Files Created
1. `src/services/storageService.ts` - Service for Supabase Storage operations
2. `app/api/blog/upload/route.ts` - Secure upload API endpoint
3. `SUPABASE_STORAGE_SETUP.md` - Detailed setup documentation
4. `IMAGE_UPLOAD_GUIDE.md` - Quick reference guide

### Files Modified
1. `src/components/BlogEditClient.tsx` - Added upload UI and logic
2. `SUPABASE_SETUP.md` - Added reference to storage setup

## 🔒 Security Features

Your upload system is secure:
- ✅ Only admin users can upload (verified in API)
- ✅ File type validation (only images: JPEG, PNG, GIF, WebP)
- ✅ File size limit (maximum 5MB)
- ✅ Filename sanitization (prevents malicious filenames)
- ✅ No security vulnerabilities (verified with CodeQL)

## 📱 How Admins Use It

When creating or editing a blog post, admins will see:

### Banner Image Section
```
┌─────────────────────────────────────┐
│ [Image Preview if uploaded]        │
└─────────────────────────────────────┘

Upload new image (max 5MB)
[Choose File] blog-banner.jpg
✓ Image uploaded successfully!

Or enter image URL manually
[https://example.com/image.jpg    ]
```

### Two Ways to Add Images

**Option 1: Upload a file** (Recommended)
- Click "Choose File"
- Select image from computer
- Automatic upload to Supabase
- URL is filled automatically

**Option 2: Enter URL manually**
- Type or paste image URL
- Useful for external images
- Works like before

## 📝 File Requirements

- **Formats**: JPEG, PNG, GIF, WebP
- **Max Size**: 5MB per file
- **Recommended**: 1200x630 pixels for best display

## 🔧 Troubleshooting

### "Unauthorized" error
- ✅ Make sure you're logged in as an admin
- ✅ Check your email is in the `ADMIN_EMAILS` environment variable

### "Failed to upload file"
- ✅ Verify the `mentalmotion` bucket exists in Supabase
- ✅ Make sure the bucket is set to **public**
- ✅ Check your internet connection

### Image doesn't display after upload
- ✅ Ensure bucket is public (most common issue)
- ✅ Check browser console for errors
- ✅ Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct

### Storage quota exceeded
- ✅ Free tier includes 1GB of storage
- ✅ Check usage in Supabase Dashboard → Settings → Billing
- ✅ Delete unused images or upgrade plan

## 📚 Documentation

For more details, see:
- **Quick Start**: `IMAGE_UPLOAD_GUIDE.md`
- **Complete Setup**: `SUPABASE_STORAGE_SETUP.md`
- **Database Setup**: `SUPABASE_SETUP.md`

## 🎯 Summary

You're all set! Just create the `mentalmotion` bucket in Supabase (Step 1 above) and you'll be ready to upload images. The whole setup takes less than 5 minutes.

**Questions?** Check the documentation files or review the troubleshooting section above.

---

Built with clean architecture and security best practices 🚀
