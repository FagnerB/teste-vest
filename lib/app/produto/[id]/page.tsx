"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock product data
const productData = {
  1: {
    name: "Legging Sculpt Pro",
    price: "R$ 189,90",
    description:
      "Legging de alta compressão com tecnologia de modelagem corporal. Tecido respirável e secagem rápida, perfeita para treinos intensos.",
    images: [
      "/woman-wearing-black-fitness-leggings-gym-front.jpg",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza", "Azul Marinho"],
    category: "Feminino",
  },
  // Add more products as needed
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productData[params.id as keyof typeof productData] || productData[1]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.name}\nTamanho: ${selectedSize || "A definir"}\nCor: ${selectedColor || "A definir"}`,
    )
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/loja">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Loja
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{product.name}</h1>
              <p className="text-3xl font-bold text-foreground">{product.price}</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tamanho</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? "bg-primary text-primary-foreground" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Cor</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className={selectedColor === color ? "bg-primary text-primary-foreground" : ""}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Finalize sua compra diretamente pelo WhatsApp com atendimento personalizado.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Comprar via WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-border">
              <h3 className="font-semibold text-foreground">Características</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Tecido de alta performance</li>
                <li>✓ Secagem rápida</li>
                <li>✓ Proteção UV</li>
                <li>✓ Costuras planas</li>
                <li>✓ Modelagem anatômica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
