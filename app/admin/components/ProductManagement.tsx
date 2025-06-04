import React from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiTag, FiPackage, FiDollarSign } from 'react-icons/fi'

interface Product {
  id: string; name: string; description?: string; price: number; originalPrice?: number;
  stock: number; sku: string; active: boolean; featured: boolean; tags: string[];
  category: { id: string; name: string; }; variants: any[]; _count: { variants: number; orderItems: number; };
}

interface ProductManagementProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  onAdd: () => void
}

export default function ProductManagement({ products, onEdit, onDelete, onAdd }: ProductManagementProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600 mt-2">Manage your T-shirt products, pricing, and inventory</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Add New Product
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                    {product.category.name}
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
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-1">
                  <FiDollarSign className="w-4 h-4" />
                  Price
                </span>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">NPR {product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">NPR {product.originalPrice}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center gap-1">
                  <FiPackage className="w-4 h-4" />
                  Stock
                </span>
                <span className={`font-medium ${
                  product.stock > 10 ? 'text-green-600' : 
                  product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {product.stock} units
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Variants</span>
                <span className="font-medium text-gray-900">{product._count.variants}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Orders</span>
                <span className="font-medium text-gray-900">{product._count.orderItems}</span>
              </div>
            </div>

            {product.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {product.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{product.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
              >
                <FiEdit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first product</p>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Add First Product
          </button>
        </div>
      )}
    </div>
  )
} 