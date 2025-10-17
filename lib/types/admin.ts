// Tipos para o painel administrativo

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  sizes: string[]
  colors: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod: string
  shippingAddress: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  cpf?: string
  totalOrders: number
  totalSpent: number
  addresses: Address[]
  createdAt: Date
  lastOrderDate?: Date
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  productsChange: number
}

export interface SalesData {
  month: string
  revenue: number
  orders: number
}

export interface TopProduct {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
}
