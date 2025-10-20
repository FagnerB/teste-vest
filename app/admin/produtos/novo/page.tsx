"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Agora usamos a rota server-side /api/produtos, que usa API Key de forma segura

export default function NovoProdutoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    preco: '',
    estoque: '',
    descricao: '',
    imagens: '' // separado por vírgula
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Exemplo de payload p/ backend
      const payload = {
        nome: form.nome,
        category: form.categoria,
        price: Number(form.preco),
        stock: Number(form.estoque),
        description: form.descricao,
        images: form.imagens.split(',').map((s) => s.trim()).filter(Boolean),
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
      const res = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Falha ao criar produto')
      }
      toast.success('Produto criado com sucesso!')
      router.push('/admin/produtos')
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Falha ao salvar produto'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Produto</h1>
        <p className="text-muted-foreground mt-1">Cadastre um novo item no catálogo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label>Nome</Label>
              <Input name="nome" value={form.nome} onChange={onChange} required />
            </div>
            <div>
              <Label>Categoria</Label>
              <Input name="categoria" value={form.categoria} onChange={onChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Preço</Label>
                <Input name="preco" value={form.preco} onChange={onChange} type="number" step="0.01" min="0" required />
              </div>
              <div>
                <Label>Estoque</Label>
                <Input name="estoque" value={form.estoque} onChange={onChange} type="number" min="0" />
              </div>
              <div>
                <Label>Imagens (URLs separadas por vírgula)</Label>
                <Input name="imagens" value={form.imagens} onChange={onChange} placeholder="https://... , https://..." />
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea name="descricao" value={form.descricao} onChange={onChange} rows={5} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/produtos')} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
