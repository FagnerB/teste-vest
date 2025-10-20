"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Plus, Search } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

export default function ProdutosPage() {
  const [search, setSearch] = useState('')
  const [produtos, setProdutos] = useState<any[]>([])

  useEffect(() => {
    // Aqui chame a API quando existir: listarProdutos().then(setProdutos)
    setProdutos([]) // vazio para exemplo visual
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" /> Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="font-bold mb-4">Cadastrar Novo Produto</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Nome" className="w-full px-2 py-1 border rounded" />
              <input type="text" placeholder="Categoria" className="w-full px-2 py-1 border rounded" />
              <input type="number" placeholder="Preço" className="w-full px-2 py-1 border rounded" />
              <input type="number" placeholder="Estoque" className="w-full px-2 py-1 border rounded" />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Salvar
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Search className="h-4 w-4 my-auto mr-2" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Produtos */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground text-center">Nenhum produto cadastrado.</TableCell>
                </TableRow>
              ) : (
                produtos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.categoria}</TableCell>
                    <TableCell>R$ {produto.preco}</TableCell>
                    <TableCell>{produto.estoque}</TableCell>
                    <TableCell>{produto.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
