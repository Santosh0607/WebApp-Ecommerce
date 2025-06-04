'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiFilter, FiSearch, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const tshirtStyles = [
  {
    id: 1,
    name: 'Classic Crew Neck',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 324,
    image: '/api/placeholder/300/300',
    colors: ['white', 'black', 'gray', 'navy', 'red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'casual',
    bestseller: true
  },
  {
    id: 2,
    name: 'Premium V-Neck',
    price: 699,
    originalPrice: 899,
    rating: 4.7,
    reviews: 256,
    image: '/api/placeholder/300/300',
    colors: ['white', 'black', 'gray', 'ruddy', 'blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'premium'
  },
  {
    id: 3,
    name: 'Polo Shirt',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 189,
    image: '/api/placeholder/300/300',
    colors: ['white', 'black', 'navy', 'green', 'red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'formal'
  },
  {
    id: 4,
    name: 'Henley Shirt',
    price: 749,
    originalPrice: 999,
    rating: 4.6,
    reviews: 145,
    image: '/api/placeholder/300/300',
    colors: ['white', 'gray', 'maroon', 'navy', 'olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'casual'
  },
  {
    id: 5,
    name: 'Sports Dry-Fit',
    price: 799,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 298,
    image: '/api/placeholder/300/300',
    colors: ['black', 'blue', 'red', 'green', 'orange'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'sports'
  },
  {
    id: 6,
    name: 'Oversized Tee',
    price: 649,
    originalPrice: 849,
    rating: 4.5,
    reviews: 167,
    image: '/api/placeholder/300/300',
    colors: ['white', 'black', 'gray', 'beige', 'pink'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    category: 'trendy',
    trending: true
  }
]

const categories = [
  { id: 'all', name: 'All Products', count: 6 },
  { id: 'casual', name: 'Casual', count: 2 },
  { id: 'premium', name: 'Premium', count: 1 },
  { id: 'formal', name: 'Formal', count: 1 },
  { id: 'sports', name: 'Sports', count: 1 },
  { id: 'trendy', name: 'Trendy', count: 1 }
]

const colors = [
  { name: 'white', hex: '#FFFFFF', border: true },
  { name: 'black', hex: '#000000' },
  { name: 'gray', hex: '#6B7280' },
  { name: 'navy', hex: '#1E40AF' },
  { name: 'red', hex: '#DC2626' },
  { name: 'blue', hex: '#2563EB' },
  { name: 'green', hex: '#059669' },
  { name: 'ruddy', hex: '#EA5A3D' },
  { name: 'maroon', hex: '#7C2D12' },
  { name: 'olive', hex: '#65A30D' }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const { addToCart } = useCart()

  const filteredProducts = tshirtStyles.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b.reviews - a.reviews
    }
  })

  const handleAddToCart = (product: any) => {
    addToCart({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0],
      size: 'M',
      tshirtType: 'Classic',
      quantity: 1
    })
    toast.success('Added to cart!')
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-ruddy-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium T-Shirt Collection
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Discover our range of high-quality, customizable T-shirts perfect for every occasion
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{tshirtStyles.length}+</span> Styles
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">10+</span> Colors
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">6</span> Sizes
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search T-shirts..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">({category.count})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Colors</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color.name)
                            ? 'border-primary-500 scale-110'
                            : color.border
                            ? 'border-gray-300'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sortedProducts.length} Products Found
                  </h2>
                  <p className="text-gray-600">
                    {selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}
                  </p>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">T-Shirt Image</span>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 space-y-1">
                        {product.bestseller && (
                          <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Bestseller
                          </span>
                        )}
                        {product.trending && (
                          <span className="bg-ruddy-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </span>
                        )}
                      </div>

                      {/* Wishlist */}
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100">
                        <FiHeart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Colors */}
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-gray-600 mr-2">Colors:</span>
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 4).map(colorName => {
                            const color = colors.find(c => c.name === colorName)
                            return (
                              <div
                                key={colorName}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color?.hex }}
                                title={colorName}
                              />
                            )
                          })}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Link
                          href={`/design?productId=${product.id}`}
                          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center text-sm font-medium"
                        >
                          Customize
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-2 border border-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors"
                        >
                          <FiShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <FiFilter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 