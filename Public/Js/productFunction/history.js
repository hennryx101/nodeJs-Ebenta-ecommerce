import OrderAgain from "./orderAgain.js";

async function fetchHistory(){
    try {
        
        const res = await fetch("/api/product/history", {
            method: "GET"
        });

        const data = await res.json();

        console.log(data.message);
        if(data.message === "success"){
            console.log(data.result);
            
            for(const item of data.result){
                console.log(item);
                console.log(item.product);
                renderHistory(item.product, item);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function renderHistory(data, item){

    // container ul
    const HistoryContainer = document.querySelector(".checkout-items");
    
    // container Li
    const checkoutItemLi = document.createElement("li");
    checkoutItemLi.classList.add("checkout-item");

    // image container
    const imgCont = document.createElement("div");
    imgCont.classList.add("image-container");
    const img = document.createElement("img");
    img.alt = "product image";
    const srcs = data.gallery[0];
    console.log(srcs);
    img.src = `../../Imgs/${srcs}`;
    imgCont.appendChild(img);

    // item info Container
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");
    const h3 = document.createElement("h3");
    h3.textContent = `Product Name: ${data.name}`;

    const pPrice = document.createElement("p");
    pPrice.textContent = `Price: ${data.price}`;

    const pQuant = document.createElement("p");
    pQuant.textContent = `Quantity: ${data.orderCount}`;
    const pStats = document.createElement("p");

    let status = "Cancelled";
    console.log(item.receive);
    if(item.receive){
        status = "Received";
    }

    pStats.textContent = `Status: ${status}`;

    itemInfo.append(h3, pPrice, pQuant, pStats);

    // Action container
    const actionCont = document.createElement("div");
    actionCont.classList.add("primary-action-container");

    const totalP = document.createElement("div");
    totalP.classList.add("total-price");

    const pTotalP = document.createElement("p");
    pTotalP.textContent = `Total price: ${item.totalprice}`;
    totalP.appendChild(pTotalP);

    const actions = document.createElement("div");
    actions.classList.add("item-actions");

    const btnOrdA = document.createElement("button");
    btnOrdA.classList.add("order-receive-btn");
    btnOrdA.textContent = "Order Again";
    btnOrdA.setAttribute("data-id", item._id);
    btnOrdA.addEventListener("click", e => OrderAgain(e));
    actions.appendChild(btnOrdA);

    actionCont.append(totalP, actions);
    checkoutItemLi.append(imgCont, itemInfo, actionCont);
    HistoryContainer.appendChild(checkoutItemLi);
}

fetchHistory();