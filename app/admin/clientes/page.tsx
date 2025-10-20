'use client'

import { useEffect, useState } from 'react'
import { listarClientes } from '../../../services/clientes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Eye, Mail, Phone, MapPin } from 'lucide-react'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger
} from '@/components/ui/dialog'

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    listarClientes().then(setCustomers)
  }, [])

  const filteredCustomers = customers.filter((customer) =>
    customer.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.telefone?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground mt-1">
          Visualize e gerencie seus clientes
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Cadastrado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer.nome?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.nome}</p>
                        {customer.cpf && (
                          <p className="text-sm text-muted-foreground">
                            CPF: {customer.cpf}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.telefone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.created_at
                      ? new Date(customer.created_at).toLocaleDateString('pt-BR')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Cliente</DialogTitle>
                          <DialogDescription>
                            Informações completas do cliente
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Nome Completo</h3>
                                <p>{selectedCustomer.nome}</p>
                              </div>
                              {selectedCustomer.cpf && (
                                <div>
                                  <h3 className="font-semibold mb-2 text-sm text-muted-foreground">CPF</h3>
                                  <p>{selectedCustomer.cpf}</p>
                                </div>
                              )}
                              <div>
                                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Email</h3>
                                <p>{selectedCustomer.email}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Telefone</h3>
                                <p>{selectedCustomer.telefone}</p>
                              </div>
                            </div>
                            {/* Endereços (caso existam) */}
                            {selectedCustomer.enderecos && selectedCustomer.enderecos.length > 0 && (
                              <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  Endereços
                                </h3>
                                <div className="space-y-3">
                                  {selectedCustomer.enderecos.map((address: any, index: number) => (
                                    <Card key={index}>
                                      <CardContent className="pt-6">
                                        <div className="text-sm space-y-1">
                                          <p className="font-medium">
                                            {address.rua}, {address.numero}
                                          </p>
                                          {address.complemento && (
                                            <p className="text-muted-foreground">{address.complemento}</p>
                                          )}
                                          <p className="text-muted-foreground">
                                            {address.bairro}
                                          </p>
                                          <p className="text-muted-foreground">
                                            {address.cidade} - {address.estado}
                                          </p>
                                          <p className="text-muted-foreground">
                                            CEP: {address.cep}
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Mostrando {filteredCustomers.length} de {customers.length} clientes</p>
      </div>
    </div>
  )
}
