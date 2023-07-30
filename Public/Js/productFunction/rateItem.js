export function RateProduct(prod){
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "rateProductDialog");

    const h2 = document.createElement("h2");
    h2.textContent = "Rate Product";
    const p = document.createElement("p");
    p.textContent = "Please rate the product. Your feedback is important to us!";

    const form = document.createElement("form");
    form.setAttribute("id", "ratingForm");

    const btn = document.createElement("button");
    btn.setAttribute("disabled", true);
    btn.textContent = "Submit";
    console.log(prod._id, "-----------prod._id---------");

    btn.addEventListener("click", e => clickme(e, prod._id));
    const ratingCont = document.createElement("div");
    ratingCont.classList.add("rating-stars");

    for(let i = 0; i<5; i++){
        const span = document.createElement("div");
        span.classList.add("star");
        span.setAttribute("data-rate", i+1);

        const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        starSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        starSvg.setAttribute("fill", "none");
        starSvg.setAttribute("viewBox", "0 0 24 24");
        starSvg.setAttribute("stroke-width", "1.5");
        starSvg.setAttribute("stroke", "currentColor");
        starSvg.classList.add("w-6", "h-6");
        starSvg.style.cssText = "width: 40px; height: 40px; color: #777; stroke: #777; background-color: #ffffff; z-index: 0;";
        starSvg.dataset.rate = i + 1;
        starSvg.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        `;
        starSvg.addEventListener("click", e => rateStar(e));
                                
        span.appendChild(starSvg);
        ratingCont.append(span);
    }
    form.append(h2, p, ratingCont, btn);
    dialog.append(form);

    document.body.appendChild(dialog);  
    const style = 
                    `dialog {
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        padding: 0;
                        border: none important;
                        width: 400px;
                        height: 400px;
                        background-color: rgb(255, 255, 255);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 1.2rem;
                      }
                    
                    dialog h2 {
                        margin: 0;
                        font-size: 20px;
                        text-align: center;
                    }
                    
                    form {
                        padding: 20px;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-content: flex-start;
                        justify-content: center;
                        align-items: center;
                    }


                    button {
                      padding: 10px 20px;
                      background-color: #068FFF;
                      color: #fff;
                      border: none;
                      border-radius: 3px;
                      cursor: pointer;
                    }
                    
                    button:hover{
                        background-color: #4E4FEB;
                      }

                    button[disabled="true"]{
                        background-color: #5b6065;
                    }

                    button[disabled="true"]:hover{
                        cursor:not-allowed;
                        border: 1px solid red;
                      }
                  
                    .rating-stars {                  
                        background-color: #ffffff;                
                        border-radius: 13px;
                        width: 300px;
                        height: 100px;
                        display: flex;
                        justify-content: center;
                        margin: 20px 0;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: center;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    .rating-stars .star {
                        background-color: #ffffff;                
                        cursor: pointer;
                        font-size: 1rem;
                        color: #FFD700;
                    }`;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    dialog.appendChild(styleElement);
    dialog.showModal();
}

function rateStar(e){
    e.preventDefault();

    const starSvg = e.target.closest(".star");
    const form = document.querySelector("#ratingForm");
    const btn = form.querySelector("button");

    if (!starSvg) return;
    const starCount = starSvg.dataset.rate;
    starSvg.classList.add("selected");

    const stars = document.querySelectorAll(".star");

    for (let i = 0; i < 5; i++) {
        stars[i].children[0].style.stroke = "#777";
        stars[i].children[0].style.fill = "#777";
    }

    for (let i = 0; i < starCount; i++) {
        stars[i].children[0].style.stroke = "yellow";
        stars[i].children[0].style.fill = "yellow";
        btn.removeAttribute("disabled");
    }
}

async function clickme(e, id){
    e.preventDefault();
    console.log(id, "--------------------");

    const dialog = document.querySelector("dialog");

    const selected = document.querySelector(".selected");
    const starCount = selected.dataset.rate

    const ratings = {
        rating: starCount
    }
    
    
    try {
        console.log(id);
        const res = await fetch(`/api/ratings/rateproduct/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(ratings)
        });

        const data = await res.json();
        console.log(data);
        if(data.message === "success"){   
            location.reload();
            dialog.remove();
        }
    } catch (error) {
        console.log(error);
    }
}