import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateToken } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

// In production, store OTPs in Redis with expiration
const otpStore = new Map<string, { otp: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    // Validation
    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Check OTP (in production, verify from Redis)
    const storedOTP = otpStore.get(email)
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expires) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    // Clear OTP
    otpStore.delete(email)

    // Update user verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verified: true }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    // Send welcome email for new registrations
    if (!user.verified) {
      await sendWelcomeEmail(user.email, user.name)
    }

    // Set cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        verified: updatedUser.verified
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
