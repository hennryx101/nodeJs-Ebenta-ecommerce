import {Loading, RemoveModal, SuccessMessage } from "../utils/loading.js";

const addProductForm = document.querySelector(".addProductForm");
const nameE = document.querySelector(".name");
const priceE = document.querySelector(".price");
const stockE = document.querySelector(".stock");
const descriptionE = document.querySelector(".description");
const originE = document.querySelector(".origin");
const imageE = document.querySelector(".imageE");

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    Loading();

    nameE.textContent = "";
    priceE.textContent = "";
    stockE.textContent = "";
    descriptionE.textContent = "";
    originE.textContent = "";
    imageE.textContent = "";

    const submitBtn = addProductForm.querySelector("button");
    const nameField = addProductForm.querySelector("#name");
    const priceField = addProductForm.querySelector("#price");
    const stockField = addProductForm.querySelector("#stock");
    const descriptionField = addProductForm.querySelector("#description");
    const originField = addProductForm.querySelector("#origins");
    submitBtn.textContent = "Adding...";
    
    const files = addProductForm.querySelector("#files");
    const formData = new FormData();

    formData.append('name', addProductForm.name.value);
    formData.append('price', addProductForm.price.value);
    formData.append('stock', addProductForm.stock.value);
    formData.append('description', addProductForm.description.value);
    formData.append('origins', addProductForm.origins.value);

    for(let i = 0; i < files.files.length; i++){
        formData.append("files", files.files[i]);
    }

    console.log(...formData);
    try {
        const res = await fetch("/api/products/", {
            method: "POST",
            body: formData
        });
    
        const data = await res.json();
        if(data.message === "product save"){
            files.value = "";
            nameField.value = "";
            stockField.value = "";
            priceField.value = "";
            descriptionField.value = "";
            originField.value = "";

            submitBtn.textContent = "Add";
            window.location.href = "/products/products.html";

        }

        if(data.errors){
            submitBtn.textContent = "Add";
            const error = data.errors;
            nameE.textContent = error.name;
            imageE.textContent = error.gallery;
            priceE.textContent = error.price;
            stockE.textContent = error.stock;
            descriptionE.textContent = error.description;
            originE.textContent = error.origins;
        }

        submitBtn.textContent = "Add";
        RemoveModal();
    } catch (error) {
        SuccessMessage('', false);
        RemoveModal();
        console.log(error);
    }

});

const ulContainer = document.querySelector("ul");
const circleContainer = document.querySelector(".circleContainer");

document.querySelector("#files").addEventListener('change', async (e) => {
    e.preventDefault();
    renderImage();
});

async function renderImage(){
    
    const files = document.querySelector("#files").files;

    if (circleContainer.hasChildNodes()) {
        const circles = document.querySelectorAll(".circle");
        circles.forEach(cr => {
            cr.remove();
        })
    }
    const imagesLi = ulContainer.querySelectorAll("li");
    imagesLi.forEach(img => {
        img.remove();
    });

    const addSlide = (file, index) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const image = document.createElement("img");
                const slide = document.createElement("li");
                const circle = document.createElement("div");

                circle.classList.add("circle");
                
                slide.classList.add("slide");
                slide.setAttribute("data-current-slide", index + 1);
                circle.setAttribute("data-current", index + 1);

                if (index === 0) {
                    slide.setAttribute("data-active", "");
                    circle.classList.add("active");
                }
                
                image.src = e.target.result;
                slide.appendChild(image);
                circleContainer.appendChild(circle);
                ulContainer.appendChild(slide);
                
                resolve();
            }
            reader.onerror = function(e) {
                reject(e);
            }
            reader.readAsDataURL(file);
        });
    };

    for (let i = 0; i < files.length; i++) {
        await addSlide(files[i], i);
    }
}

export default renderImage;