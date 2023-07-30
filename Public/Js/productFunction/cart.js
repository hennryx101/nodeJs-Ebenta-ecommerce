import RemoveFunction from "./remove.js";
import OrderCount from "./orderCount.js";
import CheckBox  from "./checkBox.js";
import { CheckoutFunction } from "./checkOut.js";
import { ShowRemoveBtn } from "./cartRemoveSwipe.js";

async function Cart(){
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPrice = document.querySelector(".total-price");
    try {
        const res = await fetch("/api/product/addCart", {
            method: "GET"
        });
        
        const data = await res.json();
        

        totalPrice.textContent = `Total: ₱ 0`;
        const priceList = data.priceList;
        console.log(priceList);
        totalPrice.textContent = `Total: ₱ ${priceList}`;

        for(const cartItemId in data.cartItems){
            const cartItem = data.cartItems[cartItemId];
            console.log(cartItem.name);

            const liItemContainer = document.createElement("li");
            liItemContainer.classList.add("cart-item");
            // checkBox
            const checkBoxWrapper = document.createElement("div");
            checkBoxWrapper.classList.add("checkbox-wrapper-12");
            const cbx = document.createElement("div");
            cbx.classList.add("cbx");  
            const checkBox = document.createElement("input");
            checkBox.setAttribute("id", "cbx-12");
            checkBox.type = "checkbox";
            checkBox.classList.add("checkBox");
            checkBox.value = cartItem.cartId;

            const labelCbx = document.createElement("label");
            labelCbx.htmlFor = "cbx-12";
            const svgFirst = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none"><path d="M2 8.36364L6.23077 12L13 2"></path></svg>`;

            const svgSec = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                         <defs>
                             <filter id="goo-12">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                                 <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                                 <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                             </filter>
                         </defs>
                    </svg>`
            cbx.append(checkBox, labelCbx);
            cbx.insertAdjacentHTML("beforeend", svgFirst);

            checkBoxWrapper.appendChild(cbx);
            checkBoxWrapper.insertAdjacentHTML("beforeend", svgSec);
            
            // cart details
            const itemDetailsContainer = document.createElement("div");
            itemDetailsContainer.classList.add("item-details");
                const containerDetails = document.createElement("div");
                containerDetails.classList.add("containerDetails");
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add("imageContainer");
                    const image = document.createElement("img");
                    image.src = `../../Imgs/${cartItem.gallery[0]}`;
                    image.classList.add("image-display");
                    imageContainer.appendChild(image);

                    const detailsContainer = document.createElement("div");
                    detailsContainer.classList.add("details");

                        const h3Name = document.createElement("h3");
                        h3Name.classList.add("item-name");
                        h3Name.textContent = cartItem.name;
                        const pPrice = document.createElement("p");
                        pPrice.classList.add("item-price");
                        pPrice.textContent = cartItem.price;

                        const quantityCont = document.createElement("div");
                        quantityCont.classList.add("quantity");

                            const addbtn = document.createElement("button");
                            const decrebtn = document.createElement("button");
                            addbtn.setAttribute("data-button", "add");
                            decrebtn.setAttribute("data-button", "remove");
                            addbtn.classList.add("quantBtn");
                            decrebtn.classList.add("quantBtn");

                            addbtn.textContent = "+";
                            decrebtn.textContent = "-";
                            
                            const quantityField = document.createElement("input");
                            quantityField.type = "number";
                            quantityField.classList.add("quantityField");
                            quantityField.value = cartItem.orderCount;
                            quantityField.setAttribute("data-id", cartItem.cartId);

                        quantityCont.append(addbtn, quantityField, decrebtn);
                        console.log("Done");
                    detailsContainer.append(h3Name, pPrice);
                    detailsContainer.append(quantityCont);
                containerDetails.append(imageContainer, detailsContainer);
            itemDetailsContainer.appendChild(containerDetails);

            // button
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-item");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", (e) => RemoveFunction(e, cartItem.cartId));
            liItemContainer.append(checkBoxWrapper, itemDetailsContainer, removeBtn);
            cartItemsContainer.appendChild(liItemContainer);
        }
        ShowRemoveBtn();
        OrderCount();
        CheckBox();

    } catch (error) {
        
    }
}

Cart();
CheckoutFunction();