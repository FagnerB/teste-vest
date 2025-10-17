"use client"

import Link from "next/link"
import { Menu, ShoppingBag, X, Settings, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { CartSheet } from "@/components/cart-sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Vestuario<span className="text-primary-foreground bg-primary px-1">& Cia</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/loja"
              className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
            >
              Loja
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/login">
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
            <CartSheet />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              href="/"
              className="block text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/loja"
              className="block text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Loja
            </Link>
            <Link
              href="/sobre"
              className="block text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              className="block text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="pt-2 space-y-2">
              <Button asChild variant="ghost" className="w-full" size="sm">
                <Link href="/admin/login">
                  <Settings className="mr-2 h-4 w-4" />
                  Painel Admin
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full relative" size="sm">
                <Link href="/carrinho">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Carrinho
                  {getTotalItems() > 0 && (
                    <Badge variant="destructive" className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Link>
              </Button>
              {/* <Button asChild className="w-full" size="sm">
                <Link href="/loja">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Comprar Agora
                </Link>
              </Button> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
