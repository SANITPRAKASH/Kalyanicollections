'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { cn } from '@/lib/utils'

const categories = [
  {
    name: 'Sarees',
    slug: 'sarees',
    subcategories: [
      { name: 'Silk', slug: 'silk' },
      { name: 'Cotton', slug: 'cotton' },
      { name: 'Party Wear', slug: 'party-wear' },
    ]
  },
  {
    name: 'Lehengas',
    slug: 'lehengas',
    subcategories: [
      { name: 'Bridal', slug: 'bridal' },
      { name: 'Party', slug: 'party' },
    ]
  },
  {
    name: 'Kurtas & Sets',
    slug: 'kurtas-sets',
    subcategories: [
      { name: 'Kurtis', slug: 'kurtis' },
      { name: 'Anarkalis', slug: 'anarkalis' },
    ]
  },
  {
    name: 'Dupattas & Shawls',
    slug: 'dupattas-shawls',
    subcategories: []
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { getTotalItems, toggleCart } = useCartStore()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-300 to-accent-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">KC</span>
            </div>
            <span className="font-display text-xl font-bold text-accent-900">
              Kalyani Collections
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                pathname === "/" ? "text-primary-600" : "text-gray-700"
              )}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                View Our Products
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <div
                      key={category.slug}
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(category.slug)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {category.name}
                        {category.subcategories.length > 0 && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>

                      {/* Subcategories */}
                      {category.subcategories.length > 0 && hoveredCategory === category.slug && (
                        <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.slug}
                              href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                pathname === "/about" ? "text-primary-600" : "text-gray-700"
              )}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                pathname === "/contact" ? "text-primary-600" : "text-gray-700"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            {isAuthenticated && (
              <Link
  href="/dashboard?tab=cart"
  className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
>
  <ShoppingCart className="w-5 h-5" />
  {getTotalItems() > 0 && (
    <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {getTotalItems()}
    </span>
  )}
</Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Products</div>
                <div className="space-y-1 ml-4">
                  {categories.map((category) => (
                    <div key={category.slug}>
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="block py-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                      {category.subcategories.length > 0 && (
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.slug}
                              href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                              className="block py-1 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
