import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, date, time, message } = await request.json()

    // Validation
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { message: 'Name, email, phone, date, and time are required' },
        { status: 400 }
      )
    }

    // Check if user is authenticated
    const userId = request.headers.get('x-user-id')

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        time,
        message: message || null,
        status: 'pending',
        userId: userId || null,
      }
    })

    // In production, you would send an email confirmation here
    console.log('New booking created:', booking)

    return NextResponse.json({
      message: 'Appointment booked successfully',
      id: booking.id
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user's bookings
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookings })

  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
