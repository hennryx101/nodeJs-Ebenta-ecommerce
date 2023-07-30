import Carousel from "../utils/productDetailsCarousel.js";
import AddCart from "../productFunction/addToCart.js";
import BuyNow from "../productFunction/buyNow.js";

const params = window.location.search;
const id = new URLSearchParams(params).get("id");


Carousel();

async function OpenCard() {
    try {
        const res = await fetch(`/api/products/getProduct/${id}`, {
            method: "GET"
        });

        const data = await res.json();
        if(data.product){
            console.log(data.product);
            renderProdDetails(data.product);
            AddCart();
            BuyNow();
        }
    } catch (error) {
        console.log(error);
    }
}

OpenCard();

function renderProdDetails(product) {
    const prodName = document.getElementById("name");
    const prodPrice = document.getElementById("price");
    const prodStock = document.getElementById("stock");
    const prodOrders = document.getElementById("orders");
    const prodDescription = document.getElementById("description");
    const prodOrigins = document.getElementById("origins");
    const cartBtn = document.querySelector(".cart");
    const buynowBtn = document.querySelector(".buy");

    buynowBtn.setAttribute("data-id", product._id);
    cartBtn.setAttribute("data-id", product._id);

    prodName.textContent = product.name;
    prodPrice.textContent = product.price;
    prodStock.textContent = product.stock;
    prodOrders.textContent = product.ratingsnumber.length;
    prodDescription.textContent = product.description;
    prodOrigins.textContent = product.origins;
    renderRatings(product.ratings);
    renderImage(product.gallery)

    console.log( product.stock, typeof( product.stock));
    if(product.stock === 0){
        cartBtn.setAttribute("disabled", true);
        buynowBtn.setAttribute("disabled", true);
    }
}

function renderImage(gallery){
    const circleContainer = document.querySelector(".circleContainer");
    const ulContainer = document.querySelector("ul");

    let dataIndex = 0;
    gallery.forEach(image => {
        const src = `../../Imgs/${image}`;

        const images = document.createElement("img");
        const slide = document.createElement("li");
        const circle = document.createElement("div");
    
        circle.classList.add("circle");
        
        slide.classList.add("slide");
        slide.setAttribute("data-current-slide", dataIndex + 1);
        circle.setAttribute("data-current", dataIndex + 1);
    
        if (dataIndex === 0) {
            slide.setAttribute("data-active", "");
            circle.classList.add("active");
        }
        
        images.src = src;
        slide.appendChild(images);
        circleContainer.appendChild(circle);
        ulContainer.appendChild(slide);

        dataIndex++
    });
}

function renderRatings(ratings) {
    const prodRatings = document.getElementById("rating");
    if(ratings === 0) {
        for(let i = 0; i < 5; i++){
            const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style = "width: 25px; height: 25px; color: #777; stroke: #777; ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>`;
            prodRatings.insertAdjacentHTML("beforeend", starSvg);
        }
    }else{
        for(let i = 0; i < ratings; i++){
            const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style = "width: 25px; height: 25px; color: yellow; stroke: yellow; ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>`;
            prodRatings.insertAdjacentHTML("beforeend", starSvg);
        }
    }
}

const buttons = document.querySelectorAll(".quantBtn");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("-----");
            const quantityField = button.parentElement.querySelector(".quantityField");
            let quantity = parseInt(quantityField.value);

            let add = button.dataset.button === "add" ? quantity += 1 : quantity -= 1;
            if(add >= 1){
                quantityField.value = add;
            }else if(add < 1){
                add += 1;
                console.log("quantity cannot be lessthan 1", add);
            }
        });
    });