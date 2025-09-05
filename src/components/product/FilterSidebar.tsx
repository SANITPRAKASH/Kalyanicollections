'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface FilterState {
  search: string
  categories: string[]
  subcategories: string[]
  priceRange: [number, number]
  colors: string[]
  sortBy: string
  viewMode: 'grid' | 'list'
}

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  onClearFilters: () => void
}

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

const colors = [
  { name: 'Red', value: '#dc2626' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#ffffff' },
  { name: 'Gold', value: '#fbbf24' },
  { name: 'Silver', value: '#9ca3af' },
  { name: 'Maroon', value: '#7c2d12' },
]

export default function FilterSidebar({ filters, onFilterChange, onClearFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categorySlug]
      : filters.categories.filter(c => c !== categorySlug)
    
    onFilterChange({ categories: newCategories })
  }

  const handleSubcategoryChange = (subcategorySlug: string, checked: boolean) => {
    const newSubcategories = checked
      ? [...filters.subcategories, subcategorySlug]
      : filters.subcategories.filter(s => s !== subcategorySlug)
    
    onFilterChange({ subcategories: newSubcategories })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter(c => c !== color)
    
    onFilterChange({ colors: newColors })
  }

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange]
    newRange[index] = value
    onFilterChange({ priceRange: newRange })
  }

  const activeFiltersCount = 
    filters.categories.length + 
    filters.subcategories.length + 
    filters.colors.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-accent-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.slug}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.slug)}
                    onChange={(e) => handleCategoryChange(category.slug, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                </label>
                
                {category.subcategories.length > 0 && filters.categories.includes(category.slug) && (
                  <div className="ml-6 mt-2 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <label key={subcategory.slug} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.subcategories.includes(subcategory.slug)}
                          onChange={(e) => handleSubcategoryChange(subcategory.slug, e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">{subcategory.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 50000)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
            
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
              />
            </div>
            
            <div className="text-sm text-gray-600 text-center">
              ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Colors
          {expandedSections.colors ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.colors && (
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <label key={color.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color.value)}
                  onChange={(e) => handleColorChange(color.value, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-8 h-8 rounded-full border-2 ${
                  filters.colors.includes(color.value) 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-300'
                }`} style={{ backgroundColor: color.value }}>
                  {color.value === '#ffffff' && (
                    <div className="w-full h-full border border-gray-300 rounded-full"></div>
                  )}
                </div>
                <span className="ml-2 text-xs text-gray-600 hidden group-hover:block">
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {categories.find(c => c.slug === category)?.name}
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.subcategories.map((subcategory) => (
              <span
                key={subcategory}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {subcategory}
                <button
                  onClick={() => handleSubcategoryChange(subcategory, false)}
                  className="hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.colors.map((color) => (
              <span
                key={color}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {colors.find(c => c.value === color)?.name}
                <button
                  onClick={() => handleColorChange(color, false)}
                  className="hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
