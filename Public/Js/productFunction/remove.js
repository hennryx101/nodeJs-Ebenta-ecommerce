async function RemoveFunction(e, id){
    e.preventDefault();
    console.log(id);

    if(window.confirm("are you sure you want to remove this item?")){
        const res = await fetch(`/api/product/remove/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        if(data.message === "success"){
            location.reload();
        }
    }
}

export default RemoveFunction;