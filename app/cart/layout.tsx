import React from 'react'
import Header from '../components/Header'

export default function CartLayout({
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