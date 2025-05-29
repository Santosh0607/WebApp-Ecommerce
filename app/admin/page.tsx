'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSettings } from 'react-icons/fi'
import toast from 'react-hot-toast'
import ComprehensiveAdmin from './components/ComprehensiveAdmin'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === 'admin1' && loginForm.password === 'admin1') {
      setIsAuthenticated(true)
      toast.success('Welcome to SS Admin Pro!')
    } else {
      toast.error('Invalid credentials!')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiSettings className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SS Admin Pro
            </h1>
            <p className="text-gray-600 mt-3">Complete Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In to Admin Panel
            </motion.button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-600 text-center mb-3 font-medium">Demo Credentials:</p>
            <div className="text-center space-y-1">
              <p className="text-sm text-gray-700"><span className="font-semibold">Username:</span> admin1</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Password:</span> admin1</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return <ComprehensiveAdmin />
} 