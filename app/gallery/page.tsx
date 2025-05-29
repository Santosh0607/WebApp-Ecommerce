'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiShare2, FiEye, FiShoppingCart } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const galleryDesigns = [
  {
    id: 1,
    name: 'Minimalist Logo Design',
    designer: 'Alex Chen',
    category: 'Logo',
    likes: 245,
    views: 1250,
    image: '/api/placeholder/300/300',
    description: 'Clean and modern logo design perfect for any business'
  },
  {
    id: 2,
    name: 'Abstract Art Print',
    designer: 'Maria Rodriguez',
    category: 'Art',
    likes: 189,
    views: 890,
    image: '/api/placeholder/300/300',
    description: 'Vibrant abstract pattern with bold colors'
  },
  {
    id: 3,
    name: 'Typography Quote',
    designer: 'David Kim',
    category: 'Typography',
    likes: 156,
    views: 672,
    image: '/api/placeholder/300/300',
    description: 'Inspirational quote with beautiful typography'
  },
  {
    id: 4,
    name: 'Nature Photography',
    designer: 'Sarah Johnson',
    category: 'Photography',
    likes: 298,
    views: 1456,
    image: '/api/placeholder/300/300',
    description: 'Stunning landscape photography print'
  },
  {
    id: 5,
    name: 'Geometric Pattern',
    designer: 'Michael Brown',
    category: 'Pattern',
    likes: 134,
    views: 578,
    image: '/api/placeholder/300/300',
    description: 'Modern geometric pattern design'
  },
  {
    id: 6,
    name: 'Vintage Illustration',
    designer: 'Emily Davis',
    category: 'Illustration',
    likes: 267,
    views: 1123,
    image: '/api/placeholder/300/300',
    description: 'Classic vintage-style illustration'
  },
  {
    id: 7,
    name: 'Sports Team Logo',
    designer: 'Chris Wilson',
    category: 'Sports',
    likes: 312,
    views: 1876,
    image: '/api/placeholder/300/300',
    description: 'Dynamic sports team logo design'
  },
  {
    id: 8,
    name: 'Floral Design',
    designer: 'Lisa Anderson',
    category: 'Nature',
    likes: 203,
    views: 945,
    image: '/api/placeholder/300/300',
    description: 'Beautiful floral pattern design'
  }
]

const categories = ['All', 'Logo', 'Art', 'Typography', 'Photography', 'Pattern', 'Illustration', 'Sports', 'Nature']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [likedDesigns, setLikedDesigns] = useState<number[]>([])

  const filteredDesigns = selectedCategory === 'All' 
    ? galleryDesigns 
    : galleryDesigns.filter(design => design.category === selectedCategory)

  const toggleLike = (designId: number) => {
    setLikedDesigns(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
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
                Design Gallery
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Explore amazing T-shirt designs created by our community. Get inspired and create your own!
              </p>
              <Link
                href="/design"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Start Designing
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Design Image</span>
                    </div>
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <button
                      onClick={() => toggleLike(design.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedDesigns.includes(design.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <FiHeart className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
                      <FiShare2 className="h-5 w-5" />
                    </button>
                    <Link
                      href={`/design?template=${design.id}`}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <FiShoppingCart className="h-5 w-5" />
                    </Link>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {design.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{design.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {design.designer}</p>
                  <p className="text-sm text-gray-500 mb-3">{design.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <FiHeart className="h-4 w-4" />
                        <span>{design.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiEye className="h-4 w-4" />
                        <span>{design.views}</span>
                      </div>
                    </div>
                    <Link
                      href={`/design?template=${design.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Design?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who have already designed amazing T-shirts with our easy-to-use design studio.
            </p>
            <Link
              href="/design"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Start Creating Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 