import { Loading, RemoveModal } from "../utils/loading.js";
import { SuccessMessage } from "../utils/loading.js";

export async function Accept(e){
    e.preventDefault();
    Loading();
    const id = e.target.dataset.id;

    console.log(id);
    try {
        const res = await fetch(`/api/products/accept/${id}`, {
            method: "PATCH"
        });

        const data = await res.json();
        console.log(data.message);

        if(data.message === "success"){
            SuccessMessage();
            RemoveModal();
        }

    } catch (error) {
        SuccessMessage('', false);
        RemoveModal();
        console.log(error);
    }
}

export async function Cancel(e){
    e.preventDefault();
    Loading();
    const id = e.target.dataset.id;

    try {
        const res = await fetch(`/api/products/cancel/${id}`, {
            method: "PATCH"
        });

        const data = await res.json();
        console.log(data.message);
    
        if(data.message === "success"){
            SuccessMessage();
            RemoveModal();
        }

    } catch (error) {
        SuccessMessage('', false);
        RemoveModal();
        console.log(error);
    }
}