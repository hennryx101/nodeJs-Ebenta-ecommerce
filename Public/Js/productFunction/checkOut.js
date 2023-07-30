import { Loading,  RemoveModal, SuccessMessage } from "../utils/loading.js";

export function CheckoutFunction(){
    const checkout =  document.querySelector(".checkout");
    
    // checkout the item in cart
    checkout.addEventListener("click", async (e) => {
        e.preventDefault();
        Loading();
        checkout.textContent = "Checkout...";
        try {
            let checkOutItem = [];

            const getProduct = await fetch("/api/product/addCart", {
                method: "GET"
            });
            const product = await getProduct.json();
            
            console.log(product);
            for(const cartItem in product.cartItems){
                const Items = product.cartItems[cartItem];

                if(Items.ischeck){
                    checkOutItem.push({
                        product: Items,
                        totalprice: product.priceList
                    });
                }
            }
            console.log(checkOutItem, "checkOutItem");

            const checkoutRes = await fetch("/api/product/save",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(checkOutItem)
            });
    
            const result = await checkoutRes.json();
            if(result.message){
                console.log(result.message);
                console.log(result.CheckoutItem);

                const productIds = [];
                result.CheckoutItem.forEach(itemid => {
                    const ids = itemid.product.cartId;
                    console.log(ids);
                    productIds.push(ids);
                });

                console.log(productIds);
                removeAllItemsFromCart(productIds)
                checkout.textContent = "Checkout";
            }
        } catch (error) {
            RemoveModal();
            console.log(error);
            SuccessMessage("", false);

        }
    });
}


async function removeAllItemsFromCart(ids){
    try {
        const removeFromcart = await fetch("/api/product/removeFromCart", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(ids)
        });

        const result = await removeFromcart.json();
        if(result.message){
            console.log(result.message);
            RemoveModal();
            SuccessMessage();
            setTimeout(() => {
                location.reload();
            },1000);
        }
    } catch (error) {
        console.log(error);
        SuccessMessage("", false);
    }
}
