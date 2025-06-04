'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiImage, FiShare2, FiDownload, FiEdit3, FiZap } from 'react-icons/fi'

const features = [
  {
    icon: FiUpload,
    title: 'Easy Upload',
    description: 'Upload your images or logos directly to our design studio with drag and drop simplicity.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: FiZap,
    title: 'AI Background Removal',
    description: 'Remove backgrounds instantly with our AI-powered tool. One click, perfect results.',
    color: 'bg-ruddy-100 text-ruddy-600',
  },
  {
    icon: FiEdit3,
    title: 'Intuitive Editor',
    description: 'Resize, rotate, and position your designs with our simple and powerful editor.',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: FiImage,
    title: 'Multiple Options',
    description: 'Choose from 6 t-shirt styles and 10 trendy colors that boys love.',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: FiShare2,
    title: 'Easy Sharing',
    description: 'Share your designs with friends via unique links. Get feedback instantly.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: FiDownload,
    title: 'High-Quality Export',
    description: 'Download your designs in high resolution for printing or sharing online.',
    color: 'bg-ruddy-100 text-ruddy-600',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-primary-600">SS Garment</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create custom t-shirts with our intuitive design tools. 
            Simpler than Canva, more powerful than you&apos;d expect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-ruddy-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Create Your First Design?
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of happy customers who&apos;ve created their perfect custom t-shirts
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Free Design
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 