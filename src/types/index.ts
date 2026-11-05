export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  image: string;
  badge?: string; // e.g. "Limited Edition", "Signature"
  createdDate: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered';
  shippingAddress: Address;
  paymentMethod: 'stripe' | 'paypal' | 'cod';
  paymentStatus: 'Paid' | 'Pending';
  cardLast4?: string;
  trackingNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  joinedDate: string;
  addresses: Address[];
}
