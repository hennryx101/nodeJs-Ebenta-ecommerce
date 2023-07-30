import { Loading, RemoveModal, SuccessMessage } from "../utils/loading.js";
async function RemoveFunction(e){
    Loading();
    e.preventDefault();
    const id = e.target.dataset.id;

    console.log(id);
    try {
        const res = await fetch(`/api/checkout/removchekoutItem/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        console.log(data.message);
        if(data.message === "success"){
            SuccessMessage();
            RemoveModal();
            location.reload();
        }
        
    } catch (error) {
        SuccessMessage('', false);
        RemoveModal();
        console.log(error);
    }

}

export default RemoveFunction;