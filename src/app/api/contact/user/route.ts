import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Get token
    let token = request.cookies.get('auth-token')?.value
    if (!token) {
      const authHeader = request.headers.get('authorization')
      token = authHeader?.replace('Bearer ', '')
    }

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'kalyani-house-secret-2025-super-secure'
    ) as any

    // Get user's email
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { email: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get contact forms for this email
    const contactForms = await prisma.contactForm.findMany({
      where: { email: user.email },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contactForms)
  } catch (error) {
    console.error('Error fetching contact forms:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}