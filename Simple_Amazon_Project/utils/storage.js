import { getCartStats } from '../cart/cart.js';

export function refreshHeader() {
  const { totalQuantity } = getCartStats();
  const element = document.getElementById('cart-quantity');
  if (element) {
    element.textContent = totalQuantity;
  }
}