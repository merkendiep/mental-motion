# Partners Feature - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        PARTNERS FEATURE                          │
│                     Mental Motion Application                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Admin Interface                   Public Display                │
│  ┌──────────────────────┐         ┌────────────────────┐        │
│  │  /admin/partners     │         │  PartnerLogos.tsx  │        │
│  │                      │         │                    │        │
│  │  ┌──────────────┐   │         │  ┌──────────────┐  │        │
│  │  │ Partner List │   │         │  │ Logo Grid    │  │        │
│  │  │ - Create New │   │         │  │ - Responsive │  │        │
│  │  │ - Select     │   │         │  │ - Grayscale  │  │        │
│  │  └──────────────┘   │         │  │ - Hover FX   │  │        │
│  │                      │         │  └──────────────┘  │        │
│  │  ┌──────────────┐   │         └────────────────────┘        │
│  │  │ Edit Form    │   │                                        │
│  │  │ - Name       │   │                                        │
│  │  │ - Logo       │   │                                        │
│  │  │ - URL        │   │                                        │
│  │  │ - Preview    │   │                                        │
│  │  └──────────────┘   │                                        │
│  └──────────────────────┘                                        │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                          API LAYER                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /api/partners                /api/partners/upload               │
│  ┌─────────────────┐         ┌─────────────────────┐           │
│  │ POST (Create)   │         │ POST (Upload Logo)  │           │
│  │ PUT (Update)    │         │                     │           │
│  │ DELETE (Remove) │         │ - Validate Type     │           │
│  │                 │         │ - Validate Size     │           │
│  │ Auth Check ✓    │         │ - Upload to Storage │           │
│  │ Admin Check ✓   │         │ - Return URL        │           │
│  └─────────────────┘         │                     │           │
│                               │ Auth Check ✓        │           │
│                               │ Admin Check ✓       │           │
│                               └─────────────────────┘           │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SERVICE LAYER                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  partnerService.ts                                               │
│  ┌───────────────────────────────────────────────────┐          │
│  │                                                     │          │
│  │  getAllPartners()      ─────────────────┐         │          │
│  │  getPartnerById(id)    ─────────────────┤         │          │
│  │  createPartner(data)   ─────────────────┤         │          │
│  │  updatePartner(id, updates) ────────────┤         │          │
│  │  deletePartner(id)     ─────────────────┤         │          │
│  │                                          │         │          │
│  └──────────────────────────────────────────┼─────────┘          │
│                                             │                     │
└─────────────────────────────────────────────┼─────────────────────┘
                                              │
                                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  partners Table                                                  │
│  ┌───────────────────────────────────────────────────┐          │
│  │                                                     │          │
│  │  Columns:                                          │          │
│  │  - id (PRIMARY KEY)                                │          │
│  │  - name (TEXT NOT NULL)                            │          │
│  │  - logo (TEXT NOT NULL) ──────────┐               │          │
│  │  - url (TEXT NOT NULL)             │               │          │
│  │  - created_at (TIMESTAMP)          │               │          │
│  │  - updated_at (TIMESTAMP)          │               │          │
│  │                                     │               │          │
│  │  RLS Policies:                      │               │          │
│  │  - Public: SELECT (read)            │               │          │
│  │  - Authenticated: INSERT/UPDATE/DELETE              │          │
│  │                                     │               │          │
│  └─────────────────────────────────────┼───────────────┘          │
│                                        │                          │
└────────────────────────────────────────┼──────────────────────────┘
                                         │
                                         │ Logo URL References
                                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                    SUPABASE STORAGE                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  mentalmotion Bucket (Public)                                    │
