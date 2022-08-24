import { Cart } from './cart';
import { OrderItem, Shipping } from './shipping-orderItem';

export class Order {
  items!: OrderItem[];
  datePlaced!: number;
  totalOrderPrice: number;

  constructor(public userId: string, public shipping: Shipping, cart: Cart) {
    this.datePlaced = new Date().getTime();

    this.items = cart.items.map((c) => {
      return {
        products: {
          title: c.title,
          price: c.price,
          image: c.image,
        },
        quantity: c.quantity,
        totalPrice: c.totalPrice,
      };
    });

    this.totalOrderPrice = cart.totalCartPrice;
  }
}
