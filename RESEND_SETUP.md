# Resend Email Service Setup Guide

This guide will walk you through setting up the free email service for Mental Motion using Resend.

## Why Resend?

Resend is a modern email API with an excellent free tier:
- ✅ **3,000 emails per month** (free tier)
- ✅ **100 emails per day** (free tier)
- ✅ Simple setup and integration
- ✅ No credit card required for free tier
- ✅ Modern developer-friendly API
- ✅ Built-in email templates support
- ✅ Good deliverability rates

## Step-by-Step Setup

### 1. Create a Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email or GitHub account
3. Verify your email address

### 2. Get Your API Key

1. Once logged in, navigate to **API Keys** in the dashboard: [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Give it a name (e.g., "Mental Motion Production")
4. Select the appropriate permissions:
   - ✅ **Sending access** (required)
   - You can leave other permissions unchecked for now
5. Click **"Add"**
6. **Copy the API key immediately** - you won't be able to see it again!
   - It will look something like: `re_123456789abcdefghijklmnop`

### 3. Configure Your Domain (Optional but Recommended)

For production use, you should verify your domain to improve deliverability and use your own email address.

#### Option A: Use Resend's Testing Domain (Quick Start)
- No setup needed!
- Use `onboarding@resend.dev` as your sender
- Good for testing, but not recommended for production

#### Option B: Verify Your Own Domain (Recommended)
1. Go to **Domains** in the Resend dashboard: [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `mentalmotion.nl`)
4. Follow the instructions to add DNS records to your domain:
   - Add the provided **TXT record** for verification
   - Add the provided **MX records** (if you want to receive emails)
   - Add the provided **DKIM records** for authentication
5. Wait for DNS propagation (can take up to 48 hours, usually much faster)
6. Once verified, you can use emails like `noreply@mentalmotion.nl`

**Note:** You'll need access to your domain's DNS settings (usually through your domain registrar like TransIP, Hostnet, etc.)

### 4. Add Environment Variables

1. Copy `.env.example` to `.env.local` if you haven't already:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Resend API key to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. (Optional) Set a custom sender email:
   ```bash
   RESEND_FROM_EMAIL=noreply@mentalmotion.nl
   ```
   
   If you don't set this, it will default to `onboarding@resend.dev`

### 5. Test the Email Service

#### Test via API Route

You can test the email service by making a POST request to the `/api/email/send` endpoint:

```bash
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello from Mental Motion!</h1><p>This is a test email.</p>"
  }'
```

#### Test Event Registration Email

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to an event page
3. Fill out the registration form
4. Check your email for the confirmation

#### Test Newsletter Subscription Email

1. Navigate to the newsletter subscription page
2. Fill out the form
3. Check your email for the confirmation

## Email Templates

The system currently includes two email templates:

### 1. Event Registration Confirmation
Sent when a user registers for an event. Includes:
- Event title
- Date and time
- Location
- Personal greeting with first name

### 2. Newsletter Subscription Confirmation
Sent when a user subscribes to newsletters. Includes:
- List of newsletters subscribed to
- Welcome message

## Usage Monitoring

Keep an eye on your email usage to stay within the free tier limits:

1. Go to the Resend dashboard: [https://resend.com/overview](https://resend.com/overview)
2. Check the **"Usage"** section to see:
   - Emails sent today
   - Emails sent this month
   - Delivery rates

### Free Tier Limits
- **Daily limit:** 100 emails
- **Monthly limit:** 3,000 emails

If you consistently exceed these limits, consider:
- Upgrading to a paid plan
- Implementing email queuing/batching
- Reducing the frequency of automated emails

## Troubleshooting

### Emails Not Being Sent

1. **Check API Key:** Ensure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check Logs:** Look at your application logs for error messages
3. **Verify Domain:** If using a custom domain, ensure it's verified in Resend
4. **Check Spam Folder:** Confirmation emails might end up in spam initially

### Emails Going to Spam

1. **Verify Your Domain:** Using a verified domain improves deliverability
2. **Set up SPF/DKIM:** These DNS records authenticate your emails
3. **Use a Real Reply-To Address:** Avoid generic no-reply addresses when possible
4. **Test Content:** Avoid spam trigger words in subject lines

### Development Mode

In development mode (when `NODE_ENV=development`), if no API key is configured:
- Emails won't actually be sent
- Email details will be logged to the console instead
- This allows development without setting up Resend

## Security Best Practices

1. **Never commit `.env.local`:** This file contains secrets and is in `.gitignore`
2. **Use Environment Variables:** Never hardcode API keys in your code
3. **Rotate API Keys:** Regularly rotate your API keys
4. **Monitor Usage:** Watch for unusual spikes in email sending
5. **Rate Limiting:** Consider implementing rate limiting for public endpoints

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add the `RESEND_API_KEY` to your deployment platform's environment variables
2. Add `RESEND_FROM_EMAIL` if using a custom domain
3. Test email sending in production
4. Monitor the Resend dashboard for deliverability

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `RESEND_API_KEY` = your API key
   - `RESEND_FROM_EMAIL` = your sender email (optional)
4. Redeploy your application

## Further Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Best Practices](https://resend.com/docs/knowledge-base/best-practices)
- [Resend Status Page](https://status.resend.com/)

## Support

If you need help:
1. Check the [Resend Documentation](https://resend.com/docs)
2. Contact Resend support: [https://resend.com/support](https://resend.com/support)
3. Check the application logs for detailed error messages
