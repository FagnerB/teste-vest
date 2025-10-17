'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import {
  Store,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Image as ImageIcon,
} from 'lucide-react'

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    
    toast({
      title: 'Configurações salvas',
      description: 'As configurações foram atualizadas com sucesso.',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações da sua loja
        </p>
      </div>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Informações da Loja
          </CardTitle>
          <CardDescription>
            Configure os dados principais da sua loja
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input id="storeName" defaultValue="Vestuario & Cia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Email de Contato</Label>
              <Input id="storeEmail" type="email" defaultValue="contato@Vestuario & Cia.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeDescription">Descrição</Label>
            <Textarea
              id="storeDescription"
              defaultValue="Moda Fitness Premium - Roupas fitness de alta qualidade para quem valoriza academia, bem-estar e estilo de vida saudável"
              rows={3}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storePhone">Telefone</Label>
              <Input id="storePhone" defaultValue="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeWhatsapp">WhatsApp</Label>
              <Input id="storeWhatsapp" defaultValue="(11) 99999-9999" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configurações de Email
          </CardTitle>
          <CardDescription>
            Configure os emails automáticos da loja
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email de confirmação de pedido</Label>
              <p className="text-sm text-muted-foreground">
                Enviar email quando um novo pedido for criado
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email de atualização de status</Label>
              <p className="text-sm text-muted-foreground">
                Enviar email quando o status do pedido mudar
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email de marketing</Label>
              <p className="text-sm text-muted-foreground">
                Enviar emails promocionais para clientes
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Formas de Pagamento
          </CardTitle>
          <CardDescription>
            Configure os métodos de pagamento aceitos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>PIX</Label>
              <p className="text-sm text-muted-foreground">
                Aceitar pagamentos via PIX
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cartão de Crédito</Label>
              <p className="text-sm text-muted-foreground">
                Aceitar cartões de crédito (Visa, Mastercard, etc)
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cartão de Débito</Label>
              <p className="text-sm text-muted-foreground">
                Aceitar cartões de débito
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Boleto Bancário</Label>
              <p className="text-sm text-muted-foreground">
                Aceitar pagamentos via boleto
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure quando você quer ser notificado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Novos pedidos</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificação quando houver um novo pedido
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Produtos com estoque baixo</Label>
              <p className="text-sm text-muted-foreground">
                Receber alerta quando produtos estiverem com estoque baixo
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Novos clientes</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificação quando um novo cliente se cadastrar
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            SEO e Redes Sociais
          </CardTitle>
          <CardDescription>
            Configure as informações para mecanismos de busca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Título da Página (Meta Title)</Label>
            <Input
              id="metaTitle"
              defaultValue="Vestuario & Cia - Moda Fitness Premium"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: 50-60 caracteres
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Descrição (Meta Description)</Label>
            <Textarea
              id="metaDescription"
              defaultValue="Roupas fitness de alta qualidade para quem valoriza academia, bem-estar e estilo de vida saudável"
              rows={2}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: 150-160 caracteres
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" placeholder="@Vestuario & Cia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" placeholder="facebook.com/Vestuario & Cia" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Segurança
          </CardTitle>
          <CardDescription>
            Configurações de segurança e privacidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autenticação de dois fatores</Label>
              <p className="text-sm text-muted-foreground">
                Adicionar uma camada extra de segurança ao login
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Alterar Senha</Label>
            <Input id="currentPassword" type="password" placeholder="Senha atual" />
            <Input id="newPassword" type="password" placeholder="Nova senha" />
            <Input id="confirmPassword" type="password" placeholder="Confirmar nova senha" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  )
}
