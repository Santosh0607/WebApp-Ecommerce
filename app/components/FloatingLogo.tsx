'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FloatingLogoProps {
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
  className?: string
}

export default function FloatingLogo({ 
  size = 'md', 
  opacity = 0.1, 
  className = '' 
}: FloatingLogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  }

  return (
    <motion.div 
      className={`absolute pointer-events-none ${sizeClasses[size]} ${className}`}
      style={{ opacity }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/logo/ss-logo.png"
          alt="SS Garment Logo"
          fill
          className="object-contain"
        />
      </div>
    </motion.div>
  )
} 