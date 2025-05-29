'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Animated Logo */}
          <Logo 
            size={isScrolled ? 'md' : 'lg'} 
            variant="default" 
            showText={true} 
            animate={true}
            className="transition-all duration-300"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/design"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Design Studio
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            {isAuthenticated && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiSearch className="w-5 h-5 text-gray-700" />
            </button>
            
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {user && user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FiUser className="w-5 h-5 text-gray-700" />
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-5 h-5 text-gray-700" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/design"
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Design Studio
                </Link>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/gallery"
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 