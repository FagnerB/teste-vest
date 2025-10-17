"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { Product } from "@/types/cart"
import { getProductById } from "@/data/products"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"



export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(parseInt(params.id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const { addItem } = useCart()

  // Redirect to 404 if product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Produto não encontrado</h1>
            <Button asChild>
              <Link href="/loja">Voltar para Loja</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      toast.error("Por favor, selecione o tamanho.")
      return
    }
    if (product.colors && product.colors.length > 1 && !selectedColor) {
      toast.error("Por favor, selecione a cor.")
      return
    }
    
    addItem(product, 1, selectedSize, selectedColor)
    toast.success(`${product.name} adicionado ao carrinho!`)
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
                src={product.images?.[selectedImage] || product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images?.map((image, index) => (
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
            {product.sizes && product.sizes.length > 0 && (
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
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
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
            )}

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Adicione ao carrinho e finalize sua compra com facilidade.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/carrinho">
                    Ver Carrinho
                  </Link>
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
