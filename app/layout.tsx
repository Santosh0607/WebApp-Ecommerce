import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SS Garment - Custom T-Shirt Design Studio',
  description: 'Create stunning custom T-shirts with our intuitive design studio. Upload images, remove backgrounds, and design unique apparel with ease.',
  keywords: ['custom t-shirts', 'apparel design', 'clothing customization', 'SS Garment'],
  authors: [{ name: 'SS Garment Team' }],
  openGraph: {
    title: 'SS Garment - Custom T-Shirt Design Studio',
    description: 'Create stunning custom T-shirts with our intuitive design studio.',
    url: 'https://ssgarment.com',
    siteName: 'SS Garment',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SS Garment - Custom T-Shirt Design',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS Garment - Custom T-Shirt Design Studio',
    description: 'Create stunning custom T-shirts with our intuitive design studio.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 