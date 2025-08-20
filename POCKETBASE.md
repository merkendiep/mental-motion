# PocketBase Setup Guide

This project uses PocketBase as a backend service for database management and real-time features.

## Getting Started with PocketBase

### 1. Start PocketBase Server

```bash
# Start PocketBase only
pnpm run pocketbase

# Or start both PocketBase and Next.js in development
pnpm run pocketbase:dev
```

### 2. Access PocketBase Admin

Once PocketBase is running, you can access the admin interface at:
**http://127.0.0.1:8090/_/**

### 3. Create Admin Account

The first time you access the admin interface, you'll be prompted to create an admin account.

Alternatively, you can create an admin account via CLI:

```bash
pnpm run pocketbase:admin
```

### 4. Setting up Collections

For the newsletter functionality, create a collection called `newsletter_subscriptions` with the following fields:

#### Collection: `newsletter_subscriptions`

- **email** (email, required, unique)
- **newsletters** (json, required) - Array of newsletter types

Example newsletters field value:

```json
["newsletter-1", "newsletter-2", "newsletter-3"]
```

### 5. Environment Variables

Make sure your `.env.local` file contains:

```
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

## PocketBase Features Available

- **Real-time Database**: Automatic syncing of data changes
- **Admin Interface**: Easy database management at `/_/`
- **File Storage**: Built-in file and media storage
- **Authentication**: User management and auth (if needed)
- **API**: RESTful and real-time APIs

## Useful Commands

```bash
# Start PocketBase server
pnpm run pocketbase

# Start both services in development
pnpm run pocketbase:dev

# Create admin user
pnpm run pocketbase:admin
```

## Integration

The PocketBase client is available throughout your Next.js app via:

```typescript
import pb, { newsletterService } from "@/src/lib/pocketbase";
```

Check `/src/lib/pocketbase.ts` for available helper functions and type definitions.
