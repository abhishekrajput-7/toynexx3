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

document.getElementById("longDescription").textContent =
product.longDesc || product.desc;

document.getElementById("mainProductImage").src =
product.image;

// ==========================
// Premium Product Data
// ==========================

// Badge
const badge = document.getElementById("productBadge");

if (badge) {
    badge.textContent = product.badge || "Premium";
}

// Old Price
const oldPrice = document.getElementById("oldPrice");

if (oldPrice) {

    if (product.oldPrice) {

        oldPrice.textContent = `₹${product.oldPrice}`;

    } else {

        oldPrice.style.display = "none";

    }

}

// Discount
const discount = document.getElementById("discount");

if (discount) {

    if (product.oldPrice) {

        const off = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        );

        discount.textContent = `${off}% OFF`;

    } else {

        discount.style.display = "none";

    }

}

// Stock
const stockText = document.getElementById("stockText");

if (stockText) {

    stockText.textContent = `In Stock (${product.stock || 0} left)`;

}

const thumbs = document.querySelector(".thumbnail-gallery");

thumbs.innerHTML = "";

const galleryImages =
product.gallery && product.gallery.length
? product.gallery
: [product.image];

galleryImages.forEach((img,index)=>{

    const image=document.createElement("img");

    image.src=img;

    if(index===0){
        image.style.border="2px solid #ffb703";
    }

    image.onclick=()=>{

        document.getElementById("mainProductImage").src=img;

        document.querySelectorAll(".thumbnail-gallery img")
        .forEach(i=>i.style.border="2px solid transparent");

        image.style.border="2px solid #ffb703";

    };

    thumbs.appendChild(image);

});

// Rating
const ratingText = document.getElementById("ratingText");

if (ratingText) {

    ratingText.textContent =
        `${product.rating || 0} • ${product.reviews || 0} Reviews`;

}

// Add To Cart
document.getElementById("addCartBtn").addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

if (!existing) {

    const selectedQty = parseInt(qtyInput.value, 10) || 1;

    console.log("Current Qty =", selectedQty);

    cart.push({
        id: product.id,
        qty: selectedQty
    });

}

    localStorage.setItem("cart", JSON.stringify(cart));

    //alert(product.name + " added to cart!");
    
    window.location.href = "cart.html";

});

// Buy Now

document.getElementById("buyNowBtn").addEventListener("click", () => {

    localStorage.setItem("buyNowProduct", JSON.stringify({
        id: product.id,
        qty: qty
    }));

    localStorage.setItem("checkoutType", "buyNow");

    window.location.href = "checkout.html";

});

let qty = 1;

const qtyInput = document.getElementById("qtyInput");

document.getElementById("plusQty").onclick = () => {

qty++;

qtyInput.value = qty;

};

document.getElementById("minusQty").onclick = () => {

if(qty>1){

qty--;

qtyInput.value=qty;

}

};

const shareBtn = document.querySelector(".share-btn");

if (shareBtn) {

    shareBtn.onclick = () => {

        if (navigator.share) {

            navigator.share({
                title: product.name,
                text: product.desc,
                url: window.location.href
            });

        } else {

            navigator.clipboard.writeText(window.location.href);

            alert("Product link copied!");

        }

    };

}


const wishBtn = document.querySelector(".wishlist-btn");

if (wishBtn) {

    wishBtn.onclick = () => {

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.includes(product.id)) {

            wishlist.push(product.id);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

        }

        wishBtn.classList.toggle("active");

    };

}

// ==========================
// Related Products
// ==========================

const relatedContainer = document.getElementById("relatedProducts");

if (relatedContainer) {

    const relatedProducts = PRODUCTS.filter(p =>
        p.category === product.category &&
        p.id !== product.id
    ).slice(0, 4);

    relatedContainer.innerHTML = "";

    relatedProducts.forEach(item => {

        relatedContainer.innerHTML += `

        <div class="product-card"
             onclick="location.href='product.html?id=${item.id}'">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

        </div>

        `;

    });

}