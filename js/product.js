const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = PRODUCTS.find(p => p.id === productId);

if (!product) {
    document.getElementById("productName").textContent = "Product Not Found";
    throw new Error("Product not found");
}

document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = `₹${product.price}`;
document.getElementById("productDescription").textContent = product.desc;

document.getElementById("mainProductImage").src = product.image;

const thumbs = document.querySelector(".thumbnail-gallery");

thumbs.innerHTML = "";

product.gallery.forEach(img => {

    const image = document.createElement("img");

    image.src = img;

    image.className = "thumb";

    image.onclick = () => {
        document.getElementById("mainProductImage").src = img;
    };

    thumbs.appendChild(image);

});