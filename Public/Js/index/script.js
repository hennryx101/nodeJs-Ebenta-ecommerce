import ScrollFunction from "../utils/scrollFunction.js";
import {Loading, RemoveModal, SuccessMessage} from "../utils/loading.js";
import { CartSvg } from "../utils/svg.js";
import fetchOrders from "../products/acceptOrders.js";
import { ShowLeftColumn } from "../utils/showLeftColumn.js";

const topNav = document.querySelector(".topNav");
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");


ScrollFunction(true);
async function fetchUser(){
    try {
        Loading();
        const res = await fetch("/api/auth/user/user", {
            method: "GET"
        });
    
        const data = await res.json();
        // a link for cart
        const svgContainerLi = document.createElement("li");
        const svgContainerDiv = document.createElement("div");
        const svgContainer = document.createElement("a");
        svgContainerLi.classList.add("primary-nav");
        svgContainerDiv.classList.add("primary-nav");
        svgContainerDiv.classList.add("cart");
        svgContainer.href = "products/cart.html";
        svgContainerDiv.appendChild(svgContainer);
        svgContainerLi.appendChild(svgContainerDiv)

        // checkout items a link
        const checkOutItemLi = document.createElement("li");
        const checkOutItemDiv = document.createElement("div");
        const checkoutItem = document.createElement("a");
        checkOutItemDiv.classList.add("primary-nav");
        checkOutItemLi.classList.add("primary-nav");
        checkOutItemLi.classList.add("zoom");
        checkoutItem.href = "products/checkout.html";
        checkoutItem.textContent = "Checkout Items";
        checkOutItemDiv.appendChild(checkoutItem)
        checkOutItemLi.appendChild(checkOutItemDiv);

        // transaction history link
        const transacContainer = document.createElement("li");
        const transacDiv = document.createElement("div");
        const transacA = document.createElement("a");
        transacDiv.classList.add("primary-nav");
        transacContainer.classList.add("primary-nav");
        transacContainer.classList.add("zoom");
        transacA.href = "products/history.html";
        transacA.textContent = "History ";
        transacDiv.appendChild(transacA);
        transacContainer.appendChild(transacDiv);
        
        // admin signUp
        const signUpButton = document.createElement("li");
        const signUpdiv = document.createElement("div");
        const signUpA = document.createElement("a");
        signUpdiv.classList.add("primary-nav");
        signUpButton.classList.add("primary-nav");
        signUpButton.classList.add("zoom");
        signUpButton.classList.add("adminSignup");

        // link to sign up
        signUpA.href = "./accounts/adminSignup.html";
        signUpA.textContent = "Add account";
        signUpdiv.appendChild(signUpA);
        signUpButton.appendChild(signUpdiv);

        // accept orders 
        const AcceptOrdersLi = document.createElement("li");
        const AcceptOrdersDiv = document.createElement("div");
        const AcceptOrdersA = document.createElement("a");

        AcceptOrdersDiv.classList.add("primary-nav");
        AcceptOrdersLi.classList.add("primary-nav");
        AcceptOrdersLi.classList.add("zoom");
        AcceptOrdersA.href = "./products/orders.html";
        AcceptOrdersA.textContent = "Accept Orders";

        AcceptOrdersDiv.appendChild(AcceptOrdersA);
        AcceptOrdersLi.appendChild(AcceptOrdersDiv);

        // user name container
        const userLi = document.createElement("li");
        const userDiv = document.createElement("div");
        const userA = document.createElement("a");
        userA.href = "./accounts/account.html";
        userDiv.classList.add("primary-nav");
        userA.appendChild(userDiv);
        userLi.classList.add("primary-nav");
        const accountIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`;
       

        // svg cart
        const bg30Color = getComputedStyle(document.documentElement).getPropertyValue('--bg-30');
        const color20 = getComputedStyle(document.documentElement).getPropertyValue("--bg-20");
        const cart = CartSvg(color20, bg30Color);

        console.log(data.user);
        
        if(!data.user.isAdmin){
            svgContainer.insertAdjacentHTML("beforeend", cart);
            topNav.append(svgContainerLi);
        }
        
        // check if user is a admin

        const Acceptcontainer = document.createElement("div");
        Acceptcontainer.classList.add("Accept-container");

        const tableWrapper = document.createElement("div");
        tableWrapper.classList.add("wrapper");

        const tableOrders = document.createElement("table");
        tableOrders.classList.add("table-orders");
        const caption = document.createElement("caption");
        caption.textContent = "Orders";

        const tHead = document.createElement("thead");
        const trHead = document.createElement("tr");

        const th1 = document.createElement("th");
        th1.textContent = "Customer Name";

        const th2 = document.createElement("th");
        th2.textContent = "Order Date";

        const th3 = document.createElement("th");
        th3.textContent = "Items";

        const th4 = document.createElement("th");
        th4.textContent = "Total Amount";

        const th5 = document.createElement("th");
        th5.textContent = "Status";

        const th6 = document.createElement("th");
        th6.textContent = "Action";


        trHead.append(th1, th2, th3, th4, th5, th6);
        tHead.appendChild(trHead);

        const tBody = document.createElement("tbody");

        tableOrders.append(caption, tHead, tBody);
        tableWrapper.appendChild(tableOrders);
        Acceptcontainer.append(tableWrapper);

        if(data.user.isAdmin){
            ScrollFunction(false);
            fetchOrders();
        }

        if(data.user.isAdmin){
            const mainContainer = document.querySelector(".main-container");
            mainContainer.replaceChildren();
            mainContainer.style.paddingTop = "30px";
            mainContainer.appendChild(Acceptcontainer);

            const productA = document.createElement("a");
            productA.href = "./products/products.html";

            const addPrd = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/></svg>`
            productA.insertAdjacentHTML("beforeend", addPrd);
            svgContainer.appendChild(productA);
            topNav.append(svgContainerLi);

        }
        

        if(data.user){
            signup.remove();
            login.remove();

            userDiv.insertAdjacentHTML("beforeend", accountIcon);
            userLi.appendChild(userA);
            topNav.append(userLi);
        }
        
        if(data.errors){
            console.log(data.errors);
            RemoveModal();
            SuccessMessage("", false);
        }
        ShowLeftColumn();
        RemoveModal();
    } catch (error) {
        RemoveModal();
        SuccessMessage("", false);
        console.log(error);
    }

}

