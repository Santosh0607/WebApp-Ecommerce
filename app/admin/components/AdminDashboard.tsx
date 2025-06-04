'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiPlus, FiEdit, 
  FiTrash2, FiEye, FiSettings, FiImage, FiFileText, FiMail, FiPhone,
  FiMapPin, FiSave, FiUpload, FiLayout, FiBarChart, FiPackage,
  FiShoppingCart, FiCalendar, FiClock, FiX, FiTag, FiGrid,
  FiHeart, FiStar, FiTarget, FiAward, FiUsers as FiTeam, FiInfo
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface Stats {
  users: { totalUsers: number; activeUsers: number; newUsersThisMonth: number; };
  orders: { totalOrders: number; completedOrders: number; pendingOrders: number; totalRevenue: number; ordersThisMonth: number; };
  designs: { totalDesigns: number; publicDesigns: number; templateDesigns: number; };
  products: { totalProducts: number; activeProducts: number; outOfStock: number; };
}

interface User {
  id: string; name: string; email: string; phone?: string; role: string; status: string;
  createdAt: string; lastLogin?: string; orders: any[]; designs: any[];
  _count: { orders: number; designs: number; reviews: number; };
}

interface Product {
  id: string; name: string; description?: string; price: number; originalPrice?: number;
  stock: number; sku: string; active: boolean; featured: boolean; tags: string[];
  category: { id: string; name: string; }; variants: any[]; _count: { variants: number; orderItems: number; };
}

interface Category {
  id: string; name: string; description?: string; active: boolean;
  _count: { products: number; };
}

interface TshirtImage {
  id: string; name: string; url: string; color: string; type: string;
  active: boolean; order: number;
}

interface HeroContent {
  id: string; heading: string; subheading: string; description: string;
  customerCount: string; orderCount: string; satisfaction: string;
  ctaText: string; ctaLink: string;
}

interface SiteSettings {
  id: string; siteName: string; tagline: string; description?: string;
  address: string; phone: string; email: string; facebook?: string;
  instagram?: string; twitter?: string;
}

