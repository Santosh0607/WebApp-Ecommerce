'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSave, FiUpload, FiImage } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  type: string
  item: any
  categories: any[]
  onSave: (data: any) => void
}

export default function EditModals({ isOpen, onClose, type, item, categories, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (item && isOpen) {
      setFormData({ ...item })
    }
  }, [item, isOpen])

  const handleSave = () => {
    onSave(formData)
  }

  const renderProductForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
          <input
            type="text"
            value={formData.sku || ''}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price (NPR)</label>
          <input
            type="number"
            value={formData.price || ''}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (NPR)</label>
          <input
            type="number"
            value={formData.originalPrice || ''}
            onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            value={formData.stock || ''}
            onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={formData.categoryId || ''}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.active || false}
            onChange={(e) => setFormData({...formData, active: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured || false}
            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Featured</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags?.join(', ') || ''}
          onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="cotton, premium, comfortable"
        />
      </div>
    </div>
  )

  const renderCategoryForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.active || false}
          onChange={(e) => setFormData({...formData, active: e.target.checked})}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700">Active</span>
      </label>
    </div>
  )

  const renderTshirtForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">T-Shirt Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
        <div className="space-y-3">
          {/* File Upload */}
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  try {
                    const formDataUpload = new FormData()
                    formDataUpload.append('file', file)
                    
                    const response = await fetch('/api/upload', {
                      method: 'POST',
                      body: formDataUpload
                    })
                    
                    if (response.ok) {
                      const result = await response.json()
                      setFormData({...formData, url: result.url})
                      toast.success('Image uploaded successfully!')
                    } else {
                      const error = await response.json()
                      toast.error(error.error || 'Failed to upload image')
                    }
                  } catch (error) {
                    toast.error('Failed to upload image')
                  }
                }
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2"
            >
              <FiUpload className="w-4 h-4" />
              Upload
            </button>
          </div>
          
          {/* URL Input */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Or enter image URL</label>
            <input
              type="text"
              value={formData.url || ''}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
          <select
            value={formData.color || ''}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="navy">Navy</option>
            <option value="gray">Gray</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <select
            value={formData.type || ''}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="round-neck">Round Neck</option>
            <option value="v-neck">V-Neck</option>
            <option value="polo">Polo</option>
            <option value="hoodie">Hoodie</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
          <input
            type="number"
            value={formData.order || ''}
            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active || false}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
      </div>

      {formData.url && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preview</label>
          <div className="w-32 h-32 border border-gray-300 rounded-xl overflow-hidden">
            <img 
              src={formData.url} 
              alt="T-shirt preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/128/128'
              }}
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderUserForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
        <input
          type="text"
          value={formData.phone || ''}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
          <select
            value={formData.role || ''}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            value={formData.status || ''}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BANNED">Banned</option>
          </select>
        </div>
      </div>
    </div>
  )

  const getTitle = () => {
    const action = item?.id ? 'Edit' : 'Add'
    switch (type) {
      case 'product': return `${action} Product`
      case 'category': return `${action} Category`
      case 'tshirt': return `${action} T-Shirt Image`
      case 'user': return `${action} User`
      default: return 'Edit Item'
    }
  }

  const renderForm = () => {
    switch (type) {
      case 'product': return renderProductForm()
      case 'category': return renderCategoryForm()
      case 'tshirt': return renderTshirtForm()
      case 'user': return renderUserForm()
      default: return <div>Unknown form type</div>
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {renderForm()}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 