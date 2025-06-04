'use client'

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import ProductShowcase from './components/ProductShowcase'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loading for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <Hero />
        <Features />
        <ProductShowcase />
        <Footer />
      </main>
    </>
  )
} 