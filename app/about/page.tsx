'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiTruck, FiShield } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const stats = [
  { icon: FiUsers, label: 'Happy Customers', value: '15,000+' },
  { icon: FiTruck, label: 'Orders Delivered', value: '25,000+' },
  { icon: FiAward, label: 'Design Awards', value: '8+' },
  { icon: FiShield, label: 'Years Experience', value: '5+' }
]

const values = [
  {
    title: 'Quality First',
    description: 'We use only premium materials and printing techniques to ensure your designs look amazing and last long.',
    icon: FiAward
  },
  {
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We provide excellent support and hassle-free returns.',
    icon: FiUsers
  },
  {
    title: 'Fast Delivery',
    description: 'Quick production and shipping to get your custom T-shirts to you as fast as possible.',
    icon: FiTruck
  },
  {
    title: 'Secure & Safe',
    description: 'Your designs and personal information are protected with industry-leading security.',
    icon: FiShield
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-ruddy-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About SS Garment
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                We're on a mission to revolutionize custom T-shirt design in Nepal. Located in the beautiful 
                city of Pokhara, we combine traditional Nepali craftsmanship with modern technology to create 
                unique, high-quality apparel that tells your story.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    SS Garment was born from a vision to bring world-class custom T-shirt design capabilities 
                    to Nepal. Founded in the heart of Pokhara, we saw an opportunity to blend the rich textile 
                    traditions of our beautiful country with cutting-edge design technology.
                  </p>
                  <p>
                    What started as a passion project to serve the local creative community has grown into a 
                    platform that empowers thousands of Nepalis and international customers to express their 
                    creativity through custom apparel. We take pride in supporting local artisans while embracing 
                    innovations like AI-powered design tools.
                  </p>
                  <p>
                    Today, from our base in Pokhara Bastolathar, we're building the future of custom apparel 
                    in South Asia. Our commitment to quality, sustainability, and fair trade practices reflects 
                    our Nepali values while serving customers across the region and beyond.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-ruddy-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Studio</h3>
                    <p className="text-gray-600">Professional design tools at your fingertips</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at SS Garment.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-primary-600 rounded-full mb-4 shadow-lg">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-ruddy-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have brought their ideas to life with SS Garment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/design"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Designing
                </Link>
                <Link
                  href="/products"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 