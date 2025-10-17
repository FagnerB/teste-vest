import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Vestuario<span className="text-primary-foreground bg-primary px-1">& Cia</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Moda fitness premium para quem valoriza bem-estar e estilo de vida saudável.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/loja?categoria=feminino"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Feminino
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=masculino"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Masculino
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=acessorios"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Acessórios
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?categoria=conjuntos"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conjuntos
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/Vestuario & Cia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/Vestuario & Cia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@Vestuario & Cia.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vestuario & Cia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
