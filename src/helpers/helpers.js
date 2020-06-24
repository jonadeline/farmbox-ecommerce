export function isEmpty (val) {
  return val.trim().length === 0;
}

export function isEmail (val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export function getRandomId () {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function isUAEPhoneNumber (val) {
  return /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/.test(val);
}

export function getCartTotal (cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.qty * item.price;
  });
  return total.toFixed(2);
}
