import { writable } from 'svelte/store';

const cart = writable([]);

const customCart = {
  subscribe: cart.subscribe,
  addToCart: item => {
    cart.update(items => {
      item.qty += 1;
      const index = items.indexOf(item);
      if (index === -1) {
        return [...items, item];
      } else {
        return [...items];
      }
    });
  },
  changeQty: (id, qty) => {
    cart.update(items => {
      if (qty > 0) {
        items.map((item) => {
          if (item.id === id) {
            item.qty = qty;
            return item;
          }
        });
        return [...items];
      } else { // Remove item from cart
        return items.filter(i => {
          if (i.id === id) {
            i.qty = 0;
          }
          return i.id !== id;
        });
      }
    });
  },
  emptyCart: () => {
    cart.update(() => []);
  }
};

export default customCart;