interface AboutContent {
  id: string; title: string; content: string; mission?: string; vision?: string;
  values: string[]; founderName?: string; founderTitle?: string; founderMessage?: string;
  founderImage?: string; ceoName?: string; ceoTitle?: string; ceoMessage?: string;
  ceoImage?: string; foundedYear?: number; teamSize?: number; teamDescription?: string;
  historyText?: string; achievementsText?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tshirtImages, setTshirtImages] = useState<TshirtImage[]>([])
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState<any>(null)

  // Form states
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: 0, originalPrice: 0, stock: 0,
    sku: '', active: true, featured: false, tags: [], categoryId: ''
  })
  const [categoryForm, setCategoryForm] = useState({
    name: '', description: '', active: true
  })
  const [tshirtForm, setTshirtForm] = useState({
    name: '', url: '', color: 'black', type: 'round-neck', active: true, order: 0
  })

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [statsRes, usersRes, productsRes, categoriesRes, tshirtRes, heroRes, siteRes, aboutRes] = await Promise.all([
          fetch('/api/analytics/stats'),
          fetch('/api/admin/users'),
          fetch('/api/admin/products'),
          fetch('/api/admin/categories'),
          fetch('/api/admin/tshirt-images'),
          fetch('/api/content/hero'),
          fetch('/api/content/site-settings'),
          fetch('/api/content/about')
        ])

        const [statsData, usersData, productsData, categoriesData, tshirtData, heroData, siteData, aboutData] = await Promise.all([
          statsRes.json(), usersRes.json(), productsRes.json(), categoriesRes.json(),
          tshirtRes.json(), heroRes.json(), siteRes.json(), aboutRes.json()
        ])

        if (!statsData.error) setStats(statsData)
        if (!usersData.error) setUsers(usersData)
        if (!productsData.error) setProducts(productsData)
        if (!categoriesData.error) setCategories(categoriesData)
        if (!tshirtData.error) setTshirtImages(tshirtData)
        if (!heroData.error) setHeroContent(heroData)
        if (!siteData.error) setSiteSettings(siteData)
        if (!aboutData.error) setAboutContent(aboutData)

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  // Save functions
  const handleSaveHeroContent = async () => {
    if (!heroContent) return
    try {
      const response = await fetch('/api/content/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroContent)
      })
      if (response.ok) toast.success('Hero content updated!')
      else toast.error('Failed to update hero content')
    } catch (error) {
      toast.error('Error updating hero content')
    }
  }

  const handleSaveSiteSettings = async () => {
    if (!siteSettings) return
    try {
      const response = await fetch('/api/content/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      })
      if (response.ok) toast.success('Site settings updated!')
      else toast.error('Failed to update site settings')
    } catch (error) {
      toast.error('Error updating site settings')
    }
  }

  const handleSaveAboutContent = async () => {
    if (!aboutContent) return
    try {
      const response = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutContent)
      })
      if (response.ok) toast.success('About content updated!')
      else toast.error('Failed to update about content')
    } catch (error) {
      toast.error('Error updating about content')
    }
  }

  // CRUD operations
  const handleSaveProduct = async () => {
    try {
      const url = editingItem ? `/api/admin/products/${editingItem.id}` : '/api/admin/products'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      })
      
      if (response.ok) {
        const newProduct = await response.json()
        if (editingItem) {
          setProducts(products.map(p => p.id === editingItem.id ? newProduct : p))
        } else {
          setProducts([newProduct, ...products])
        }
        setShowModal(false)
        setEditingItem(null)
        toast.success(`Product ${editingItem ? 'updated' : 'created'} successfully!`)
      }
    } catch (error) {
      toast.error('Error saving product')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure? This will delete all user data.')) return
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
        toast.success('User deleted successfully!')
      }
    } catch (error) {
      toast.error('Error deleting user')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure? This will delete the product and all variants.')) return
    try {
      const response = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId))
        toast.success('Product deleted successfully!')
      }
    } catch (error) {
      toast.error('Error deleting product')
    }
  }

  // Modal handlers
  const openModal = (type: string, item?: any) => {
    setModalType(type)
    setEditingItem(item)
    
    if (type === 'product') {
      if (item) {
        setProductForm({
          name: item.name,
          description: item.description || '',
          price: item.price,
          originalPrice: item.originalPrice || 0,
          stock: item.stock,
          sku: item.sku,
          active: item.active,
          featured: item.featured,
          tags: item.tags,
          categoryId: item.category.id
        })
      } else {
        setProductForm({
          name: '', description: '', price: 0, originalPrice: 0, stock: 0,
          sku: '', active: true, featured: false, tags: [], categoryId: ''
        })
      }
    }
    
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const realTimeStats = stats ? [
    { icon: FiUsers, label: 'Total Users', value: stats.users.totalUsers.toLocaleString(), 
      change: `+${stats.users.newUsersThisMonth}`, color: 'blue', bgGradient: 'from-blue-500 to-blue-600' },
    { icon: FiShoppingBag, label: 'Total Orders', value: stats.orders.totalOrders.toLocaleString(), 
      change: `+${stats.orders.ordersThisMonth}`, color: 'green', bgGradient: 'from-green-500 to-green-600' },
    { icon: FiDollarSign, label: 'Revenue', value: `NPR ${stats.orders.totalRevenue.toLocaleString()}`, 
      change: '+15%', color: 'purple', bgGradient: 'from-purple-500 to-purple-600' },
    { icon: FiTrendingUp, label: 'Active Products', value: stats.products.activeProducts.toString(), 
      change: `${stats.products.outOfStock} out of stock`, color: 'orange', bgGradient: 'from-orange-500 to-orange-600' }
  ] : []

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'products', label: 'Products', icon: FiPackage },
    { id: 'categories', label: 'Categories', icon: FiGrid },
    { id: 'tshirts', label: 'T-Shirt Images', icon: FiImage },
    { id: 'content', label: 'Website Content', icon: FiFileText },
    { id: 'about', label: 'About & Team', icon: FiInfo },
    { id: 'settings', label: 'Site Settings', icon: FiSettings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-2xl border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SS Admin
            </h1>
            <p className="text-gray-500 mt-1">Complete Management System</p>
          </div>
          
          <nav className="mt-6 px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-2 text-left transition-all duration-200 rounded-xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                  <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {realTimeStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                          <p className={`text-sm mt-2 text-${stat.color}-600 font-medium`}>{stat.change}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${stat.bgGradient} p-4 rounded-xl shadow-lg`}>
                          <stat.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Users</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Activity</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {user._count.orders} orders, {user._count.designs} designs
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                user.status === 'ACTIVE' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 