"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import { loginAdmin } from "../../../services/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.")
      return
    }

    setIsSubmitting(true)

    try {
      // loginAdmin DEVE enviar {grant_type, username, password}
      const token = await loginAdmin(email, password)
      if (token) {
        localStorage.setItem("token", token)
        toast.success("Login realizado com sucesso!")
        router.push("/admin/dashboard")
      } else {
        toast.error("Credenciais inválidas. Tente novamente.")
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillDemoCredentials = (userType: 'admin' | 'gerente') => {
    if (userType === 'admin') {
      setEmail('admin@vestuario.com')
      setPassword('admin123')
    } else {
      setEmail('gerente@vestuario.com')
      setPassword('gerente123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              DN<span className="text-primary-foreground bg-primary px-2 py-1 rounded">lifestyle</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">Faça login para acessar o painel</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Login
            </CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Credenciais de Demonstração</CardTitle>
            <CardDescription className="text-xs">
              Clique para preencher automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full text-left justify-start"
              onClick={() => fillDemoCredentials('admin')}
              disabled={isSubmitting}
            >
              <div className="text-left">
                <div className="font-medium">Administrador</div>
                <div className="text-xs text-muted-foreground">admin@vestuario.com • admin123</div>
              </div>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full text-left justify-start"
              onClick={() => fillDemoCredentials('gerente')}
              disabled={isSubmitting}
            >
              <div className="text-left">
                <div className="font-medium">Gerente</div>
                <div className="text-xs text-muted-foreground">gerente@vestuario.com • gerente123</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Back to site */}
        <div className="text-center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              ← Voltar para o site
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
