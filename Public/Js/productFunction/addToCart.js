import Throttle from "../utils/throtle.js";
import { Loading, RemoveModal, SuccessMessage } from "../utils/loading.js";

function AddCart(){
    const addCartbtn = document.querySelector(".cart");
    const messageDiv = document.querySelector(".message");
    
    addCartbtn.addEventListener("click", Throttle( async (e) => {
        addCartbtn.textContent = "Add Cart...";
        Loading("Adding to Cart");
        try {
            let quantityField = document.querySelector(".quantityField").value;
            const prodId = addCartbtn.dataset.id;
           
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

            const cartProduct = {
                productid: prodId,
                ordercount: quantityField
            }

            const res = await fetch("/api/product/addCart", {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify(cartProduct)
            });
    
            const data = await res.json();
            if(data.message){
                console.log(data.message);
                messageDiv.textContent = data.message;
                RemoveModal();
                SuccessMessage();
                messageDiv.textContent = "";
            }
            addCartbtn.textContent = "Add Cart";
        } catch (error) {
            addCartbtn.textContent = "Add Cart";
            RemoveModal();
            console.log(error);
        }
    }));
}

export default AddCart;