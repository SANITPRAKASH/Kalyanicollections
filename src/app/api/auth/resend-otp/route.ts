import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateToken } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const storedOTP = await prisma.oTP.findUnique({
      where: { email }
    })

    if (!storedOTP) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    if (storedOTP.otp !== otp) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      )
    }

    if (new Date() > storedOTP.expiresAt) {
      await prisma.oTP.delete({
        where: { email }
      })
      
      return NextResponse.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    await prisma.oTP.delete({
      where: { email }
    })

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verified: true }
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    if (!user.verified) {
      await sendWelcomeEmail(user.email, user.name)
    }

    // ✅ Use Next.js 15 cookies() API - more reliable
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    const response = NextResponse.json({
      message: 'Login successful',
      token, // ✅ Also send token in response for localStorage backup
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

    return response

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}