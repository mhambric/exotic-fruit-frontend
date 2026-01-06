// Load and display details for a selected fruit
function loadFruitDetails() {
  // Read query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const fruitName = params.get("name");

  // Static fruit data used for the frontend demo
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

  // Find the selected fruit by name
  const fruit = fruits.find(f => f.name === fruitName);

  if (fruit) {
    // Populate page elements with fruit details
    document.getElementById("fruit-title").textContent = fruit.name;
    document.getElementById("fruit-img").src = fruit.image;
    document.getElementById("fruit-img").alt = fruit.name;
    document.getElementById("fruit-price").textContent =
      `Price: $${fruit.price.toFixed(2)}`;
    document.getElementById("fruit-desc").textContent =
      `Our ${fruit.name} is fresh organic and carefully sourced from trusted farms.`;
  } else {
    // Handle missing or invalid fruit selection
    document.body.innerHTML = "<h2>Unable to load fruit details.</h2>";
  }
}

// Initialize fruit detail view on page load
loadFruitDetails();