fetchUser();

async function fetchProduct() {

    try {
        const res = await fetch("/api/products/", {
            method: "GET"
        });
        const data = await res.json();

        if(data.products){
            renderProducts(data.products);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchProduct();

const ratings = document.querySelectorAll(".rating");
const ratingNumber = document.querySelector(".ratingNumber");
ratings.forEach(rating => {
    rating.addEventListener("click", (e) => {
        
        if(rating.classList.contains("selected")){
            rating.classList.remove('selected');
            ratingNumber.value = '';
            return;
        }
        ratings.forEach(rate => {
            rate.classList.remove('selected');
        });
        rating.classList.add('selected');
        const rates = rating.dataset.value;
        ratingNumber.value = rates;
    });
});

function renderProducts(products) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.replaceChildren();

    console.log(products);
    products.forEach(product => {
        const Container = document.createElement("a");
        const liCard = document.createElement('li');
        const divCard = document.createElement('div');
        const imgCard = document.createElement("img");
        const divCardTxt = document.createElement('div');
        const divCardimg = document.createElement('div');
        const h4Card = document.createElement('h4');
        const pCardOrders = document.createElement('p');
        const pCardprice = document.createElement('p');
        const pCardStock = document.createElement('p');
        const pCardratings = document.createElement('p');
        const pCardorigin = document.createElement('p');
        const imgSrc = `../../Imgs/${product.gallery[0]}`;
        
        Container.href =  `products/viewProductDetails.html?id=${product._id}`;

        divCardTxt.classList.add("card-text");
        divCard.classList.add("product-card");
        divCardimg.classList.add("product-img");
        pCardorigin.classList.add("origin");
        pCardOrders.classList.add("orders");
        pCardprice.classList.add("price");
        pCardStock.classList.add("stock");
        liCard.classList.add("float-on-hover");
        // liCard.addEventListener("click", (e) => OpenCard(e, product._id));

        pCardorigin.style.color = "rgba(0,0,0,.65)";

        imgCard.src = imgSrc;
        h4Card.textContent = product.name;
        pCardprice.textContent = `₱${product.price}`;
        pCardStock.textContent = `Stock: ${product.stock}`;
        pCardOrders.textContent = `Orders: ${product.ratingsnumber.length}`;
        pCardorigin.textContent = product.origins;

        const starRatings = product.ratings;
        const bg20Color = getComputedStyle(document.documentElement).getPropertyValue('--bg-20');

        if(starRatings === 0){
            const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style = "width: 15px; height: 15px; background-color: ${bg20Color}" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>`;
                            
            pCardratings.insertAdjacentHTML("beforeend", starSvg);
        }else{
            for(let i = 0; i < starRatings; i++){
                const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style = "width: 15px; height: 15px; fill: yellow; color: yellow; stroke: yellow; background-color: ${bg20Color};">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>`;
                
                pCardratings.insertAdjacentHTML("beforeend", starSvg);
            }
        }
      
        divCardimg.appendChild(imgCard);
        divCardTxt.append(pCardratings, h4Card, pCardprice, pCardStock, pCardOrders, pCardorigin);
        divCard.append(divCardimg, divCardTxt);
        Container.appendChild(divCard);
        liCard.appendChild(Container);
        cardsContainer.appendChild(liCard);
    });
}

const filterForm = document.querySelector(".filter-form");

filterForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const filterData = {
        minPrice: filterForm.minPrice.value,
        maxPrice: filterForm.maxPrice.value,
        ratings: filterForm.ratings.value,
    }

    const res = await fetch("/api/products/?" + new URLSearchParams(filterData), {
        method: "GET",
        headers: { "Content-type": "application/x-www-form-urlencoded" }
    });

    const data = await res.json();

    console.log(data.products);
    if(data.products){
        renderProducts(data.products);
    }
});
