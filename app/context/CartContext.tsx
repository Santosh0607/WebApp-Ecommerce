'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  color: string
  size: string
  tshirtType: string
  design?: {
    imageUrl: string
    position: { x: number; y: number }
    scale: number
    rotation: number
  }
  image: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartItem: (productId: string, color: string, size: string) => CartItem | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ss_garment_cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('ss_garment_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const existingItem = items.find(
      item => 
        item.productId === newItem.productId &&
        item.color === newItem.color &&
        item.size === newItem.size
    )

    if (existingItem) {
      setItems(items.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      ))
      toast.success('Updated quantity in cart!')
    } else {
      const itemWithId: CartItem = {
        ...newItem,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }
      setItems([...items, itemWithId])
      toast.success('Added to cart!')
    }
  }

  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    toast.success('Removed from cart!')
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems(items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared!')
  }

  const getCartItem = (productId: string, color: string, size: string) => {
    return items.find(
      item => 
        item.productId === productId &&
        item.color === color &&
        item.size === size
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
} 