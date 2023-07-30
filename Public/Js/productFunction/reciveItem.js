import { RateProduct } from "./rateItem.js";

export async function ItemRecive(e) {
    e.preventDefault();
    
    console.log("click", e.target.dataset.id);

    const id = e.target.dataset.id;
    const isReceived = {
        receive: true
    }

    try {
        const res = await fetch(`/api/product/orderReceive/${id}`, {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(isReceived)
        });

        const data = await res.json();
        if(data.message === "success"){
            console.log(data.result.product);
            
            RateProduct(data.result.product);
        }
    } catch (error) {
        console.log(error);
    }
}