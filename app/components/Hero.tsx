'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar } from 'react-icons/fi'
import FloatingLogo from './FloatingLogo'

interface HeroData {
  heading: string;
  subheading: string;
  description: string;
  customerCount: string;
  orderCount: string;
  satisfaction: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    heading: "Create Unique T-Shirts Your Way",
    subheading: "Express yourself with custom designs",
    description: "Upload your logo, remove backgrounds with AI, and create stunning t-shirts in minutes. Simple, fast, and beautiful.",
    customerCount: "15,000+",
    orderCount: "25,000+",
    satisfaction: "4.9★",
    ctaText: "Start Designing",
    ctaLink: "/design"
  });

  const [realTimeStats, setRealTimeStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalDesigns: 0
  });

  useEffect(() => {
    // Fetch hero content from database
    fetch('/api/content/hero')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setHeroData(data);
        }
      })
      .catch(error => console.error('Error fetching hero content:', error));

    // Fetch real-time stats
    fetch('/api/analytics/stats')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setRealTimeStats({
            totalUsers: data.users?.totalUsers || 0,
            totalOrders: data.orders?.totalOrders || 0,
            totalDesigns: data.designs?.totalDesigns || 0
          });
        }
      })
      .catch(error => console.error('Error fetching real-time stats:', error));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-ruddy-50 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-ruddy-400 rounded-full blur-3xl"
        />
        
        {/* Floating Logo Decorations */}
        <FloatingLogo 
          size="lg" 
          opacity={0.05} 
          className="top-20 left-10" 
        />
        <FloatingLogo 
          size="md" 
          opacity={0.03} 
          className="top-1/3 right-20" 
        />
        <FloatingLogo 
          size="sm" 
          opacity={0.04} 
          className="bottom-20 left-1/4" 
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <FiStar className="w-4 h-4" />
              <span>{heroData.subheading}</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {heroData.heading.split(' ').map((word, index) => (
                <span key={index} className={
                  word === 'Unique' ? 'text-primary-600' : 
                  word === 'Way' ? 'text-ruddy-600' : ''
                }>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={heroData.ctaLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {heroData.ctaText}
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-50 transition-all duration-200"
                >
                  Browse Collection
                </motion.button>
              </Link>
            </div>

            {/* Real-time Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-3xl font-bold text-primary-600">
                  {realTimeStats.totalUsers > 0 ? `${realTimeStats.totalUsers.toLocaleString()}+` : heroData.customerCount}
                </h3>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-3xl font-bold text-ruddy-600">
                  {realTimeStats.totalOrders > 0 ? `${realTimeStats.totalOrders.toLocaleString()}+` : heroData.orderCount}
                </h3>
                <p className="text-sm text-gray-600">Orders Completed</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-3xl font-bold text-primary-600">{heroData.satisfaction}</h3>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - T-Shirt Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating T-Shirt Cards */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [-5, -5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-10 w-48 h-48 bg-white rounded-2xl shadow-xl p-4 z-10"
              >
                <div className="w-full h-32 bg-primary-100 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Classic Red</p>
                <p className="text-xs text-gray-500">₹499</p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [5, 5, 5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-2xl shadow-xl p-4 z-10"
              >
                <div className="w-full h-32 bg-ruddy-100 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Ruddy Special</p>
                <p className="text-xs text-gray-500">₹599</p>
              </motion.div>

              {/* Main T-Shirt */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-20"
              >
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="aspect-square bg-gradient-to-br from-primary-100 to-ruddy-100 rounded-2xl flex items-center justify-center">
                      <svg
                        viewBox="0 0 200 200"
                        className="w-3/4 h-3/4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* T-Shirt Shape */}
                        <path
                          d="M50 60 L50 40 Q50 30 60 30 L80 30 Q85 20 100 20 Q115 20 120 30 L140 30 Q150 30 150 40 L150 60 L130 70 L130 150 Q130 160 120 160 L80 160 Q70 160 70 150 L70 70 Z"
                          className="fill-primary-500"
                          opacity="0.9"
                        />
                        {/* SS Logo on T-Shirt */}
                        <g transform="translate(100, 90) scale(0.5)">
                          <path
                            d="M0 -30 Q-20 -20 -25 -5 T-20 20 Q-10 35 5 35 Q20 35 30 20 T35 -5 Q30 -20 10 -30 Q5 -32 0 -30 Z"
                            className="fill-white"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-medium text-gray-800">Your Design Here</p>
                      <p className="text-sm text-gray-500">Start creating now</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 