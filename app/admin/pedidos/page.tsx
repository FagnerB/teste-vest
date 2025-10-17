'use client'

import { useState } from 'react'
import { mockOrders } from '@/lib/data/mock-admin'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import type { Order } from '@/lib/types/admin'

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  processing: { label: 'Processando', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
}

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    console.log(`Updating order ${orderId} to status ${newStatus}`)
    // Aqui você implementaria a lógica de atualização
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todos os pedidos da loja
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items.length} items</TableCell>
                    <TableCell className="font-medium">
                      R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[order.status].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Pedido</DialogTitle>
                            <DialogDescription>
                              {order.orderNumber}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div>
                                <h3 className="font-semibold mb-2">Cliente</h3>
                                <div className="text-sm space-y-1">
                                  <p>{selectedOrder.customer.name}</p>
                                  <p className="text-muted-foreground">{selectedOrder.customer.email}</p>
                                  <p className="text-muted-foreground">{selectedOrder.customer.phone}</p>
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div>
                                <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                                <div className="text-sm text-muted-foreground">
                                  <p>{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number}</p>
                                  {selectedOrder.shippingAddress.complement && (
                                    <p>{selectedOrder.shippingAddress.complement}</p>
                                  )}
                                  <p>{selectedOrder.shippingAddress.neighborhood}</p>
                                  <p>{selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state}</p>
                                  <p>CEP: {selectedOrder.shippingAddress.zipCode}</p>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-2">Itens do Pedido</h3>
                                <div className="space-y-3">
                                  {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        <Image
                                          src={item.productImage}
                                          alt={item.productName}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-sm">{item.productName}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {item.size && `Tamanho: ${item.size}`}
                                          {item.size && item.color && ' • '}
                                          {item.color && `Cor: ${item.color}`}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Quantidade: {item.quantity}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium text-sm">
                                          R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Total */}
                              <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">Total</span>
                                  <span className="text-xl font-bold">
                                    R$ {selectedOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                              </div>

                              {/* Update Status */}
                              <div>
                                <h3 className="font-semibold mb-2">Atualizar Status</h3>
                                <Select
                                  defaultValue={selectedOrder.status}
                                  onValueChange={(value) => updateOrderStatus(selectedOrder.id, value as Order['status'])}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="processing">Processando</SelectItem>
                                    <SelectItem value="shipped">Enviado</SelectItem>
                                    <SelectItem value="delivered">Entregue</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Mostrando {filteredOrders.length} de {mockOrders.length} pedidos</p>
      </div>
    </div>
  )
}
