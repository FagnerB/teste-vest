"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useCEP } from "@/hooks/useCEP"
import { PaymentMethod, DeliveryMethod, DeliveryAddress, OrderData } from "@/types/cart"
import { MessageCircle, Minus, Plus, Trash2, ShoppingBag, MapPin, CreditCard } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()
  const { fetchAddressByCEP, formatCEP, loading: cepLoading, error: cepError } = useCEP()
  
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("entrega")
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const handleCEPChange = async (cep: string) => {
    const formattedCEP = formatCEP(cep)
    setDeliveryAddress(prev => ({ ...prev, cep: formattedCEP }))
    
    if (formattedCEP.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddressByCEP(formattedCEP)
      if (addressData) {
        setDeliveryAddress(prev => ({
          ...prev,
          ...addressData,
        }))
      }
    }
  }

  const generateWhatsAppMessage = () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!")
      return
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error("Por favor, preencha seu nome e telefone.")
      return
    }

    if (deliveryMethod === "entrega" && (!deliveryAddress.street || !deliveryAddress.number)) {
      toast.error("Por favor, preencha o endereço de entrega.")
      return
    }

    const orderData: OrderData = {
      items,
      paymentMethod,
      deliveryMethod,
      deliveryAddress: deliveryMethod === "entrega" ? deliveryAddress : undefined,
      totalPrice: getTotalPrice(),
      customerName,
      customerPhone,
    }

    let message = `🛍️ *NOVO PEDIDO*\n\n`
    message += `👤 *Cliente:* ${customerName}\n`
    message += `📱 *Telefone:* ${customerPhone}\n\n`
    
    message += `🛒 *PRODUTOS:*\n`
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      if (item.selectedSize) message += `   Tamanho: ${item.selectedSize}\n`
      if (item.selectedColor) message += `   Cor: ${item.selectedColor}\n`
      message += `   Qtd: ${item.quantity}x\n`
      message += `   Valor: ${item.price}\n\n`
    })

    message += `💰 *TOTAL: R$ ${getTotalPrice().toFixed(2).replace('.', ',')}\n\n`
    
    message += `💳 *Forma de Pagamento:* `
    switch (paymentMethod) {
      case 'pix':
        message += `PIX\n`
        break
      case 'cartao':
        message += `Cartão\n`
        break
      case 'dinheiro':
        message += `Dinheiro\n`
        break
    }

    message += `\n📦 *Entrega:* `
    if (deliveryMethod === "entrega") {
      message += `Entrega no endereço\n`
      message += `📍 *Endereço:*\n`
      message += `${deliveryAddress.street}, ${deliveryAddress.number}\n`
      if (deliveryAddress.complement) message += `${deliveryAddress.complement}\n`
      message += `${deliveryAddress.neighborhood}\n`
      message += `${deliveryAddress.city}/${deliveryAddress.state}\n`
      message += `CEP: ${deliveryAddress.cep}\n`
    } else {
      message += `Retirada na loja\n`
      message += `📍 *Endereço da Loja:*\n`
      message += `Rua das Flores, 123\n`
      message += `Centro - São Paulo/SP\n`
      message += `CEP: 01234-567\n`
    }

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    
    // Clear cart after sending order
    clearCart()
    toast.success("Pedido enviado! Entraremos em contato em breve.")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground">Adicione alguns produtos incríveis!</p>
            <Button asChild>
              <a href="/loja">Continuar Comprando</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
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
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          {item.selectedSize && (
                            <p className="text-sm">Tamanho: {item.selectedSize}</p>
                          )}
                          {item.selectedColor && (
                            <p className="text-sm">Cor: {item.selectedColor}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold">{item.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix">PIX (5% desconto)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cartao" id="cartao" />
                    <Label htmlFor="cartao">Cartão de Crédito/Débito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dinheiro" id="dinheiro" />
                    <Label htmlFor="dinheiro">Dinheiro</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={deliveryMethod} onValueChange={(value: DeliveryMethod) => setDeliveryMethod(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entrega" id="entrega" />
                    <Label htmlFor="entrega">Entrega (taxa calculada via WhatsApp)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retirada" id="retirada" />
                    <Label htmlFor="retirada">Retirada na loja (gratuito)</Label>
                  </div>
                </RadioGroup>

                {deliveryMethod === "entrega" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          value={deliveryAddress.cep}
                          onChange={(e) => handleCEPChange(e.target.value)}
                          placeholder="00000-000"
                          disabled={cepLoading}
                        />
                        {cepError && <p className="text-sm text-destructive">{cepError}</p>}
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="street">Endereço</Label>
                        <Input
                          id="street"
                          value={deliveryAddress.street}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                          placeholder="Rua, Avenida..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          value={deliveryAddress.number}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={deliveryAddress.complement}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, complement: e.target.value }))}
                          placeholder="Apt, Bloco..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          value={deliveryAddress.neighborhood}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                          placeholder="Centro"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="São Paulo"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {deliveryMethod === "retirada" && (
                  <div className="pt-4 border-t">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold">Endereço da Loja:</h4>
                      <p className="text-sm">
                        Rua das Flores, 123<br />
                        Centro - São Paulo/SP<br />
                        CEP: 01234-567<br />
                        <br />
                        <strong>Horário de funcionamento:</strong><br />
                        Segunda a Sexta: 9h às 18h<br />
                        Sábado: 9h às 16h
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
                  </div>
                  {paymentMethod === 'pix' && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto PIX (5%):</span>
                      <span>-R$ {(getTotalPrice() * 0.05).toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>
                      R$ {paymentMethod === 'pix' 
                        ? (getTotalPrice() * 0.95).toFixed(2).replace('.', ',')
                        : getTotalPrice().toFixed(2).replace('.', ',')
                      }
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={generateWhatsAppMessage}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Finalizar Pedido via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}