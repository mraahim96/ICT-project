const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsList = document.querySelector('.cart-items-list');
const totalPriceElement = document.getElementById('total-price');
const badge = document.getElementById('badge');
const checkoutBtn = document.getElementById('checkout-btn');

const products = [
    { id: '1', name: 'TESTOSTERONE BOOSTER', price: 20, image: './images/testboosters.png' },
    { id: '2', name: 'CREATINE POWDER', price: 15, image: './images/creatine.png' },
    { id: '3', name: 'PROTEIN POWDER', price: 17, image: './images/protien.png' },
    { id: '4', name: 'PRE WORKOUT POWDER', price: 13, image: './images/preworkout.png' },
    { id: '5', name: 'CROSSFIT WOMENS T-SHIRT BLUE', price: 12, image: './images/png 1.png' },
    { id: '6', name: 'CROSSFIT WOMENS T-SHIRT GREEN', price: 12, image: './images/png 2.png' },
    { id: '7', name: 'CROSSFIT WOMENS T-SHIRT PINK', price: 12, image: './images/png 3.png' },
    { id: '8', name: 'FIT ME MENS T-SHIRT', price: 12, image: './images/png 4.png' },
    { id: '9', name: 'FIT ME CLUB MENS T-SHIRT', price: 12, image: './images/png 5.png' },
    { id: '10', name: 'FIT-ME FITNESS WEAR MENS T-SHIRT LGREEN', price: 12, image: './images/png 6.png' },
    { id: '11', name: 'FIT-ME FITNESS WEAR MENS T-SHIRT BLACK', price: 12, image: './images/png 7.png' },
    { id: '12', name: 'FIT ME HOODIE BLACK', price: 12, image: './images/png 8.png' },
    { id: '13', name: 'FIT ME HOODIE GREEN', price: 12, image: './images/png 9.png' },
    { id: '14', name: 'FIT ME MENS T-SHIRT BLUE', price: 12, image: './images/png 10.png' },
    { id: '15', name: 'FIT ME MENS T-SHIRT GRAY', price: 12, image: './images/png 11.png' }
];

function updateCartBadge() {
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    badge.textContent = totalItems;
}

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id == item.product_id);
        const itemTotalPrice = product.price * item.quantity;
        totalPrice += itemTotalPrice;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Quantity: <button class="decrease" data-id="${product.id}">-</button><span>${item.quantity}</span><button class="increase" data-id="${product.id}">+</button></p>
                <p>Total: $${itemTotalPrice.toFixed(2)}</p>
            </div>
            <button class="remove" data-id="${product.id}">Remove</button>
        `;
        cartItemsList.appendChild(itemElement);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

document.addEventListener('click', (event) => {
    const productId = event.target.getAttribute('data-id');
    const cartIndex = cart.findIndex(item => item.product_id == productId);

    if (event.target.classList.contains('increase')) {
        cart[cartIndex].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    if (event.target.classList.contains('decrease')) {
        if (cart[cartIndex].quantity > 1) {
            cart[cartIndex].quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    if (event.target.classList.contains('remove')) {
        cart.splice(cartIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before proceeding.");
    } else {
        alert("Your order is being processed...");

        localStorage.removeItem('cart');
        window.location.href = 'checkout.html';
    }
});

updateCartDisplay();
updateCartBadge();
