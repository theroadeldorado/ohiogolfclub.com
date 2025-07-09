'use server';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting - simple in-memory store (for production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every hour
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now > data.resetTime) {
        rateLimitStore.delete(ip);
      }
    }
  },
  60 * 60 * 1000,
);

function getRealIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5; // Max 5 submissions per 15 minutes

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxAttempts) {
    return true;
  }

  record.count++;
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs
    /\b(buy|click|free|win|prize|offer|deal|discount)\b/gi, // Common spam words
    /\b(viagra|casino|lottery|bitcoin|crypto)\b/gi, // More spam words
    /<[^>]*>/g, // HTML tags
    /[^\x00-\x7F]/g, // Non-ASCII characters (adjust based on your needs)
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(text));
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      message,
      subject,
      honeyToken,
      honeypot,
      recipientEmail,
    } = await request.json();

    // Get client IP for rate limiting
    const clientIP = getRealIP(request);

    // Rate limiting check
    if (isRateLimited(clientIP)) {
      console.log(`Rate limited IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 },
      );
    }

    // Honeypot check - if this field is filled, it's likely a bot
    if (honeypot && honeypot.trim() !== '') {
      console.log('Honeypot spam detected and blocked');
      return NextResponse.json({ success: true }); // Don't alert the spammer
    }

    // Email validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 },
      );
    }

    // Content validation for suspicious patterns
    if (containsSuspiciousContent(message) || containsSuspiciousContent(name)) {
      console.log('Suspicious content detected and blocked');
      return NextResponse.json({ success: true }); // Don't alert the spammer
    }

    // Time-based spam check - typically bots fill forms too quickly
    const timeSinceSubmit = Date.now() - parseInt(honeyToken);
    if (timeSinceSubmit < 2000) {
      // If form was filled in less than 2 seconds
      console.log('Fast submission spam detected and blocked');
      return NextResponse.json({ success: true }); // Don't alert the spammer
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });

    // Determine recipient email - use passed email or default to info@ohiogolfclubindoor.com
    const toEmail = recipientEmail || 'info@ohiogolfclubindoor.com';

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@ohiogolfclubindoor.com',
      to: toEmail,
      replyTo: email,
      subject: `Ohio Golf Club Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}
Message: ${message}

This message was sent from the Ohio Golf Club website contact form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ae1b22; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h2 style="margin: 0;">New Message from Ohio Golf Club Website</h2>
    </div>

    <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Subject:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #ae1b22;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <h3 style="color: #ae1b22; margin-bottom: 10px;">Message:</h3>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ae1b22; white-space: pre-wrap;">${message}</div>
      </div>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #666;">
        <p>This message was sent from the Ohio Golf Club website contact form.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Log the form submission (would be email sending in production)
    console.log(`
===== New Contact Form Submission =====
Subject: ${subject}
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}
======================================
    `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 },
    );
  }
}
