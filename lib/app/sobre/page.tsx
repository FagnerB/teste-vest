import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Award } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Sobre a Vestuario & Cia</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Nascemos da paixão por fitness e do desejo de criar roupas que realmente fazem diferença no seu treino e no
            seu dia a dia.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Nossa História"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Nossa História</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                A Vestuario & Cia foi fundada por atletas que entendiam a importância de roupas de qualidade para o
                desempenho esportivo. Cansados de produtos que não atendiam suas expectativas, decidimos criar nossa
                própria marca.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Hoje, somos referência em moda fitness premium, oferecendo peças que combinam tecnologia de ponta,
                design moderno e conforto excepcional. Cada produto é desenvolvido pensando nas necessidades reais de
                quem treina sério.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Mais do que vender roupas, queremos inspirar um estilo de vida ativo e saudável. Acreditamos que quando
                você se sente bem com o que veste, seu desempenho melhora naturalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Nossos Valores</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Princípios que guiam cada decisão e cada produto que criamos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-none bg-card">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Qualidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprometimento com excelência em cada detalhe, desde a escolha dos tecidos até a costura final.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-card">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Comunidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Construímos uma família de pessoas que compartilham a paixão por vida ativa e bem-estar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-card">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscamos constantemente novas tecnologias e materiais para melhorar a experiência dos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Nosso Time</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Atletas, designers e entusiastas do fitness trabalhando juntos para criar produtos excepcionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted mx-auto max-w-sm">
                  <img
                    src={`/placeholder.svg?height=400&width=400&query=fitness+professional+portrait+${i}`}
                    alt={`Team Member ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Membro da Equipe</h3>
                  <p className="text-muted-foreground">Especialista em Fitness</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
