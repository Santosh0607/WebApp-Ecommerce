'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    if (isLoading) {
      // Simulate loading progress
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            setTimeout(() => {
              onLoadingComplete?.()
            }, 800)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 100)

      // Show logo after a brief delay
      setTimeout(() => setShowLogo(true), 200)

      return () => clearInterval(timer)
    }
  }, [isLoading, onLoadingComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-white via-primary-50 to-purple-100 flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />
          </div>

          {/* Main Content */}
          <div className="relative text-center">
            {/* Logo with Special Entrance Animation */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  className="mb-8"
                >
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Logo 
                      size="xl" 
                      variant="default" 
                      showText={true} 
                      animate={true}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Loading SS Garment
              </h2>
              <p className="text-gray-600">
                Preparing your custom design experience...
              </p>
            </motion.div>

            {/* Animated Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="w-80 max-w-full mx-auto"
            >
              <div className="bg-white/50 rounded-full h-2 overflow-hidden shadow-lg backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-rose-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Percentage */}
              <motion.div 
                className="text-center mt-4 text-lg font-semibold text-gray-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full opacity-20"
                  initial={{ 
                    x: Math.random() * 400 - 200, 
                    y: Math.random() * 400 - 200,
                    scale: 0
                  }}
                  animate={{ 
                    x: Math.random() * 400 - 200, 
                    y: Math.random() * 400 - 200,
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Loading Complete Message */}
            <AnimatePresence>
              {progress >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div className="bg-green-500 text-white px-6 py-2 rounded-full inline-flex items-center gap-2 shadow-lg">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                    />
                    <span className="font-medium">Ready to Create!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 