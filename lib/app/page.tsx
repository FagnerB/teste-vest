import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Dumbbell, Heart, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = [
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
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-primary/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/athletic-woman-and-man-gym-workout-fitness-lifesty.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
              Seu estilo.
              <br />
              Seu treino.
              <br />
              <span className="text-primary-foreground">Seu lifestyle.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Roupas fitness premium que combinam performance, conforto e estilo para quem leva a vida ativa a sério.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/loja">
                  Explorar Coleção
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sobre">Conheça a Marca</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Dumbbell className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Alta Performance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tecidos tecnológicos que acompanham seus movimentos e potencializam seu desempenho.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Conforto Total</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Modelagem anatômica e costuras planas para máximo conforto durante todo o treino.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Estilo Único</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Design moderno e minimalista que funciona dentro e fora da academia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Produtos em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Conheça nossas peças mais vendidas e descubra por que atletas escolhem Vestuario & Cia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent"
                    >
                      <Link href={`/produto/${product.id}`}>Ver Mais</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/loja">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
                Mais que roupas.
                <br />
                Um estilo de vida.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                A Vestuario & Cia nasceu da paixão por fitness e bem-estar. Acreditamos que roupas de qualidade fazem
                diferença no seu desempenho e motivação.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Cada peça é desenvolvida com tecnologia de ponta e design pensado para quem não abre mão de estilo,
                mesmo nos treinos mais intensos.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/sobre">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img src="/fitness-lifestyle-gym-healthy-living-workout.jpg" alt="Vestuario & Cia" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Pronto para elevar seu treino?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90 text-pretty">
            Fale conosco pelo WhatsApp e descubra as melhores peças para o seu estilo de vida fitness.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary-foreground hover:bg-white/90" asChild>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Vestuario & Cia."
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
