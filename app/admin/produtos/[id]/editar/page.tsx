"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { awBuscarProdutoPorId, awAtualizarProduto } from '@/services/appwrite/produtos'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function EditarProdutoPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    images: ''
  })

  useEffect(() => {
    const load = async () => {
      try {
        const doc = await awBuscarProdutoPorId(id)
        setForm({
          nome: (doc as any).nome || (doc as any).name || '',
          category: (doc as any).category || '',
          price: String((doc as any).price ?? ''),
          stock: String((doc as any).stock ?? ''),
          description: (doc as any).description || '',
          images: Array.isArray((doc as any).images) ? (doc as any).images.join(', ') : ''
        })
      } catch (err: any) {
        toast.error(err?.message || 'Falha ao carregar produto')
        router.push('/admin/produtos')
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id, router])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload: any = {
        nome: form.nome,
        category: form.category || undefined,
        price: form.price ? Number(form.price) : undefined,
        stock: form.stock ? Number(form.stock) : undefined,
        description: form.description || undefined,
        images: form.images ? form.images.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      }
      await awAtualizarProduto(id, payload)
      toast.success('Produto atualizado!')
      router.push('/admin/produtos')
    } catch (err: any) {
      toast.error(err?.message || 'Falha ao salvar alterações')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Produto</h1>
        <p className="text-muted-foreground mt-1">Atualize as informações do produto</p>
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
              <Input name="category" value={form.category} onChange={onChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Preço</Label>
                <Input name="price" value={form.price} onChange={onChange} type="number" step="0.01" min="0" required />
              </div>
              <div>
                <Label>Estoque</Label>
                <Input name="stock" value={form.stock} onChange={onChange} type="number" min="0" />
              </div>
              <div>
                <Label>Imagens (URLs separadas por vírgula)</Label>
                <Input name="images" value={form.images} onChange={onChange} placeholder="https://... , https://..." />
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea name="description" value={form.description} onChange={onChange} rows={5} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/produtos')} disabled={saving}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
