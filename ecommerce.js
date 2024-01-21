const prompt = require('prompt-sync')({ sigint: true });
// Define sample products
const products = [
  { id: 1, name: 'New Musk',      price: 20.99 },
  { id: 2, name: 'Oud',           price: 15.49 },
  { id: 3, name: 'Mosuf',         price: 25.00 },
  { id: 4, name: 'Choco musk',    price: 18.00 },
  { id: 5, name: 'Intense choco', price: 28.00 }
];

// Initialize an empty shopping cart
let cart = [];

// Function to display products
function displayProducts() {
  console.log("Available Products:");
  products.forEach(product => {
    console.log(`${product.id}. ${product.name} - $${product.price.toFixed(2)}`);
  });
}

// Function to add a product to the cart
function addToCart(productId, quantity) {
  const product = products.find(p => p.id === productId);

  if (product) {
    const itemInCart = cart.find(item => item.product.id === productId);

    if (itemInCart) {
      itemInCart.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    console.log(`${quantity} ${product.name}(s) added to the cart.`);
  } else {
    console.log("Product not found.");
  }
}

// Function to display the cart
function displayCart() {
  console.log("Shopping Cart:");
  cart.forEach(item => {
    console.log(`${item.product.name} - Quantity: ${item.quantity}`);
  });
}

// Function to calculate the total price of items in the cart
function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.product.price * item.quantity;
  });
  return total.toFixed(2);
}

// Function to checkout
function checkout() {
  console.log(`Total: $${calculateTotal()}`);
  console.log("Thank you for shopping!");
  // Reset the cart after checkout
  cart = [];
}

// Main function
function main() {
  console.log("Hello! Welcome to Every Scent and Perfume");
  console.log("These are the Available Products we have in stock:");
  displayProducts();

  while (true) {
    const config = {
      promptMessage: "Please kindly pick your product(s): "
    };

    const choice = prompt(config.promptMessage);

    if (choice === null) {
      console.log("Exiting the application...");
      break;
    }

    if (choice.toLowerCase() === "checkout") {
      displayCart();
      checkout(); // Call the checkout function
      break;
    }

    const productID = parseInt(choice);

    if (!products.find((product) => product.id === productID)) {
      console.log("Invalid Item");
      continue;
    }

    const quantity = parseInt(prompt("Enter the quantity: "));
    addToCart(productID, quantity);
  }
}

// Run the application
main();