│  ┌───────────────────────────────────────────────────┐          │
│  │                                                     │          │
│  │  /partners/                                        │          │
│  │  ├── 1234567890-company-logo.png                   │          │
│  │  ├── 1234567891-partner-logo.svg                   │          │
│  │  ├── 1234567892-org-logo.jpg                       │          │
│  │  └── ...                                           │          │
│  │                                                     │          │
│  │  Features:                                         │          │
│  │  - Automatic subfolder creation                    │          │
│  │  - Unique timestamped filenames                    │          │
│  │  - Public access for display                       │          │
│  │  - 5MB file size limit                             │          │
│  │                                                     │          │
│  └─────────────────────────────────────────────────────┘          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Request                                                     │
│       │                                                           │
│       ▼                                                           │
│  getCurrentUser()  ──────►  Check if logged in                   │
│       │                           │                               │
│       │                           ▼                               │
│       │                      Authenticated?                       │
│       │                      ┌─────┴─────┐                       │
│       │                      │           │                       │
│       │                   No │           │ Yes                   │
│       │                      ▼           ▼                       │
│       │                  Return       isAdmin()                  │
│       │                  401           │                         │
│       │                                ▼                         │
│       │                          Is Admin?                       │
│       │                          ┌────┴────┐                     │
│       │                          │         │                     │
│       │                       No │         │ Yes                 │
│       │                          ▼         ▼                     │
│       │                      Return    Allow                     │
│       │                      403      Request                    │
│       │                                                           │
└──────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                      DATA FLOW EXAMPLE                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Creating a New Partner:                                         │
│                                                                   │
│  1. Admin fills form in PartnerEditClient                        │
│      │                                                            │
│      ├─► Clicks "Choose File" for logo                          │
│      │   │                                                        │
│      │   ├─► File selected                                       │
│      │   │                                                        │
│      │   ├─► POST /api/partners/upload                           │
│      │   │   ├─► Auth check ✓                                    │
│      │   │   ├─► Validate file type ✓                            │
│      │   │   ├─► Validate file size ✓                            │
│      │   │   ├─► Upload to /partners/ folder                     │
│      │   │   └─► Return public URL                               │
│      │   │                                                        │
│      │   └─► Logo URL set in form                                │
│      │                                                            │
│      ├─► Admin enters name and website URL                       │
│      │                                                            │
│      ├─► Clicks "Create Partner"                                 │
│      │                                                            │
│      ├─► POST /api/partners                                      │
│      │   ├─► Auth check ✓                                        │
│      │   ├─► Admin check ✓                                       │
│      │   ├─► Validate required fields ✓                          │
│      │   ├─► INSERT INTO partners table                          │
│      │   └─► Return created partner                              │
│      │                                                            │
│      └─► Success message displayed                               │
│                                                                   │
│  2. Partner appears in list                                      │
│                                                                   │
│  3. Public page fetches partners                                 │
│      │                                                            │
│      ├─► PartnerLogos component renders                          │
│      │                                                            │
│      ├─► SELECT * FROM partners                                  │
│      │                                                            │
│      └─► Display in grid with logos                              │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                    SECURITY MEASURES                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ✓ Authentication required for all admin operations             │
│  ✓ Admin role verification (ADMIN_EMAILS check)                 │
│  ✓ File type whitelist (JPEG, PNG, GIF, SVG, WebP)              │
│  ✓ File size limit (5MB maximum)                                │
│  ✓ Row Level Security on database table                         │
│  ✓ Parameterized queries (no SQL injection)                     │
│  ✓ URL validation for partner websites                          │
│  ✓ HTTPS enforced for all API calls                             │
│  ✓ CodeQL security scan: 0 alerts                               │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                       FILE STRUCTURE                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  mental-motion/                                                  │
│  │                                                                │
│  ├── app/                                                        │
│  │   ├── admin/                                                  │
│  │   │   └── partners/                                           │
│  │   │       └── page.tsx              [Server Component]       │
│  │   │                                                            │
│  │   └── api/                                                    │
│  │       └── partners/                                           │
│  │           ├── route.ts              [POST, PUT, DELETE]       │
│  │           └── upload/                                         │
│  │               └── route.ts          [POST - File Upload]      │
│  │                                                                │
│  ├── src/                                                        │
│  │   ├── services/                                               │
│  │   │   └── partnerService.ts         [CRUD Operations]        │
│  │   │                                                            │
│  │   └── components/                                             │
│  │       ├── PartnerEditClient.tsx     [Admin UI]               │
│  │       └── PartnerLogos.tsx          [Public Display]         │
│  │                                                                │
│  ├── PARTNERS_QUICK_START.md           [User Guide]             │
│  ├── PARTNERS_GUIDE.md                 [Complete Docs]          │
│  ├── IMPLEMENTATION_SUMMARY_PARTNERS.md [Technical Summary]      │
│  └── SUPABASE_SETUP.md                 [Updated with Schema]    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘


Legend:
  ──►  Data flow
  │    Connection
  ✓    Security check
  ┌─┐  Component/Module
  └─┘  boundary
```

## Component Interactions

### Admin Workflow
1. Admin logs in → `/admin/login`
2. Navigates to → `/admin/partners`
3. Server checks authentication & admin status
4. PartnerEditClient renders with partner list
5. Admin creates/edits/deletes partners
6. Changes persisted to Supabase database
7. Logo files stored in Supabase Storage

### Public Display Workflow
1. Page imports PartnerLogos component
2. Component fetches partners from database (server-side)
3. Renders responsive grid with logos
4. Users click logos → navigate to partner websites
5. No authentication required for viewing

### Upload Workflow
1. File selected in UI
2. Validated client-side (type, size)
3. Sent to `/api/partners/upload`
4. Server validates again
5. Uploaded to `mentalmotion/partners/` bucket
6. Public URL returned
7. URL stored in partner record

## Key Design Decisions

1. **Service Layer Pattern**: Clean separation of concerns, easy to test
2. **Server Components**: Faster initial page loads, better SEO
3. **Client Components**: Interactive forms, real-time updates
4. **Storage Organization**: `/partners` subfolder for easy management
5. **RLS Policies**: Database-level security for data protection
6. **Reusable Components**: PartnerLogos can be used anywhere
7. **Comprehensive Docs**: Three-tier documentation (quick/complete/technical)

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: DaisyUI, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Security**: Row Level Security, CodeQL
