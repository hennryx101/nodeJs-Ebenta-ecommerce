
async function OrderAgain(e){
    e.preventDefault();
    console.log(e.target.dataset.id);   
    const id = e.target.dataset.id;
    
    try {
        const res = await fetch(`/api/product/orderagain/${id}`, {
            method: "GET"
        });

        const data = await res.json();
        console.log(data.message);
    } catch (error) {
        console.log(error);
    }
}

export default OrderAgain;