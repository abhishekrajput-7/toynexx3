// Get Product ID from URL

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

console.log(productId);