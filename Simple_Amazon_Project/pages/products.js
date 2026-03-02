import { products } from '../data/products.js';
import { addToCart, updateHeaderQuantity } from '../cart/cart.js';

function renderProducts() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${(product.priceCents / 100).toFixed(2)}</p>
        <button class="js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Event Handling
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId);
      updateHeaderQuantity();
    });
  });
}

renderProducts();
updateHeaderQuantity();