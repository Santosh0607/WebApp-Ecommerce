import React from 'react'
import Header from '../components/Header'

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
} 