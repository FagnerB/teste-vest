"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Instagram, MapPin } from "lucide-react"
import { enviarContato } from "../../services/contato"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Função de envio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Salva mensagem no backend FastAPI
    try {
      await enviarContato({
        nome: formData.name,
        email: formData.email,
        mensagem: formData.message
      })
      // Opcional: mostrar o toast de sucesso
      alert("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.")
    } catch {
      alert("Erro ao enviar mensagem. Tente novamente.")
      return
    }

    // 2. Envia para WhatsApp
    const message = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`,
    )
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">Fale Conosco</h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Nossa equipe está pronta para atender você e tirar todas as suas dúvidas sobre nossos produtos e
                  serviços.
                </p>
              </div>

              <div className="space-y-6">
                {/* WhatsApp */}
                <Card className="border-border">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground">(11) 99999-9999</p>
                      <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground hover:underline"
                      >
                        Enviar mensagem
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-border">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">contato@Vestuario & Cia.com</p>
                      <a
                        href="mailto:contato@Vestuario & Cia.com"
                        className="text-sm text-primary-foreground hover:underline"
                      >
                        Enviar email
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Instagram */}
                <Card className="border-border">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                      <p className="text-muted-foreground">@Vestuario & Cia</p>
                      <a
                        href="https://instagram.com/Vestuario & Cia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground hover:underline"
                      >
                        Seguir no Instagram
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Localização */}
                <Card className="border-border">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Localização</h3>
                      <p className="text-muted-foreground">
                        São Paulo, SP
                        <br />
                        Brasil
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-balance">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nome
                    </label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar você?"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
