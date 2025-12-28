"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import MobileMenu from "@/components/MobileMenu" 

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {/* RESTORED: Changed 'bg-transparent' back to 'bg-gray-50 dark:bg-[#0a0a0a]' */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileMenu />
      </div>
    </ThemeProvider>
  )
}