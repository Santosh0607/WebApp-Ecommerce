'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiDownload, FiShare2, FiRotateCw, FiZoomIn, FiZoomOut, FiMove, FiTrash2, FiImage, FiZap } from 'react-icons/fi'
import { fabric } from 'fabric'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'

const tshirtTypes = [
  { id: 'round-neck', name: 'Round Neck', price: 499 },
  { id: 'v-neck', name: 'V-Neck', price: 549 },
  { id: 'collar', name: 'Polo Collar', price: 699 },
  { id: 'long-sleeve', name: 'Long Sleeve', price: 649 },
  { id: 'oversize', name: 'Oversize', price: 599 },
  { id: 'crop', name: 'Crop Top', price: 449 },
]

const popularColors = [
  { id: 'red', name: 'Classic Red', hex: '#dc2626' },
  { id: 'ruddy', name: 'Ruddy', hex: '#ea5a3d' },
  { id: 'black', name: 'Midnight Black', hex: '#000000' },
  { id: 'white', name: 'Pure White', hex: '#ffffff' },
  { id: 'navy', name: 'Navy Blue', hex: '#1e3a8a' },
  { id: 'gray', name: 'Cool Gray', hex: '#6b7280' },
  { id: 'green', name: 'Forest Green', hex: '#16a34a' },
  { id: 'yellow', name: 'Sunny Yellow', hex: '#facc15' },
  { id: 'purple', name: 'Royal Purple', hex: '#9333ea' },
  { id: 'pink', name: 'Blush Pink', hex: '#f472b6' },
]

