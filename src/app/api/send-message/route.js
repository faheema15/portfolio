import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, email, message, source = 'contact-form' } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration environment variables')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter - FIXED: createTransport instead of createTransporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify connection
    try {
      await transporter.verify()
      console.log('SMTP connection verified')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service connection failed' },
        { status: 500 }
      )
    }

    // Email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from Portfolio</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #3b82f6, #8b5cf6);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-left: 4px solid #3b82f6;
              border-radius: 0 5px 5px 0;
            }
            .label {
              font-weight: bold;
              color: #3b82f6;
              margin-bottom: 5px;
            }
            .message-content {
              background: #fff;
              border: 1px solid #e9ecef;
              border-radius: 5px;
              padding: 15px;
              font-style: italic;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .source-badge {
              display: inline-block;
              background: ${source === 'chatbot' ? '#10b981' : '#3b82f6'};
              color: white;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Portfolio Message</h1>
              <span class="source-badge">${source === 'chatbot' ? '🤖 AI Chatbot' : '📧 Contact Form'}</span>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 From:</div>
                <div>${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="message-content">${message}</div>
              </div>
              <div class="field">
                <div class="label">🕐 Received:</div>
                <div>${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio website.</p>
              <p>Reply directly to <strong>${email}</strong> to respond.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New ${source === 'chatbot' ? 'Chatbot' : 'Contact'} Message from ${name}`,
      text: `
        New message from your portfolio:
        
        Name: ${name}
        Email: ${email}
        Source: ${source}
        Message: ${message}
        
        Received: ${new Date().toLocaleString()}
      `,
      html: htmlTemplate,
      replyTo: email
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Return different error messages based on error type
    let errorMessage = 'Failed to send message. Please try again.'
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check email configuration.'
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection failed. Please check your internet connection.'
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network error. Please try again later.'
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}