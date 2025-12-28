"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Home, Mail, Camera, PenTool, Sun, Moon } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* The Popup Menu Content */}
      {isOpen && (
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-gray-200 dark:border-zinc-800 shadow-xl rounded-2xl p-2 flex flex-col gap-1 min-w-[160px] animate-in slide-in-from-bottom-5 fade-in duration-200 mb-2">
          
          <MobileLink 
            href="/" 
            icon={<Home size={18} />} 
            label="Home" 
            isActive={pathname === "/"} 
            onClick={() => setIsOpen(false)} 
          />
          <MobileLink 
            href="/postcards" 
            icon={<Mail size={18} />} 
            label="Postcards" 
            isActive={pathname.startsWith("/postcards")} 
            onClick={() => setIsOpen(false)} 
          />
          <MobileLink 
            href="/blogs" 
            icon={<PenTool size={18} />} 
            label="Blogs" 
            isActive={pathname.startsWith("/blogs")} 
            onClick={() => setIsOpen(false)} 
          />
          <MobileLink 
            href="/photography" 
            icon={<Camera size={18} />} 
            label="Photography" 
            isActive={pathname.startsWith("/photography")} 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-zinc-800 my-1 mx-2" />
          
          {/* Theme Toggle inside Menu */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>Theme</span>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      )}

      {/* The Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  )
}

// Helper Component for cleaner code
function MobileLink({ href, icon, label, isActive, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        isActive 
          ? "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}