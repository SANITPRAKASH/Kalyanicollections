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

    // Check if user is authenticated (optional)
    const userId = request.headers.get('x-user-id')

    // Create booking data
    const bookingData: any = {
      name,
      email,
      phone,
      date: new Date(date),
      time,
      message: message || null,
      status: 'pending',
    }

    // Only add user relation if userId exists
    if (userId) {
      bookingData.user = {
        connect: { id: userId }
      }
    } else {
      bookingData.userId = null
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: bookingData
    })

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