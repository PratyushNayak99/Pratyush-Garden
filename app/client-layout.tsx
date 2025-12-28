"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
// 1. Import the new MobileMenu component
import MobileMenu from "@/components/MobileMenu" 

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {/* 2. CHANGED: 'bg-gray-50' -> 'bg-transparent'
         This allows the GeometricBackground from RootLayout to show through.
      */}
      <div className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        
        {/* 3. ADDED: The Floating Menu sits here */}
        <MobileMenu />
      </div>
    </ThemeProvider>
  )
}