export default function DesignStudio() {
  const [selectedType, setSelectedType] = useState(tshirtTypes[0])
  const [selectedColor, setSelectedColor] = useState(popularColors[0])
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTshirtImage, setCurrentTshirtImage] = useState('/images/tshirts/white-round-neck.png')
  const [tshirtImages, setTshirtImages] = useState<any[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useCart()
  const router = useRouter()

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        height: 400,
        width: 400,
        backgroundColor: '#f3f4f6',
      })
      
      setCanvas(fabricCanvas)
      
      return () => {
        fabricCanvas.dispose()
      }
    }
  }, [])

  // Load T-shirt images from database
  useEffect(() => {
    const loadTshirtImages = async () => {
      try {
        const response = await fetch('/api/tshirt-images')
        if (response.ok) {
          const images = await response.json()
          setTshirtImages(images)
          
          // Set default image if available
          if (images.length > 0) {
            const defaultImage = images.find((img: any) => 
              img.color === selectedColor.id && img.type === selectedType.id
            ) || images[0]
            setCurrentTshirtImage(defaultImage.url)
          }
        }
      } catch (error) {
        console.error('Error loading T-shirt images:', error)
      } finally {
        setLoadingImages(false)
      }
    }

    loadTshirtImages()
  }, [])

  // Update T-shirt image when type or color changes
  useEffect(() => {
    if (tshirtImages.length > 0) {
      const matchingImage = tshirtImages.find((img: any) => 
        img.color === selectedColor.id && img.type === selectedType.id
      )
      
      if (matchingImage) {
        setCurrentTshirtImage(matchingImage.url)
      } else {
        // Fallback to any image with matching color or type
        const fallbackImage = tshirtImages.find((img: any) => 
          img.color === selectedColor.id || img.type === selectedType.id
        ) || tshirtImages[0]
        setCurrentTshirtImage(fallbackImage.url)
      }
    }
  }, [selectedColor, selectedType, tshirtImages])

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string
      setUploadedImage(imgUrl)
      
      if (canvas) {
        fabric.Image.fromURL(imgUrl, (img) => {
          // Scale image to fit canvas
          const scale = Math.min(200 / img.width!, 200 / img.height!)
          img.scale(scale)
          img.set({
            left: canvas.width! / 2,
            top: canvas.height! / 2,
            originX: 'center',
            originY: 'center',
          })
          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.renderAll()
        })
      }
    }
    reader.readAsDataURL(file)
  }

  // Remove background using PhotoRoom API
  const removeBackground = async () => {
    const activeObject = canvas?.getActiveObject()
    if (!activeObject || activeObject.type !== 'image') {
      toast.error('Please select an image to remove background')
      return
    }

    if (!uploadedImage) {
      toast.error('Please upload an image first')
      return
    }

    setIsProcessing(true)
    
    try {
      // Convert uploaded image to File if it's a data URL
      const response = await fetch(uploadedImage)
      const blob = await response.blob()
      const file = new File([blob], 'image.png', { type: 'image/png' })

      // Create form data for our API
      const formData = new FormData()
      formData.append('image', file)

      // Call our background removal API
      const apiResponse = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(errorData.error || 'Failed to remove background')
      }

      const result = await apiResponse.json()
      
      if (!result.success || !result.imageUrl) {
        throw new Error('Invalid response from background removal API')
      }

      // Replace the current image with the processed one
      fabric.Image.fromURL(result.imageUrl, (img) => {
        // Copy properties from the current image
        const currentImg = activeObject as fabric.Image
        img.set({
          left: currentImg.left,
          top: currentImg.top,
          scaleX: currentImg.scaleX,
          scaleY: currentImg.scaleY,
          angle: currentImg.angle,
          originX: currentImg.originX,
          originY: currentImg.originY,
        })
        
        // Remove old image and add new one
        canvas?.remove(currentImg)
        canvas?.add(img)
        canvas?.setActiveObject(img)
        canvas?.renderAll()
        
        toast.success('Background removed successfully!')
      })
    } catch (error) {
      console.error('Background removal failed:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to remove background')
    } finally {
      setIsProcessing(false)
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    if (canvas) {
      canvas.clear()
      canvas.backgroundColor = '#f3f4f6'
      canvas.renderAll()
      setUploadedImage(null)
    }
  }

  // Download design
  const downloadDesign = async () => {
    const designArea = document.getElementById('design-preview')
    if (!designArea) return

    try {
      const canvas = await html2canvas(designArea)
      const link = document.createElement('a')
      link.download = 'ss-garment-design.png'
      link.href = canvas.toDataURL()
      link.click()
      toast.success('Design downloaded!')
    } catch (error) {
      toast.error('Failed to download design')
    }
  }

  // Share design
  const shareDesign = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    toast.success('Share link copied to clipboard!')
  }

  // Add to cart
  const handleAddToCart = () => {
    const designData = canvas?.toDataURL() || ''
    
    addToCart({
      productId: `custom-${Date.now()}`,
      name: `Custom ${selectedType.name} - ${selectedColor.name}`,
      price: selectedType.price,
      quantity: 1,
      color: selectedColor.name,
      size: 'M',
      tshirtType: selectedType.name,
      design: {
        imageUrl: designData,
        position: { x: 200, y: 200 },
        scale: 1,
        rotation: 0,
      },
      image: designData,
    })
    
    toast.success('Added to cart!')
    router.push('/cart')
  }

  // T-Shirt Preview with realistic images
  const getTshirtImage = (color: string, type: string) => {
    // This will be dynamically loaded from admin panel in the future
    const tshirtImages = {
      'black': '/api/placeholder/400/400', // Black T-shirt
      'white': '/api/placeholder/400/400', // White T-shirt  
      'red': '/api/placeholder/400/400',   // Red T-shirt
      'gray': '/api/placeholder/400/400',  // Gray T-shirt
      'navy': '/api/placeholder/400/400',
      'green': '/api/placeholder/400/400',
      'yellow': '/api/placeholder/400/400',
      'purple': '/api/placeholder/400/400',
      'pink': '/api/placeholder/400/400',
      'ruddy': '/api/placeholder/400/400'
    }
    return tshirtImages[color as keyof typeof tshirtImages] || '/api/placeholder/400/400'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Design Your <span className="text-primary-600">Custom T-Shirt</span>
          </h1>
          <p className="text-gray-600">Upload your design, customize, and order in minutes</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Design Canvas Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Design Area</h2>
              
              {/* Upload Section */}
              <div className="mb-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiUpload className="w-5 h-5" />
                  Upload Your Image/Logo
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={removeBackground}
                  disabled={!uploadedImage || isProcessing}
                  className="bg-ruddy-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-ruddy-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiZap className="w-5 h-5" />
                  )}
                  Remove Background
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCanvas}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiTrash2 className="w-5 h-5" />
                  Clear
                </motion.button>
              </div>

              {/* T-Shirt Preview */}
              <div id="design-preview" className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {loadingImages ? (
                    <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                      <div className="text-gray-500">Loading T-shirt...</div>
                    </div>
                  ) : (
                    <>
                      {/* T-Shirt Background Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={currentTshirtImage} 
                          alt={`${selectedColor.name} ${selectedType.name}`}
                          className="w-full h-full object-contain rounded-lg shadow-lg"
                          onError={(e) => {
                            // Fallback to colored SVG if image fails
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'block'
                          }}
                        />
                        
                        {/* Fallback colored T-shirt if image fails */}
                        <div className="w-full h-full flex items-center justify-center opacity-50" style={{ display: 'none' }}>
                          <svg
                            viewBox="0 0 400 400"
                            className="w-full h-full max-w-80 max-h-80"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 120 L100 80 Q100 60 120 60 L160 60 Q170 40 200 40 Q230 40 240 60 L280 60 Q300 60 300 80 L300 120 L260 140 L260 300 Q260 320 240 320 L160 320 Q140 320 140 300 L140 140 Z"
                              fill={selectedColor.hex}
                              opacity="0.8"
                            />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Design Canvas Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-48 h-48 border-2 border-dashed border-primary-300 bg-white/10 rounded-lg flex items-center justify-center">
                          <canvas
                            ref={canvasRef}
                            className="rounded-lg pointer-events-auto"
                            style={{ maxWidth: '180px', maxHeight: '180px' }}
                          />
                        </div>
                      </div>
                      
                      {/* T-shirt Type Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {selectedType.name}
                      </div>
                      
                      {/* Color Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        <span>{selectedColor.name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Export Options */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadDesign}
                  className="bg-white text-primary-600 border-2 border-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FiDownload className="w-5 h-5" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareDesign}
                  className="bg-white text-primary-600 border-2 border-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FiShare2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* T-Shirt Type Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {tshirtTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-lg font-medium transition-all ${
                      selectedType.id === type.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div>{type.name}</div>
                    <div className="text-sm opacity-80">₹{type.price}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Color</h3>
              <div className="grid grid-cols-5 gap-3">
                {popularColors.map((color) => (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-full aspect-square rounded-lg transition-all ${
                      selectedColor.id === color.id
                        ? 'ring-4 ring-primary-600 ring-offset-2'
                        : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg
                          className="w-6 h-6 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Summary and Add to Cart */}
            <div className="bg-gradient-to-r from-primary-500 to-ruddy-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium">{selectedType.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color:</span>
                  <span className="font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-medium">₹{selectedType.price}</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{selectedType.price}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Add to Cart
              </motion.button>
            </div>

            {/* Tips */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Design Tips</h3>
              <ul className="space-y-2 text-primary-700 text-sm">
                <li className="flex items-start gap-2">
                  <FiImage className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Upload high-resolution images for best print quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiZap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use the AI background remover for clean designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiMove className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Click and drag to reposition your design</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiRotateCw className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use corner handles to resize and rotate</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 