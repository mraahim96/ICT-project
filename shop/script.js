let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.getElementById('cart-icon');
const badge = document.getElementById('badge');

function updateCartBadge() {
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    badge.textContent = totalItems;
}

function addToCart(event) {
  const productId = event.target.getAttribute('data-id'); // Use data-id to get the product ID
  const existingProductIndex = cart.findIndex(item => item.product_id === productId);

  if (existingProductIndex === -1) {
      cart.push({
          product_id: productId,
          quantity: 1
      });
  } else {
      cart[existingProductIndex].quantity++;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

cartIcon.addEventListener('click', () => {
    alert('Cart clicked! Here you can view the items in the cart.');
});

updateCartBadge();
