# Partners Feature - Quick Start Guide

## What's New? 🎉

A new admin page has been added at `/admin/partners` where you can manage partner logos that appear on your site!

## Setup (One-Time) ⚙️

### Step 1: Create Database Table

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Click on your project
3. Go to **SQL Editor**
4. Copy and paste this SQL:

```sql
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_partners_name ON partners(name);
CREATE INDEX idx_partners_created_at ON partners(created_at);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are viewable by everyone"
  ON partners FOR SELECT
  USING (true);

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

5. Click **Run** or press `Ctrl+Enter`
6. ✅ You should see "Success. No rows returned"

### Step 2: Verify Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Make sure the `mentalmotion` bucket exists
3. Click on the bucket and verify it's set to **Public**
4. ✅ Done! The `/partners` folder will be created automatically

## Using the Feature 🚀

### Adding a Partner

1. Navigate to: `http://localhost:3000/admin/partners` (or your production URL)
2. Log in if you haven't already
3. Click the **"New"** button
4. Fill in the form:
   - **Partner Name**: e.g., "Acme Corporation"
   - **Logo**: 
     - Click "Choose File" to upload an image, OR
     - Enter an image URL
   - **Website URL**: e.g., "https://acme.com"
5. Click **"Create Partner"**
6. ✅ Done! Your partner has been added

### Uploading a Logo

**Option 1: Upload a file** (Recommended)
- Click "Choose File"
- Select an image (JPEG, PNG, GIF, SVG, or WebP)
- Max size: 5MB
- The logo is automatically uploaded to Supabase Storage
- You'll see a preview once it's uploaded

**Option 2: Enter a URL**
- Type or paste an image URL
- Useful for external images
- Preview appears if the URL is valid

### Editing a Partner

1. Click on a partner in the list (left side)
2. Update any fields you want to change
3. Click **"Update Partner"**
4. ✅ Changes saved!

### Deleting a Partner

1. Select the partner you want to remove
2. Click the **"Delete"** button
3. Confirm in the popup
4. ✅ Partner removed!

## Displaying Partners on Your Site 🎨

Add this to any page where you want to show partner logos:

```tsx
import PartnerLogos from "@/src/components/PartnerLogos";

export default function MyPage() {
  return (
    <div>
      {/* Your other content */}
      
      <PartnerLogos />
      
      {/* More content */}
    </div>
  );
}
```

The component will automatically:
- Fetch all partners from the database
- Display them in a responsive grid
- Show logos in grayscale (colored on hover)
- Link to partner websites
- Handle cases where there are no partners

## Logo Tips 💡

### Recommended:
- **Format**: PNG or SVG (for logos with transparency)
- **Size**: 200-400px wide
- **File Size**: Under 1MB (5MB max)
- **Background**: Transparent recommended
- **Quality**: High resolution for best display

### Supported Formats:
- JPEG/JPG
- PNG
- GIF
- WebP
- SVG

## Troubleshooting 🔧

### "Unauthorized" error
- Make sure you're logged in as admin
- Check that your email is in the `ADMIN_EMAILS` environment variable

### Upload fails
- Check file size (must be under 5MB)
- Verify file format is supported
- Make sure the storage bucket exists and is public

### Partners not showing
- Verify the table was created successfully
- Check browser console for errors
- Refresh the page

### Can't see the admin page
- Make sure you're logged in
- Navigate to `/admin/login` first
- Then go to `/admin/partners`

## Need Help? 📚

- **Complete Guide**: See `PARTNERS_GUIDE.md`
- **Technical Details**: See `IMPLEMENTATION_SUMMARY_PARTNERS.md`
- **Database Setup**: See `SUPABASE_SETUP.md`

## Features at a Glance ✨

✅ Add unlimited partners  
✅ Upload logos directly (no external hosting needed)  
✅ Edit partner info anytime  
✅ Delete partners easily  
✅ Preview logos before saving  
✅ Responsive design (works on mobile)  
✅ Secure (admin-only access)  
✅ Fast and easy to use  

---

**That's it! You're ready to manage your partner logos.** 🎊

Start by adding your first partner at `/admin/partners`!
