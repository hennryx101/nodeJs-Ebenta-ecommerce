async function CancelItem(e){
    e.preventDefault();
    
    try {
        const id = e.target.dataset.id;
        
        const res = await fetch(`/api/product/cancel/${id}`, {
            method: "PATCH",
        })

        const data = await res.json();
        console.log(data.message);
        if(data.message === "success"){
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

export default CancelItem;