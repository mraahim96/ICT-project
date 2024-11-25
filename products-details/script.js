let cartItemCount = 0;

function addToCart() {
  cartItemCount++;
  updateCartBadge();
}

function updateCartBadge() {
  const cartIcon = document.getElementById('cartIcon');
  cartIcon.textContent = cartItemCount;
}



function takeAddressInput() {
  Swal.fire({
    title: 'Enter Address',
    html: '<input id="swal-input1" class="swal2-input" placeholder="Enter your address">',
    showCancelButton: true,
    confirmButtonText: 'Next',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      return document.getElementById('swal-input1').value;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const address = result.value;
      showConfirmation(address);
    }
  });
}

function showConfirmation(address) {
  Swal.fire({
    title: 'Confirm Order',
    html: `Are you sure you want to place this order to the following address?<br><br>${address}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Place Order',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'custom-confirm-button'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      showOrderPlacedAlert();
    }
  });
}

function showOrderPlacedAlert() {
  Swal.fire({
    title: 'Order Placed',
    text: 'Your order has been successfully placed!',
    icon: 'success'
  });
}

