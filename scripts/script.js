// Static fruit data used for the storefront demo
const fruits = [
  {
    name: "Mango",
    price: 2.75,
    image: "images/mango.jpg"
  },
  {
    name: "Papaya",
    price: 4.75,
    image: "images/papaya.jpg"
  },
  {
    name: "Dragonfruit",
    price: 5.75,
    image: "images/dragonfruit.jpg"
  },
  {
    name: "Pineapple",
    price: 3.50,
    image: "images/pineapple.jpg"
  }
];

// Tracks selected quantities for each fruit
let quantities = {};

// Loads and displays all fruit items on the storefront
function loadFruits() {
  const fruitList = document.getElementById("fruit-list");
  fruitList.innerHTML = "";

  fruits.forEach(fruit => {
    const div = document.createElement("div");
    div.className = "fruit";

    div.innerHTML = `
      <div class="fruit-info">
        <img src="${fruit.image}" alt="${fruit.name}" class="fruit-image">
        <div>
          <h3>${fruit.name}</h3>
          <p>$${fruit.price.toFixed(2)}</p>

          <div class="quantity">
            <button onclick="changeQuantity('${fruit.name}', -1)">−</button>
            <span id="qty-${fruit.name}">1</span>
            <button onclick="changeQuantity('${fruit.name}', 1)">+</button>
          </div>

          <button onclick="addToCart('${fruit.name}', ${fruit.price}, '${fruit.image}')">
            Add to Cart
          </button>

          <button class="details-btn" onclick="viewDetails('${fruit.name}')">
            View Details
          </button>
        </div>
      </div>
    `;

    fruitList.appendChild(div);
  });
}

// Updates the quantity selected for a specific fruit
function changeQuantity(name, change) {
  if (!quantities[name]) {
    quantities[name] = 1;
  }

  quantities[name] += change;

  if (quantities[name] < 1) {
    quantities[name] = 1;
  }

  document.getElementById(`qty-${name}`).textContent = quantities[name];
}

// Adds the selected fruit and quantity to the shopping cart
function addToCart(name, price, image) {
  const qty = quantities[name] || 1;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} ${name}(s) added to cart.`);
}

// Navigates to the selected fruit detail page
function viewDetails(fruitName) {
  window.location.href = `fruit.html?name=${encodeURIComponent(fruitName)}`;
}

// Navigates to the shopping cart page
function viewCart() {
  window.location.href = "cart.html";
}

// Initializes the storefront when the page loads
window.onload = loadFruits;
