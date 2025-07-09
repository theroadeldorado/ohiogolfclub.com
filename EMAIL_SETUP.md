# Email Setup Guide

## Required Environment Variables

To enable email functionality for the contact form, you need to set up the following environment variables in your `.env.local` file:

### SMTP Configuration

```bash
EMAIL_SERVER_HOST=smtp.your-email-provider.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=your-email@yourdomain.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@ohiogolfclubindoor.com
```

### Recommended for Vercel: Resend

**Resend** is the recommended email service for Vercel deployments. It's built specifically for developers and works perfectly with Next.js:

```bash
# Use Resend (Recommended for Vercel)
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=your-resend-api-key
EMAIL_FROM=noreply@ohiogolfclubindoor.com
```

**Why Resend?**

- Built by the Vercel team specifically for modern web apps
- Generous free tier (3,000 emails/month)
- Excellent deliverability rates
- Simple API and dashboard
- Built-in analytics and monitoring

**Setup Steps:**

1. Go to [resend.com](https://resend.com) and create an account
2. Add your domain `ohiogolfclubindoor.com` and verify it
3. Create an API key in the dashboard
4. Use the API key as your `EMAIL_SERVER_PASSWORD`

### Alternative: Vercel Email Integration

Vercel also supports direct email integration through their dashboard:

1. Go to your project settings in Vercel
2. Navigate to "Integrations"
3. Add email providers like SendGrid, Mailgun, or Postmark
4. These often have special Vercel pricing and simplified setup

### Popular SMTP Providers

#### Gmail

```bash
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=your-gmail@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
```

**Note:** Use App Password, not your regular Gmail password. Enable 2FA first, then generate an App Password.

#### Outlook/Hotmail

```bash
EMAIL_SERVER_HOST=smtp-mail.outlook.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=your-email@outlook.com
EMAIL_SERVER_PASSWORD=your-password
```

#### Custom Domain (cPanel/WHM)

```bash
EMAIL_SERVER_HOST=mail.yourdomain.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=info@ohiogolfclubindoor.com
EMAIL_SERVER_PASSWORD=your-email-password
```

## Default Email Recipients

- **Default recipient:** `info@ohiogolfclubindoor.com` (all contact form emails go here by default)
- **Custom recipients:** You can pass a `recipientEmail` prop to the ContactModal component to send to specific team members

## Spam Prevention Features

The contact form includes multiple spam prevention measures:

1. **Rate Limiting:** Max 5 submissions per IP per 15 minutes
2. **Honeypot Field:** Hidden field that bots typically fill out
3. **Time Validation:** Submissions under 2 seconds are blocked
4. **Email Validation:** Proper email format validation
5. **Content Filtering:** Blocks common spam patterns (URLs, spam keywords)
6. **Input Sanitization:** Prevents malicious content

## Usage Examples

### Default Usage (sends to info@ohiogolfclubindoor.com)

```jsx
<ContactModal isOpen={modalOpen} onClose={closeModal} subject="Contact Us" />
```

### Send to Specific Email

```jsx
<ContactModal
  isOpen={modalOpen}
  onClose={closeModal}
  subject="Brandon - Private Lessons"
  recipientEmail="brandon@ohiogolfclubindoor.com"
/>
```

## Testing

1. Set up your environment variables
2. Test with a legitimate form submission
3. Check spam filtering by:
   - Submitting too quickly (should be blocked)
   - Including URLs in the message (should be blocked)
   - Submitting multiple times rapidly (should be rate limited)

## Vercel Environment Variables

Since you're hosted on Vercel, you need to add your environment variables in two places:

### 1. Local Development (.env.local)

Create a `.env.local` file in your project root:

```bash
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=your-resend-api-key
EMAIL_FROM=noreply@ohiogolfclubindoor.com
```

### 2. Vercel Dashboard (Production)

1. Go to your project in the Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the same names and values
4. Make sure to select the appropriate environments (Production, Preview, Development)

**Important:** After adding environment variables to Vercel, you need to redeploy your application for them to take effect.

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords for Gmail instead of regular passwords
- **Recommended:** Use Resend for Vercel deployments for best performance and deliverability
- Monitor email logs for suspicious activity
- Store sensitive API keys in Vercel's secure environment variables, not in your code
