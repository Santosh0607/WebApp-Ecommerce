'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const tshirtTypes = [
  { id: 'round-neck', name: 'Round Neck', price: 499 },
  { id: 'v-neck', name: 'V-Neck', price: 549 },
  { id: 'collar', name: 'Polo Collar', price: 699 },
  { id: 'long-sleeve', name: 'Long Sleeve', price: 649 },
  { id: 'oversize', name: 'Oversize', price: 599 },
  { id: 'crop', name: 'Crop Top', price: 449 },
]

const popularColors = [
  { id: 'red', name: 'Classic Red', hex: '#dc2626' },
  { id: 'ruddy', name: 'Ruddy', hex: '#ea5a3d' },
  { id: 'black', name: 'Midnight Black', hex: '#000000' },
  { id: 'white', name: 'Pure White', hex: '#ffffff' },
  { id: 'navy', name: 'Navy Blue', hex: '#1e3a8a' },
  { id: 'gray', name: 'Cool Gray', hex: '#6b7280' },
  { id: 'green', name: 'Forest Green', hex: '#16a34a' },
  { id: 'yellow', name: 'Sunny Yellow', hex: '#facc15' },
  { id: 'purple', name: 'Royal Purple', hex: '#9333ea' },
  { id: 'pink', name: 'Blush Pink', hex: '#f472b6' },
]

export default function ProductShowcase() {
  const [selectedType, setSelectedType] = useState(tshirtTypes[0])
  const [selectedColor, setSelectedColor] = useState(popularColors[0])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-primary-600">Collection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from a variety of styles and colors to create your perfect custom t-shirt
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedType.id}-${selectedColor.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  {/* T-Shirt SVG */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-3/4 h-3/4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50 60 L50 40 Q50 30 60 30 L80 30 Q85 20 100 20 Q115 20 120 30 L140 30 Q150 30 150 40 L150 60 L130 70 L130 150 Q130 160 120 160 L80 160 Q70 160 70 150 L70 70 Z"
                      fill={selectedColor.hex}
                      opacity="0.9"
                    />
                    {/* Collar variations */}
                    {selectedType.id === 'v-neck' && (
                      <path
                        d="M85 20 L100 35 L115 20"
                        fill="none"
                        stroke={selectedColor.hex}
                        strokeWidth="3"
                      />
                    )}
                    {selectedType.id === 'collar' && (
                      <path
                        d="M80 25 Q100 30 120 25"
                        fill="none"
                        stroke={selectedColor.hex}
                        strokeWidth="4"
                      />
                    )}
                  </svg>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ₹{selectedType.price}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedType.name} - {selectedColor.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  Premium quality cotton t-shirt perfect for custom designs
                </p>
                <Link href="/design">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Customize This T-Shirt
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Selection Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* T-Shirt Types */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tshirtTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-xl font-medium transition-all ${
                      selectedType.id === type.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                  >
                    {type.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pick Color</h3>
              <div className="grid grid-cols-5 gap-3">
                {popularColors.map((color) => (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-full aspect-square rounded-xl transition-all ${
                      selectedColor.id === color.id
                        ? 'ring-4 ring-primary-600 ring-offset-2'
                        : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg
                          className="w-6 h-6 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Features</h3>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Premium Cotton
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pre-shrunk fabric
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Machine washable
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comfortable fit
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 