// Load and display details for a selected fruit
async function loadFruitDetails() {
  // Read query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const fruitName = params.get("name");

  try {
    // Fetch available fruit data
    const response = await fetch("/api/fruits");
    const fruits = await response.json();

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
        `Our ${fruit.name} is fresh, organic, and hand-picked from sustainable farms.`;
    } else {
      // Handle missing or invalid fruit selection
      document.body.innerHTML = "<h2>Fruit not found.</h2>";
    }
  } catch (error) {
    console.error("Error loading fruit details:", error);
    document.body.innerHTML = "<h2>Unable to load fruit details.</h2>";
  }
}

// Initialize fruit detail view on page load
loadFruitDetails();
