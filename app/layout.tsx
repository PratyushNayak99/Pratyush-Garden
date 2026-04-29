import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "@/app/globals.css"
import ClientLayout from "./client-layout"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Pratyush Nayak - Digital Garden",
  description: "A personal digital garden with postcards, blogs, and photography",
  generator: "v0.app",
  verification: {
    google: "qANebXM5U5W7qg05kuCAaBBkSDKfM72t4G56p2uiqCU",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}
