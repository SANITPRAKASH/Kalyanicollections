import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const search = searchParams.get('search')
    const categories = searchParams.get('categories')?.split(',') || []
    const subcategories = searchParams.get('subcategories')?.split(',') || []
    const colors = searchParams.get('colors')?.split(',') || []
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '50000')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const featured = searchParams.get('featured') === 'true'

    // Build where clause
    const where: any = {
      available: true,
    }

    // Search
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ]
    }

    // Categories
    if (categories.length > 0) {
      where.category = {
        slug: { in: categories }
      }
    }

    // Subcategories
    if (subcategories.length > 0) {
      where.subcategory = {
        slug: { in: subcategories }
      }
    }

    // Colors (for SQLite, we'll search in the JSON string)
    if (colors.length > 0) {
      where.OR = where.OR || []
      colors.forEach(color => {
        where.OR.push({
          colors: {
            contains: color
          }
        })
      })
    }

    // Price range
    if (minPrice > 0 || maxPrice < 50000) {
      where.price = {
        gte: minPrice,
        lte: maxPrice,
      }
    }

    // Featured
    if (featured) {
      where.featured = true
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' }
    
    switch (sortBy) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          }
        },
        subcategory: {
          select: {
            name: true,
            slug: true,
          }
        }
      }
    })

    // Get total count for pagination
    const total = await prisma.product.count({ where })

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kalyani-house-secret-2025-super-secure') as any
    
    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true }
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      images,
      colors,
      sizes,
      categoryId,
      subcategoryId,
      featured,
      available,
      stock,
      sku,
      tags,
    } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        colors,
        sizes,
        categoryId,
        subcategoryId: subcategoryId || null,
        featured: featured || false,
        available: available !== false,
        stock: stock || 0,
        sku: sku || null,
        tags,
      },
      include: {
        category: true,
        subcategory: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
