import { Iproduct } from 'src/app/shared/models/iproduct';

import { CartItem } from './cart-item';

export class Cart {
  items: CartItem[] = [];

  constructor(itemsMap: CartItem[]) {
    // convert itemMap (object of Objects of objects) > into array of objects
    this.items = Object.keys(itemsMap).map((key) => {
      return new CartItem({
        ...itemsMap[key as unknown as number],
        key: key.slice(1, -1),
      });
    });
  }

  get totalItemsCount(): number {
    return this.items.reduce((t, { quantity }) => t + quantity, 0);
  }

  get totalCartPrice(): number {
    return this.items.reduce(
      (t, { quantity, price }) => t + quantity * price,
      0
    );
  }

  productQuantity(product: Iproduct): number {
    let item = this.items.filter((i) => i.key == product.key)[0];
    return item ? item.quantity : 0;
  }
}
