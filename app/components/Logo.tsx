'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'light' | 'dark'
  showText?: boolean
  animate?: boolean
  className?: string
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  showText = true, 
  animate = true,
  className = '' 
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  const textColors = {
    default: 'text-gray-900',
    light: 'text-white',
    dark: 'text-gray-900'
  }

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full blur-lg opacity-0"
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main Logo - Using actual user image */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden rounded-lg"
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: animate ? [0, 5, -5, 0] : 0,
          }}
          transition={{ 
            duration: 4,
            repeat: animate ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/images/logo/ss-logo.png"
            alt="SS Garment Logo"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>
      </motion.div>
      
      {/* Company Name with Animation */}
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1 
            className={`font-bold leading-tight ${textSizes[size]} ${textColors[variant]}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              SS
            </span>{' '}
            <span className={textColors[variant]}>Garment</span>
          </motion.h1>
          
          {size !== 'sm' && (
            <motion.p 
              className={`text-xs ${variant === 'light' ? 'text-gray-300' : 'text-gray-500'} font-medium`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Custom Design Studio
            </motion.p>
          )}
        </motion.div>
      )}
    </Link>
  )
} 