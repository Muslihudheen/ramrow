export interface AdminUser {
  email: string;
  password: string;
  userID: string;
}

export interface ClientUser {
  name: string;
  email: string;
  password: string;
  userID: string;
  addresses: Address[];
  cart: Cart[];
  orders: Order[];
  payments: Payment[];
  role: 'guest' | 'user';
  reviews: Review[];
}

export interface Product {
  productID: string;
  categoryID: string;
  brandID: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  stock: number;
  discount: number;
  discountedPrice: number;
  coupons: string[];
  images: string[];
  tags: string[];
  brand: string;
}

export interface Cart {
  cartID: string;
  userID: string;
  cartObjects: Product[];
  totalPrice: number;
  shippingCharge: number;
}

export interface Order {
  orderID: string;
  userID: string;
  products: Product[];
  totalPrice: number;
  shippingCharge: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'placed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
}

export interface Payment {
  paymentID: string;
  userID: string;
  orders: Order[];
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentDetails: Record<string, any>;
  shippingAddress: Address;
}

export interface Address {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface HomePage {
  banners: string[];
  trendingProducts: Product[];
  newArrivals: Product[];
  recentlyViewed: Product[];
  videos: string[];
  subscribeNewsletter: string[];
}