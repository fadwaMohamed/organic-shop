export class CartItem {
  key!: string;
  title!: string;
  price!: number;
  image!: string;
  quantity!: number;

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
