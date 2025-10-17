export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  category: string;
  description?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export type PaymentMethod = 'pix' | 'cartao' | 'dinheiro';

export type DeliveryMethod = 'entrega' | 'retirada';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface OrderData {
  items: CartItem[];
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: DeliveryAddress;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
}