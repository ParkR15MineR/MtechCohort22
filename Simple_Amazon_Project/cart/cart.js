export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
    const matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveToStorage();
}

export function calculateCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the header on any page
export function updateHeaderQuantity() {
    const quantity = calculateCartQuantity();
    const quantityElement = document.getElementById('cart-quantity');
    if (quantityElement) {
        quantityElement.innerText = quantity;
    }
}