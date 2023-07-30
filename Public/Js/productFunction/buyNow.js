import { Loading, RemoveModal, SuccessMessage } from "../utils/loading.js";
function BuyNow() {
    const buyBtn = document.querySelector(".buy");

    buyBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        buyBtn.textContent = "Buy now...";
        Loading();
        const prodId = e.target.dataset.id;
        const quantityField = document.querySelector(".quantityField").value;

        try {

            const getProd = await fetch(`/api/products/getProduct/${prodId}`, {
                method: "GET"
            });
    
            const product = await getProd.json();
            let stock = 0;
            for(const prodStock in product){
                stock = product[prodStock].stock;
            }

            if(stock < quantityField){
                RemoveModal();
                alert("Sorry, there is not enough stock to fulfill your order.");
                return;
            }


            const buyProduct = {
                productid: prodId,
                ordercount: quantityField
            }

            const res = await fetch("/api/product/buynow", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(buyProduct)
            });

            const data = await res.json();
            console.log(data.message);
            if(data.message){
                RemoveModal();
                SuccessMessage();
                buyBtn.textContent = "Buy now";
            }

        } catch (error) {
            RemoveModal();
            console.log(error);
        }
    });
}

export default BuyNow;