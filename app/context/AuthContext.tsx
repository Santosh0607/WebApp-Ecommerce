'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const token = Cookies.get('auth_token')
    const userData = Cookies.get('user_data')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        Cookies.remove('auth_token')
        Cookies.remove('user_data')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Temporary login logic - replace with actual API call
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
        }
        
        setUser(mockUser)
        Cookies.set('auth_token', 'mock_token_' + Date.now(), { expires: 7 })
        Cookies.set('user_data', JSON.stringify(mockUser), { expires: 7 })
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Temporary registration logic - replace with actual API call
      if (name && email && password) {
        const mockUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
        }
        
        setUser(mockUser)
        Cookies.set('auth_token', 'mock_token_' + Date.now(), { expires: 7 })
        Cookies.set('user_data', JSON.stringify(mockUser), { expires: 7 })
        return true
      }
      return false
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('auth_token')
    Cookies.remove('user_data')
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 