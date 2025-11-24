# Email Service Implementation - Quick Start Guide

## What Was Built

A complete, production-ready email notification system for Mental Motion using Resend's free tier.

## Quick Setup (5 minutes)

### 1. Create Resend Account
1. Go to https://resend.com/signup
2. Sign up (no credit card required)
3. Verify your email

### 2. Get API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it "Mental Motion"
4. Copy the key (starts with `re_`)

### 3. Configure Application
1. Add to your `.env.local` file:
   ```bash
   RESEND_API_KEY=re_your_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

### 4. Test It
1. Start dev server: `npm run dev`
2. Register for an event or subscribe to newsletter
3. Check your email!

## What Gets Sent

### Event Registration
When someone registers for an event, they receive:
- Confirmation email with event details
- Event date, time, and location
- Professional HTML email in Dutch

### Newsletter Subscription
When someone subscribes to newsletters, they receive:
- Welcome email
- List of newsletters they subscribed to
- Professional HTML email in Dutch

## Features

✅ **Free**: 3,000 emails/month, 100/day  
✅ **Secure**: XSS protection, no public API  
✅ **Reliable**: Error handling, graceful fallback  
✅ **Professional**: Styled HTML + plain text  
✅ **Dutch**: All content in Dutch  

## Production Setup (Optional)

For production, verify your own domain:

1. Go to https://resend.com/domains
2. Add your domain (e.g., `mentalmotion.nl`)
3. Add DNS records (provided by Resend)
4. Update `.env.local`:
   ```bash
   RESEND_FROM_EMAIL=noreply@mentalmotion.nl
   ```

## Need Help?

See full documentation in `RESEND_SETUP.md`

## Technical Details

- **Email Service**: `src/services/emailService.ts`
- **Event Integration**: `app/api/events/register/route.ts`
- **Newsletter Integration**: `app/api/newsletter/route.ts`
- **Dependencies**: resend, react-email, @react-email/components

## Security

- ✅ All user inputs sanitized (XSS protection)
- ✅ No public email sending endpoint
- ✅ Input validation on all fields
- ✅ CodeQL security scan: Clean
- ✅ Code review: All issues addressed

---

**Ready to use!** Just add your Resend API key and start sending emails.
