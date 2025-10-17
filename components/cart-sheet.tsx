"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (getTotalItems() === 0) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Seu carrinho está vazio</p>
            <Button asChild>
              <Link href="/loja">Continuar Comprando</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {getTotalItems()}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="p-3">
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        {item.selectedSize && (
                          <p className="text-xs">Tam: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-xs">Cor: {item.selectedColor}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-2 w-2" />
                        </Button>
                        <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-2 w-2" />
                        </Button>
                      </div>
                      <p className="font-medium text-sm">{item.price}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
            </div>
            <Button asChild className="w-full" size="lg">
              <Link href="/carrinho">
                Finalizar Compra
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}