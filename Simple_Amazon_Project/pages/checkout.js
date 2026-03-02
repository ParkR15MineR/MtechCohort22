import { cart, removeFromCart, updateHeaderQuantity } from '../cart/cart.js';
import { products } from '../data/products.js';

function renderCheckout() {
    let cartSummaryHTML = '';
    let totalCents = 0;

    // 1. Loop through the cart and build the HTML
    cart.forEach((cartItem) => {
        const product = products.find(p => p.id === cartItem.productId);
        
        // Safety check: skip if product data isn't found
        if (!product) return;

        const itemTotal = product.priceCents * cartItem.quantity;
        totalCents += itemTotal;

        cartSummaryHTML += `
            <div class="cart-item-container">
                <div class="item-details">
                    <p class="product-name"><strong>${product.name}</strong></p>
                    <p>Price: $${(product.priceCents / 100).toFixed(2)}</p>

                    <div class="quantity-controls">
                      <label>Quantity:</label>
                      <input type="number" 
                           class="js-quantity-input" 
                           data-product-id="${product.id}" 
                           value="${cartItem.quantity}" 
                           min="1" 
                           style="width: 50px; margin-right: 10px;">
                      <button class="js-update-btn" data-product-id="${product.id}">Update</button>
                    </div>

                    <p>Subtotal: $${(itemTotal / 100).toFixed(2)}</p>
                    <button class="js-delete-btn" data-product-id="${product.id}">Remove</button>
                </div>
            </div>
        `;
    });
  

    // 2. Put the HTML on the page
    const summaryElement = document.querySelector('.js-order-summary');
    if (summaryElement) {
        summaryElement.innerHTML = cartSummaryHTML || '<p>Your cart is empty.</p>';
    }
    
    // 3. Update the other sections
    renderPaymentSummary(totalCents);
    updateHeaderQuantity();

    // 4. Attach Event Listeners
    document.querySelectorAll('.js-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
           const { productId } = btn.dataset;
        
        // Find the input field associated with this product
        const input = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`);
        const newQuantity = parseInt(input.value);

        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
            renderCheckout(); // Refresh the UI to show new totals
        } else {
            alert('Quantity must be at least 1');
        }
    });
});
}

function renderPaymentSummary(totalCents) {
    const shippingCents = totalCents > 0 ? 500 : 0; 
    const grandTotal = totalCents + shippingCents;

    const paymentElement = document.querySelector('.js-payment-summary');
    if (paymentElement) {
        paymentElement.innerHTML = `
            <h3>Order Summary</h3>
            <p><span>Items:</span> <span>$${(totalCents / 100).toFixed(2)}</span></p>
            <p><span>Shipping:</span> <span>$${(shippingCents / 100).toFixed(2)}</span></p>
            <hr>
            <p><strong>Total:</strong> <strong>$${(grandTotal / 100).toFixed(2)}</strong></p>
            <button class="place-order-btn">Place Your Order</button>
        `;
    }
}

// Initial Call
renderCheckout();