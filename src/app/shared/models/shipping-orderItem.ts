export interface Shipping {
  name: string;
  address1: string;
  address2: string;
  city: string;
}

export interface OrderItem {
  products: {
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
  totalPrice: number;
}
