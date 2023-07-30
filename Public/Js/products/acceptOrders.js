import { Accept, Cancel } from "../productFunction/acceptOrdersFunctions.js";

let isRendered = true;

async function fetchOrders(){
    
    isRendered = false;
    try {
        const res = await fetch("/api/products/accept", {
            method: "GET"
        });

        const data = await res.json();
        if(data.message === "success"){
            const orderstable = document.querySelector(".table-orders");
            const tBody = orderstable.querySelector("tbody");
            tBody.replaceChildren();

            for(const orders of data.Orders){
                renderOrders(orders.product, orders.username, orders.orderdate, orders.totalprice, orders.accepted, orders.cancelled, orders._id);
            }
        }
        isRendered = true;
    } catch (error) {
        console.log(error);
    }
}

setInterval(() => {

    if(isRendered){
        fetchOrders();
    }

}, 1000);


function renderOrders(product, username, orderdate, totalprice, accepted, cancelled, id){
    const orderstable = document.querySelector(".table-orders");
    const tBody = orderstable.querySelector("tbody");

    const tr = document.createElement("tr");

    const td2 = document.createElement("td");
    td2.setAttribute("data-cell", "Customer Name");
    td2.textContent = username;

    const td3 = document.createElement("td");
    td3.setAttribute("data-cell", "Order Date");
    td3.textContent = orderdate;

    const td4 = document.createElement("td");
    td4.setAttribute("data-cell", "Items");
    td4.textContent = product.name;

    const td5 = document.createElement("td");
    td5.setAttribute("data-cell", "Total Amount");
    td5.textContent = `$${totalprice}`;

    const td6 = document.createElement("td");
    td6.setAttribute("data-cell", "Status");
    td6.textContent = "Pending";

    if(accepted){
        td6.textContent = "Completed";
    }

    if(cancelled){
        td6.textContent = "Cancelled";
    }

    const td7 = document.createElement("td");
    td7.setAttribute("data-cell", "Action");

    const acceptBtn = document.createElement("button");
    acceptBtn.className = "accept-btn";
    acceptBtn.textContent = "Accept";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel-btn";
    cancelBtn.textContent = "Cancel";

    if(accepted || cancelled){
        acceptBtn.setAttribute("disabled", true);
        cancelBtn.setAttribute("disabled", true);
    }
    acceptBtn.setAttribute("data-id", id)
    cancelBtn.setAttribute("data-id", id)
    acceptBtn.addEventListener("click", e => Accept(e));
    cancelBtn.addEventListener("click", e => Cancel(e));
    
    td7.append(acceptBtn, cancelBtn);

    tr.append(td2, td3, td4, td5, td6, td7);

    tBody.appendChild(tr);
}

export default fetchOrders;