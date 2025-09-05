import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendOTPEmail(email: string, otp: string, name?: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Pushkara Expressions <noreply@pushkaraexpressions.com>',
    to: email,
    subject: 'Your OTP for Pushkara Expressions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #330847;">Welcome to Pushkara Expressions</h2>
        <p>Hello ${name || 'there'},</p>
        <p>Your OTP for verification is:</p>
        <div style="background-color: #f8cf9c; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #330847; margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Pushkara Expressions - Your trusted boutique for authentic Indian wear
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`OTP email sent to ${email}`)
  } catch (error) {
    console.error('Error sending OTP email:', error)
    throw new Error('Failed to send OTP email')
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Pushkara Expressions <noreply@pushkaraexpressions.com>',
    to: email,
    subject: 'Welcome to Pushkara Expressions!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #330847;">Welcome to Pushkara Expressions!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for joining Pushkara Expressions! We're excited to have you as part of our community.</p>
        <p>Explore our beautiful collection of:</p>
        <ul>
          <li>Elegant Sarees</li>
          <li>Stunning Lehengas</li>
          <li>Comfortable Kurtas & Sets</li>
          <li>Beautiful Dupattas & Shawls</li>
        </ul>
        <p>Visit our store to discover the perfect outfit for your special occasions.</p>
        <p>Happy shopping!</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Pushkara Expressions - Your trusted boutique for authentic Indian wear
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Welcome email sent to ${email}`)
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

export async function sendInquiryEmail(email: string, name: string, productName: string, message: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Pushkara Expressions <noreply@pushkaraexpressions.com>',
    to: email,
    subject: 'Thank you for your inquiry - Pushkara Expressions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #330847;">Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in our product: <strong>${productName}</strong></p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #330847;">
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
        </div>
        <p>In the meantime, feel free to explore our other beautiful collections.</p>
        <p>Best regards,<br>Pushkara Expressions Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Pushkara Expressions - Your trusted boutique for authentic Indian wear
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Inquiry confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Error sending inquiry email:', error)
  }
}
