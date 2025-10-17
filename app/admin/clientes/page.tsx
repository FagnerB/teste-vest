'use client'

import { useState } from 'react'
import { mockCustomers } from '@/lib/data/mock-admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Eye, Mail, Phone, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Customer } from '@/lib/types/admin'

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  
  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
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
                <TableHead>Total de Pedidos</TableHead>
                <TableHead>Total Gasto</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
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
                        <span className="text-muted-foreground">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {customer.totalOrders} pedidos
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString('pt-BR')}
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
                                <p>{selectedCustomer.name}</p>
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
                                <p>{selectedCustomer.phone}</p>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Pedidos</p>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold">
                                      R$ {selectedCustomer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Total Gasto</p>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-center">
                                    <p className="text-2xl font-bold">
                                      R$ {(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Ticket Médio</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Addresses */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Endereços
                              </h3>
                              <div className="space-y-3">
                                {selectedCustomer.addresses.map((address, index) => (
                                  <Card key={index}>
                                    <CardContent className="pt-6">
                                      <div className="text-sm space-y-1">
                                        <p className="font-medium">
                                          {address.street}, {address.number}
                                        </p>
                                        {address.complement && (
                                          <p className="text-muted-foreground">{address.complement}</p>
                                        )}
                                        <p className="text-muted-foreground">
                                          {address.neighborhood}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {address.city} - {address.state}
                                        </p>
                                        <p className="text-muted-foreground">
                                          CEP: {address.zipCode}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Cliente desde</p>
                                <p className="font-medium">
                                  {new Date(selectedCustomer.createdAt).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                              {selectedCustomer.lastOrderDate && (
                                <div>
                                  <p className="text-muted-foreground">Último pedido</p>
                                  <p className="font-medium">
                                    {new Date(selectedCustomer.lastOrderDate).toLocaleDateString('pt-BR', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric'
                                    })}
                                  </p>
                                </div>
                              )}
                            </div>
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
        <p>Mostrando {filteredCustomers.length} de {mockCustomers.length} clientes</p>
        <p>Receita total: R$ {mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  )
}
