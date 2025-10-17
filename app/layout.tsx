import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/CartContext"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vestuario & Cia - Moda Premium",
  description: "Roupas fitness de alta qualidade para quem valoriza academia, bem-estar e estilo de vida saudável",
  generator: "v0.app",
}   

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
