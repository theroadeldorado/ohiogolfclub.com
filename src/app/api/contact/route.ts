'use server';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, subject, honeyToken } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Simple spam check - typically bots fill forms too quickly
    const timeSinceSubmit = Date.now() - parseInt(honeyToken);
    if (timeSinceSubmit < 1500) {
      // If form was filled in less than 1.5 seconds
      console.log('Spam submission detected and blocked');
      // Return success to avoid alerting the spammer
      return NextResponse.json({ success: true });
    }

    // In a production environment, this would be replaced with actual email sending
    // Here's an example of what it would look like:
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'brandon@ohiogolfclub.com',
      replyTo: email,
      subject: `Ohio Golf Club Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>New Message from Ohio Golf Club Website</h2>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
  <p><strong>Message:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);
    */

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
    return NextResponse.json({ error: 'Failed to process your request' }, { status: 500 });
  }
}
