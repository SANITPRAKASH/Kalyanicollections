import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateOTP } from '@/lib/auth'
import { sendOTPEmail } from '@/lib/email'

// In production, store OTPs in Redis with expiration
const otpStore = new Map<string, { otp: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validation
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
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

    // Generate new OTP
    const otp = generateOTP()
    
    // Store OTP with 10-minute expiration
    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    })

    // Send OTP email
    await sendOTPEmail(email, otp, user.name)

    return NextResponse.json({
      message: 'OTP resent successfully'
    })

  } catch (error) {
    console.error('Resend OTP error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
