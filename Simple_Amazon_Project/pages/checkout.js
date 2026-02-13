import { cart, removeFromCart } from '../cart/cart.js';
import { products } from '../data/products.js';

function renderCheckout() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    // Find the full product details
    const matchingProduct = products.find(p => p.id === productId);

    cartSummaryHTML += `
      <div class="cart-item">
        <span>${matchingProduct.name} (x${cartItem.quantity})</span>
        <button class="js-delete-link" data-product-id="${matchingProduct.id}">
          Remove
        </button>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
  // Re-attach delete listeners
  document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
      removeFromCart(link.dataset.productId);
      renderCheckout(); // Re-render the list
    });
  });
}

renderCheckout();
import { cart, removeFromCart, updateHeaderQuantity } from '../cart/cart.js';
import { products } from '../data/products.js';

function renderCheckout() {
    let cartSummaryHTML = '';
    let totalPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = products.find(p => p.id === cartItem.productId);
        const itemTotal = product.priceCents * cartItem.quantity;
        totalPriceCents += itemTotal;

        cartSummaryHTML += `
            <div class="cart-item-container">
                <div class="item-details">
                    <p class="product-name"><strong>${product.name}</strong></p>
                    <p>Price: $${(product.priceCents / 100).toFixed(2)}</p>
                    <p>Quantity: ${cartItem.quantity}</p>
                    <p>Subtotal: $${(itemTotal / 100).toFixed(2)}</p>
                    <button class="js-delete-btn" data-product-id="${product.id}">Remove</button>
                </div>
            </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML || '<p>Your cart is empty.</p>';
    
    renderPaymentSummary(totalPriceCents);
    updateHeaderQuantity();

    // Event Listeners for Delete
    document.querySelectorAll('.js-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.productId);
            renderCheckout(); // Re-render everything
        });
    });
}

function renderPaymentSummary(totalCents) {
    const shippingCents = totalCents > 0 ? 500 : 0; // Flat $5 shipping if cart not empty
    const grandTotal = totalCents + shippingCents;

    document.querySelector('.js-payment-summary').innerHTML = `
        <h3>Order Summary</h3>
        <p>Items: $${(totalCents / 100).toFixed(2)}</p>
        <p>Shipping: $${(shippingCents / 100).toFixed(2)}</p>
        <hr>
        <p><strong>Total: $${(grandTotal / 100).toFixed(2)}</strong></p>
        <button class="place-order-btn">Place Your Order</button>
    `;
}

renderCheckout();