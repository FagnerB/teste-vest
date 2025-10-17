"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const whatsappNumber = "5511999999999" // Substitua pelo número real

  const handleClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos Vestuario & Cia.")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA5A] text-white"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
