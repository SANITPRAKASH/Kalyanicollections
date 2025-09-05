'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string
  colors: string
  sizes: string
  category: {
    name: string
    slug: string
  }
  subcategory?: {
    name: string
    slug: string
  }
  featured: boolean
  available: boolean
  createdAt: string
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  // Parse JSON strings to arrays
  const images = JSON.parse(product.images || '[]')
  const colors = JSON.parse(product.colors || '[]')
  const sizes = JSON.parse(product.sizes || '[]')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: images[0] || '/images/placeholder.jpg',
      quantity: 1,
      colors: colors,
      sizes: sizes,
    })
  }

  const handleImageHover = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (viewMode === 'list') {
    return (
      <div className="card-hover">
        <div className="flex gap-6 p-6">
          <div className="w-48 h-48 relative overflow-hidden rounded-lg">
            <Image
              src={images[currentImageIndex] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.featured && (
              <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-xl font-semibold text-accent-900 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500">
                  {product.category.name}
                  {product.subcategory && ` • ${product.subcategory.name}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-900">
                  {formatPrice(product.price)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center gap-4">
              {colors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex gap-1">
                    {colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{colors.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="card-hover group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={images[currentImageIndex] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Image thumbnails on hover */}
          {isHovered && images.length > 1 && (
            <div className="absolute bottom-2 left-2 right-2 flex gap-1">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    handleImageHover(index)
                  }}
                  className={`w-8 h-8 rounded border-2 overflow-hidden ${
                    index === currentImageIndex ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.featured && (
              <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
            {!product.available && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Out of Stock
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-accent-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">
              {product.category.name}
              {product.subcategory && ` • ${product.subcategory.name}`}
            </p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-bold text-accent-900">
              {formatPrice(product.price)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>

          {colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex gap-1">
                {colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {colors.length > 4 && (
                  <span className="text-xs text-gray-500">+{colors.length - 4}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
