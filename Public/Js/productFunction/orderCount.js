import Throttle from "../utils/throtle.js";
import CheckBox from "./checkBox.js";

function OrderCount(){
    const buttons = document.querySelectorAll(".quantBtn");
    
    buttons.forEach(button => {
        button.addEventListener("click", Throttle( async (e) => {
            e.preventDefault();

            const quantityField = button.parentElement.querySelector(".quantityField");
            
            const cartItemLi = e.target.closest('.cart-item');
            const itemPriceElementP = cartItemLi.querySelector('.item-price').textContent;


            let quantity = parseInt(quantityField.value);

            let add = button.dataset.button === "add" ? quantity += 1 : quantity -= 1;
            if(add >= 1){
                quantityField.value = add;
            }else if(add < 1){
                add += 1;
            }
            
            const id = quantityField.dataset.id;
            const orderCounts = {
                ordercount: add,
                productprice: itemPriceElementP
            }
            console.log(orderCounts);

            try {
                const res = await fetch(`/api/product/remove/${id}`, {
                    method: "PATCH",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(orderCounts)
                });

                const data = await res.json();
                if(data.message === "success"){
                    CheckBox();
                }

            } catch (error) {
                console.log(error);
            }
        }));
    });
}

export default OrderCount;