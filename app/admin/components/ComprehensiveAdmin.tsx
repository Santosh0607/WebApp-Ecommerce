'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiPlus, FiEdit, 
  FiTrash2, FiEye, FiSettings, FiImage, FiFileText, FiSave, FiUpload,
  FiBarChart, FiPackage, FiGrid, FiInfo, FiTag, FiStar, FiHeart,
  FiTarget, FiAward, FiUser, FiCalendar, FiMail, FiPhone,
  FiMapPin, FiGlobe, FiFacebook, FiInstagram, FiTwitter
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import EditModals from './EditModals'
import Logo from '../../components/Logo'

interface AdminData {
  stats: any
  users: any[]
  products: any[]
  categories: any[]
  tshirtImages: any[]
  heroContent: any
  siteSettings: any
  aboutContent: any
}

export default function ComprehensiveAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data, setData] = useState<AdminData>({
    stats: null, users: [], products: [], categories: [], tshirtImages: [],
    heroContent: null, siteSettings: null, aboutContent: null
  })
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false)
  const [editModalType, setEditModalType] = useState('')
  const [editingItem, setEditingItem] = useState<any>(null)

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, users, products, categories, tshirts, hero, settings, about] = await Promise.all([
          fetch('/api/analytics/stats').then(r => r.json()),
          fetch('/api/admin/users').then(r => r.json()),
          fetch('/api/admin/products').then(r => r.json()),
          fetch('/api/admin/categories').then(r => r.json()),
          fetch('/api/admin/tshirt-images').then(r => r.json()),
          fetch('/api/content/hero').then(r => r.json()),
          fetch('/api/content/site-settings').then(r => r.json()),
          fetch('/api/content/about').then(r => r.json())
        ])

        setData({
          stats: stats.error ? null : stats,
          users: users.error ? [] : users,
          products: products.error ? [] : products,
          categories: categories.error ? [] : categories,
          tshirtImages: tshirts.error ? [] : tshirts,
          heroContent: hero.error ? null : hero,
          siteSettings: settings.error ? null : settings,
          aboutContent: about.error ? null : about
        })
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Save functions
  const saveContent = async (endpoint: string, content: any, successMsg: string) => {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      if (response.ok) {
        toast.success(successMsg)
        setEditMode(false)
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      toast.error('Error saving')
    }
  }

  // CRUD operations
  const deleteUser = async (userId: string) => {
    if (!confirm('Delete user and all their data?')) return
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (response.ok) {
        setData(prev => ({ ...prev, users: prev.users.filter(u => u.id !== userId) }))
        toast.success('User deleted successfully!')
      }
    } catch (error) {
      toast.error('Error deleting user')
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Delete product and all variants?')) return
    try {
      const response = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
      if (response.ok) {
        setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) }))
        toast.success('Product deleted!')
      }
    } catch (error) {
      toast.error('Error deleting product')
    }
  }

  const deleteCategory = async (categoryId: string) => {
    if (!confirm('Delete category?')) return
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, { method: 'DELETE' })
      if (response.ok) {
        setData(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== categoryId) }))
        toast.success('Category deleted!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete category')
      }
    } catch (error) {
      toast.error('Error deleting category')
    }
  }

  const deleteTshirtImage = async (imageId: string) => {
    if (!confirm('Delete T-shirt image?')) return
    try {
      const response = await fetch(`/api/admin/tshirt-images/${imageId}`, { method: 'DELETE' })
      if (response.ok) {
        setData(prev => ({ ...prev, tshirtImages: prev.tshirtImages.filter(t => t.id !== imageId) }))
        toast.success('T-shirt image deleted!')
      }
    } catch (error) {
      toast.error('Error deleting T-shirt image')
    }
  }

  // Edit functions
  const openEditModal = (type: string, item?: any) => {
    setEditModalType(type)
    setEditingItem(item)
    setShowEditModal(true)
  }

  const handleSaveEdit = async (formData: any) => {
    try {
      const isNew = !editingItem?.id
      let endpoint = ''
      let method = isNew ? 'POST' : 'PUT'

      switch (editModalType) {
        case 'product':
          endpoint = isNew ? '/api/admin/products' : `/api/admin/products/${editingItem.id}`
          break
        case 'category':
          endpoint = isNew ? '/api/admin/categories' : `/api/admin/categories/${editingItem.id}`
          break
        case 'tshirt':
          endpoint = isNew ? '/api/admin/tshirt-images' : `/api/admin/tshirt-images/${editingItem.id}`
          break
        case 'user':
          endpoint = isNew ? '/api/admin/users' : `/api/admin/users/${editingItem.id}`
          break
      }

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedItem = await response.json()
        
        // Update local state
        switch (editModalType) {
          case 'product':
            if (isNew) {
              setData(prev => ({ ...prev, products: [savedItem, ...prev.products] }))
            } else {
              setData(prev => ({ ...prev, products: prev.products.map(p => p.id === editingItem.id ? savedItem : p) }))
            }
            break
          case 'category':
            if (isNew) {
              setData(prev => ({ ...prev, categories: [savedItem, ...prev.categories] }))
            } else {
              setData(prev => ({ ...prev, categories: prev.categories.map(c => c.id === editingItem.id ? savedItem : c) }))
            }
            break
          case 'tshirt':
            if (isNew) {
              setData(prev => ({ ...prev, tshirtImages: [savedItem, ...prev.tshirtImages] }))
            } else {
              setData(prev => ({ ...prev, tshirtImages: prev.tshirtImages.map(t => t.id === editingItem.id ? savedItem : t) }))
            }
            break
          case 'user':
            if (isNew) {
              setData(prev => ({ ...prev, users: [savedItem, ...prev.users] }))
            } else {
              setData(prev => ({ ...prev, users: prev.users.map(u => u.id === editingItem.id ? savedItem : u) }))
            }
            break
        }

        setShowEditModal(false)
        setEditingItem(null)
        toast.success(`${editModalType} ${isNew ? 'created' : 'updated'} successfully!`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save')
      }
    } catch (error) {
      toast.error('Error saving')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 font-medium">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart, color: 'blue' },
    { id: 'users', label: 'Users', icon: FiUsers, color: 'green' },
    { id: 'products', label: 'Products', icon: FiPackage, color: 'purple' },
    { id: 'categories', label: 'Categories', icon: FiGrid, color: 'orange' },
    { id: 'tshirts', label: 'T-Shirt Images', icon: FiImage, color: 'pink' },
    { id: 'hero', label: 'Hero Section', icon: FiStar, color: 'yellow' },
    { id: 'about', label: 'About & Team', icon: FiInfo, color: 'indigo' },
    { id: 'settings', label: 'Site Settings', icon: FiSettings, color: 'gray' },
  ]

  const renderDashboard = () => {
    const stats = data.stats ? [
      { icon: FiUsers, label: 'Total Users', value: data.stats.users.totalUsers, change: '+12%', color: 'blue' },
      { icon: FiShoppingBag, label: 'Orders', value: data.stats.orders.totalOrders, change: '+8%', color: 'green' },
      { icon: FiDollarSign, label: 'Revenue', value: `NPR ${data.stats.orders.totalRevenue.toLocaleString()}`, change: '+15%', color: 'purple' },
      { icon: FiPackage, label: 'Products', value: data.stats.products.activeProducts, change: '+3%', color: 'orange' }
    ] : []

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 text-${stat.color}-600 font-medium`}>{stat.change}</p>
                </div>
                <div className={`bg-${stat.color}-500 p-4 rounded-xl`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Product', icon: FiPlus, action: () => setActiveTab('products') },
              { label: 'Manage Users', icon: FiUsers, action: () => setActiveTab('users') },
              { label: 'Edit Hero', icon: FiEdit, action: () => setActiveTab('hero') },
              { label: 'Site Settings', icon: FiSettings, action: () => setActiveTab('settings') }
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
              >
                <action.icon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Users</h3>
          <div className="space-y-4">
            {data.users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{user._count.orders} orders</div>
                  <div className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">{data.users.length} total users</div>
          <button 
            onClick={() => openEditModal('user')}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Activity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.phone && <div className="text-xs text-gray-400">{user.phone}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user._count?.orders || 0} orders</div>
                    <div className="text-sm text-gray-500">{user._count?.designs || 0} designs</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openEditModal('user', user)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
        <button 
          onClick={() => openEditModal('product')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {product.category?.name || 'No Category'}
                </span>
                {product.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium">
                    Featured
                  </span>
                )}
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <div>
                  <span className="font-bold">NPR {product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">NPR {product.originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {product.stock}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Variants:</span>
                <span>{product._count?.variants || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="text-sm font-mono">{product.sku}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => openEditModal('product', product)}
                className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteProduct(product.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.products.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first product</p>
          <button
            onClick={() => openEditModal('product')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Add First Product
          </button>
        </div>
      )}
    </div>
  )

  const renderHeroSection = () => {
    if (!data.heroContent) return <div>Loading...</div>

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Hero Section Management</h2>
          <button
            onClick={() => saveContent('/api/content/hero', data.heroContent, 'Hero section updated!')}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FiSave className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Heading</label>
              <input
                type="text"
                value={data.heroContent.heading}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, heading: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subheading</label>
              <input
                type="text"
                value={data.heroContent.subheading}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, subheading: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={data.heroContent.description}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, description: e.target.value }
                }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Count</label>
              <input
                type="text"
                value={data.heroContent.customerCount}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, customerCount: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Count</label>
              <input
                type="text"
                value={data.heroContent.orderCount}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, orderCount: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Satisfaction Rating</label>
              <input
                type="text"
                value={data.heroContent.satisfaction}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, satisfaction: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={data.heroContent.ctaText}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  heroContent: { ...prev.heroContent, ctaText: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAboutSection = () => {
    if (!data.aboutContent) return <div>Loading...</div>

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">About & Team Management</h2>
          <button
            onClick={() => saveContent('/api/content/about', data.aboutContent, 'About content updated!')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FiSave className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiInfo className="w-6 h-6 text-blue-600" />
              Company Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={data.aboutContent.title}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, title: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mission</label>
                <textarea
                  value={data.aboutContent.mission || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, mission: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vision</label>
                <textarea
                  value={data.aboutContent.vision || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, vision: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Founded Year</label>
                  <input
                    type="number"
                    value={data.aboutContent.foundedYear || ''}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      aboutContent: { ...prev.aboutContent, foundedYear: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                  <input
                    type="number"
                    value={data.aboutContent.teamSize || ''}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      aboutContent: { ...prev.aboutContent, teamSize: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Founder Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiUser className="w-6 h-6 text-green-600" />
              Founder Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founder Name</label>
                <input
                  type="text"
                  value={data.aboutContent.founderName || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, founderName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founder Title</label>
                <input
                  type="text"
                  value={data.aboutContent.founderTitle || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, founderTitle: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founder Message</label>
                <textarea
                  value={data.aboutContent.founderMessage || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, founderMessage: e.target.value }
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founder Image URL</label>
                <input
                  type="text"
                  value={data.aboutContent.founderImage || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, founderImage: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* CEO Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiAward className="w-6 h-6 text-purple-600" />
              CEO Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CEO Name</label>
                <input
                  type="text"
                  value={data.aboutContent.ceoName || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, ceoName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CEO Title</label>
                <input
                  type="text"
                  value={data.aboutContent.ceoTitle || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, ceoTitle: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CEO Message</label>
                <textarea
                  value={data.aboutContent.ceoMessage || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, ceoMessage: e.target.value }
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CEO Image URL</label>
                <input
                  type="text"
                  value={data.aboutContent.ceoImage || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, ceoImage: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiFileText className="w-6 h-6 text-orange-600" />
              Additional Content
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Team Description</label>
                <textarea
                  value={data.aboutContent.teamDescription || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, teamDescription: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company History</label>
                <textarea
                  value={data.aboutContent.historyText || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, historyText: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Achievements</label>
                <textarea
                  value={data.aboutContent.achievementsText || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    aboutContent: { ...prev.aboutContent, achievementsText: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSettings = () => {
    if (!data.siteSettings) return <div>Loading...</div>

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Site Settings</h2>
          <button
            onClick={() => saveContent('/api/content/site-settings', data.siteSettings, 'Settings updated!')}
            className="bg-gradient-to-r from-gray-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FiSave className="w-5 h-5" />
            Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiGlobe className="w-6 h-6 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={data.siteSettings.siteName}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, siteName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.siteSettings.tagline}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, tagline: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={data.siteSettings.description || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, description: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiPhone className="w-6 h-6 text-green-600" />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={data.siteSettings.email}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, email: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={data.siteSettings.phone}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  value={data.siteSettings.address}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, address: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiFacebook className="w-6 h-6 text-blue-600" />
              Social Media
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
                <input
                  type="text"
                  value={data.siteSettings.facebook || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, facebook: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={data.siteSettings.instagram || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, instagram: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter URL</label>
                <input
                  type="text"
                  value={data.siteSettings.twitter || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    siteSettings: { ...prev.siteSettings, twitter: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Category Management</h2>
        <button 
          onClick={() => openEditModal('category')}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description || 'No description'}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {category.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Products:</span>
                <span className="font-medium">{category._count?.products || 0}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => openEditModal('category', category)}
                className="flex-1 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteCategory(category.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.categories.length === 0 && (
        <div className="text-center py-12">
          <FiGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Categories Yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first category</p>
          <button
            onClick={() => openEditModal('category')}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Add First Category
          </button>
        </div>
      )}
    </div>
  )

  const renderTshirtImages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">T-Shirt Images Management</h2>
        <button 
          onClick={() => openEditModal('tshirt')}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Add T-Shirt Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.tshirtImages.map((tshirt) => (
          <div key={tshirt.id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="mb-4">
              <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden mb-3">
                <img 
                  src={tshirt.url} 
                  alt={tshirt.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/160/160'
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tshirt.name}</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {tshirt.color}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {tshirt.type}
                </span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  tshirt.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tshirt.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order:</span>
                <span className="font-medium">{tshirt.order}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => openEditModal('tshirt', tshirt)}
                className="flex-1 bg-pink-50 text-pink-600 px-4 py-2 rounded-lg font-medium hover:bg-pink-100 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTshirtImage(tshirt.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.tshirtImages.length === 0 && (
        <div className="text-center py-12">
          <FiImage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No T-Shirt Images Yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first T-shirt image</p>
          <button
            onClick={() => openEditModal('tshirt')}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Add First T-Shirt Image
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-2xl border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <Logo 
              size="lg" 
              variant="default" 
              showText={true} 
              animate={true}
              className="mb-2"
            />
            <p className="text-gray-500 mt-2 text-sm font-medium">Complete Management System</p>
          </div>
          
          <nav className="mt-6 px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 mb-2 text-left transition-all duration-200 rounded-xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'hero' && renderHeroSection()}
            {activeTab === 'about' && renderAboutSection()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'categories' && renderCategories()}
            {activeTab === 'tshirts' && renderTshirtImages()}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModals
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        type={editModalType}
        item={editingItem}
        categories={data.categories}
        onSave={handleSaveEdit}
      />
    </div>
  )
} 