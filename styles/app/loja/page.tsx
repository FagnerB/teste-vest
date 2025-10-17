"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Legging Sculpt Pro",
    price: "R$ 189,90",
    image: "/woman-wearing-black-fitness-leggings-gym.jpg",
    category: "Feminino",
  },
  {
    id: 2,
    name: "Top Fitness Seamless",
    price: "R$ 129,90",
    image: "/woman-wearing-pink-sports-bra-fitness.jpg",
    category: "Feminino",
  },
  {
    id: 3,
    name: "Shorts Dry-Fit Performance",
    price: "R$ 149,90",
    image: "/man-wearing-black-athletic-shorts-gym.jpg",
    category: "Masculino",
  },
  {
    id: 4,
    name: "Camiseta Muscle Fit",
    price: "R$ 119,90",
    image: "/man-wearing-gray-fitted-workout-shirt.jpg",
    category: "Masculino",
  },
  {
    id: 5,
    name: "Conjunto Training Elite",
    price: "R$ 299,90",
    image: "/woman-wearing-matching-workout-set-pink.jpg",
    category: "Conjuntos",
  },
  {
    id: 6,
    name: "Regata Cavada Masculina",
    price: "R$ 89,90",
    image: "/man-wearing-black-tank-top-gym.jpg",
    category: "Masculino",
  },
  {
    id: 7,
    name: "Legging Cintura Alta",
    price: "R$ 169,90",
    image: "/woman-wearing-purple-high-waist-leggings.jpg",
    category: "Feminino",
  },
  {
    id: 8,
    name: "Garrafa Térmica Premium",
    price: "R$ 79,90",
    image: "/stainless-steel-water-bottle-fitness.jpg",
    category: "Acessórios",
  },
  {
    id: 9,
    name: "Top Cropped Fitness",
    price: "R$ 109,90",
    image: "/woman-wearing-white-crop-top-sports-bra.jpg",
    category: "Feminino",
  },
  {
    id: 10,
    name: "Bermuda Moletom Masculina",
    price: "R$ 159,90",
    image: "/man-wearing-gray-sweat-shorts.jpg",
    category: "Masculino",
  },
  {
    id: 11,
    name: "Luvas de Treino",
    price: "R$ 69,90",
    image: "/black-workout-gloves-fitness.jpg",
    category: "Acessórios",
  },
  {
    id: 12,
    name: "Conjunto Yoga Flow",
    price: "R$ 279,90",
    image: "/woman-wearing-beige-yoga-set.jpg",
    category: "Conjuntos",
  },
]

const categories = ["Todos", "Feminino", "Masculino", "Conjuntos", "Acessórios"]

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

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
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">{product.price}</span>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={`/produto/${product.id}`}>Ver Mais</Link>
                    </Button>
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
