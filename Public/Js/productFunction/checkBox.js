function CheckBox() {
    const checkboxs = document.querySelectorAll(".checkBox");

    checkboxs.forEach(checkBox => {
        checkBox.addEventListener("change", async (e) => checkBoxChanges(e));
    });

    async function checkBoxChanges(e){
        const checkBox = e.target;
        const id = checkBox.value;

        let check = checkBox.checked;
        if (!check) {
            console.log(check, "false");
            checkedItem(false ,id);
        } else{
            console.log(check, "true");
            checkedItem(true ,id);
        }

        const item = await GetItemStats(id);
        const ischeck = item.ischecked; 
        if(ischeck){
            checkBox.checked = ischeck;
        }
    }

    async function initializeCheckboxes() {
        for (const checkBox of checkboxs) {
            const id = checkBox.value;
            const item = await GetItemStats(id); 
            const ischeck = item.ischecked;
          
            if (checkBox.checked !== ischeck) {
                checkBox.checked = ischeck;
            }
            checkedItem(ischeck, id);
        }
    }
    initializeCheckboxes();
}

export async function GetItemStats(id) {
    const res = await fetch(`/api/product/remove/${id}`);
    const data = await res.json();

    if (data.result && data.result.length > 0) {
        const item = data.result[0];
        return item;
    } else {
        return 0;
    }
}

async function checkedItem(check, id){
    const totalPrice = document.querySelector(".total-price");
    const checkItem = {
        ischecked: check
    }
    try {
        const res = await fetch(`/api/product/save/${id}`, {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(checkItem)
        });

        const data = await res.json();
        if(data.message === "success"){
            totalPrice.textContent = `Total: ₱ 0`;
            const priceList = data.priceList;
            console.log(priceList);
            totalPrice.textContent = `Total: ₱ ${priceList}`;
        }
    } catch (error) {
        console.log(error);
    }

}
export default CheckBox;