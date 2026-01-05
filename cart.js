// Retrieve cart data from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render all cart items and calculate totals
function displayCart() {
  const cartList = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  cartList.innerHTML = "";
  let subtotal = 0;

  // Create a list entry for each cart item
  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity">
          <button onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
    `;

    cartList.appendChild(li);
  });

  // Calculate order totals
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  // Display pricing breakdown
  subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  taxEl.textContent = `Tax (8%): $${tax.toFixed(2)}`;
  shippingEl.textContent = `Shipping: $${shipping.toFixed(2)}`;
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

// Update item quantity or remove item if quantity reaches zero
function updateQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Remove all items from the cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Initial render when the page loads
displayCart();
