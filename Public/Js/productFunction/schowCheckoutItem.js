import { ItemRecive } from "./reciveItem.js";
import CancelItem from "./cancelItem.js";
import RemoveItem from "./removeItem.js";

async function fetchCheckoutItems(){
    try {
        const checkOutItems = await fetch("/api/product/save", {
            method: "GET"
        });

        const data = await checkOutItems.json();

        if(data.message === "success"){
            for(const item of data.result){
                console.log(item.totalprice);
                if(item.receive === false){
                    console.log(item.product);
                    console.log(item);
                    renderItems(item.product, item._id, item.accepted, item.cancelled);
                }
            }

        }
    } catch (error) {
        console.log(error);
    }
}

fetchCheckoutItems();

function renderItems(data, id, accepted, cancelled) {
    const checkoutItemCont = document.querySelector(".checkout-items");

    const li = document.createElement("li");
    li.classList.add("checkout-item");
    const itemInfodiv = document.createElement("div");
    itemInfodiv.classList.add("item-info");
    const h3 = document.createElement("h3");
    h3.textContent = data.name;
    
    const pPrice = document.createElement("p");
    pPrice.textContent = `₱ ${data.price}`;

    const pQty = document.createElement("p");
    pQty.textContent = `QTY: ${data.orderCount}`;

    itemInfodiv.append(h3, pPrice, pQty);

    const wrapperAction = document.createElement("div");
    wrapperAction.classList.add("wrapper-action");

    const totalDiv = document.createElement("div")
    totalDiv.classList.add("total-wrapper");

    const h4 = document.createElement("h4");
    const total = parseInt(data.price) * parseInt(data.orderCount);
    h4.textContent = `Total: ₱ ${total}`;
    totalDiv.appendChild(h4);

    const itemAction = document.createElement("div");
    itemAction.classList.add("item-actions");

    const btnReceive = document.createElement("button");
    
    if(accepted){
        btnReceive.classList.add("order-receive-btn");
        btnReceive.setAttribute("data-id", id);
        btnReceive.textContent = "Receive";
        btnReceive.addEventListener("click", e => ItemRecive(e));
    }else if(cancelled){
        btnReceive.classList.add("order-pending-btn");
        btnReceive.textContent = "Cancelled";
    }else{
        btnReceive.classList.add("order-pending-btn");
        btnReceive.textContent = "Pending";
    }

    const btnCancel = document.createElement("button");
    if(cancelled){
        btnCancel.classList.add("order-cancel-btn");
        btnCancel.textContent = "Remove";
        btnCancel.setAttribute("data-id", id);
        btnCancel.addEventListener("click", e => RemoveItem(e));
    }else{
        btnCancel.classList.add("order-cancel-btn");
        btnCancel.textContent = "Cancel";
        btnCancel.setAttribute("data-id", id);
        btnCancel.addEventListener("click", e => CancelItem(e));
    }

    itemAction.append(btnReceive, btnCancel);
    wrapperAction.append(totalDiv, itemAction);
    li.append(itemInfodiv, wrapperAction);
    checkoutItemCont.appendChild(li);
}