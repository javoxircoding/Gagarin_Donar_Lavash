import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "BiteBurner — Fast Food Delivery",
  description:
    "Handcrafted burgers, crispy sides, and ice-cold drinks delivered to your door in minutes.",
}

export const viewport: Viewport = {
  themeColor: "#e84118",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
