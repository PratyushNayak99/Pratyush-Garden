"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/postcards", label: "Postcards" },
    { path: "/blogs", label: "Blogs" },
    { path: "/photography", label: "Photography" },
  ]

  return (
    // Added 'backdrop-blur-md' and transparent background so your geometric pattern shows through
    <header className="sticky top-0 z-50 bg-gray-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="italic font-semibold text-lg">Pratyush Nayak</span>
        </Link>

        {/* --- CHANGE IS HERE --- */}
        {/* Added 'hidden md:flex': This hides everything inside this div on mobile */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                pathname === link.path
                  ? "text-gray-900 dark:text-gray-100 font-medium"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}