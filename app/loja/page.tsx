"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { Product } from "@/types/cart"
import { products, categories } from "@/data/products"
import { ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"



export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const { addItem } = useCart()

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Nossa Coleção</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubra peças exclusivas que combinam estilo, conforto e performance para seus treinos.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold text-foreground">{product.price}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingCart className="mr-1 h-3 w-3" />
                        Adicionar ao Carrinho
                      </Button>
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link href={`/produto/${product.id}`}>
                          <Eye className="mr-1 h-3 w-3" />
                          Ver
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
