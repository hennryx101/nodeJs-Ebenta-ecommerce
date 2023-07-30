// import  hiddenFunctionIfImgDeleteUpdateTheProduct  from "../products/viewProduct.js";
import  renderNewImage  from "../products/viewProduct.js";

const fileInput = document.getElementById('files');
const removeBtn = document.querySelector(".remove");
const buttons = document.querySelectorAll("[data-carousel-button]");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");


let i = 0;
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

        const circles = document.querySelectorAll(".circle");

        const activeSlide = slides.querySelector("[data-active]");

        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        
        if(newIndex < 0) newIndex = slides.children.length - 1;
        if(newIndex >= slides.children.length) newIndex = 0;

        if(slides.children.length - 1 > 1){
            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;
        }

        circles.forEach(circle => {
            const circleIndex = parseInt(circle.getAttribute("data-current"));
            if (circleIndex === newIndex + 1) {
                circle.classList.add("active");
            } else {
                circle.classList.remove("active");
            }
        });
        i = newIndex;
    })
});

removeBtn.addEventListener('click', async (e) => removeImg(e, i));

async function removeImg(e, i) {
    e.preventDefault();
    removeBtn.textContent = "Removing...";
    
    const fileInputHidden = document.querySelector(".fileHidden");
    const li = document.querySelector("[data-active]");
    const liCount = document.querySelectorAll("li").length;
    if (liCount === 1) {
        console.log("no more");
        alert("Product image cannot be removed! The product should have at least one image.");
        return;
    }

    if (li) {
        const liValue = parseInt(li.getAttribute("data-current-slide")) - 1;

        if (i === liValue) {
            li.remove();

            const nextLi = li.nextElementSibling;
            if (nextLi) {
                nextLi.setAttribute("data-current-slide", "");
            }
        }
    }
   
    console.log(fileInput.files.length);

    if(fileInput.files.length === 0){
        const myFiles = Array.from(fileInputHidden.files);
        myFiles.splice(i, 1);
      
        const dataTransfer = new DataTransfer();
        myFiles.forEach((file) => dataTransfer.items.add(file));
    
        fileInputHidden.value = '';
    
        fileInputHidden.files = dataTransfer.files;
        fileInput.files = dataTransfer.files;
        renderNewImage();
    }
    else{
        const myFiles = Array.from(fileInput.files);
        myFiles.splice(i, 1);
      
        const dataTransfer = new DataTransfer();
        myFiles.forEach((file) => dataTransfer.items.add(file));
    
        fileInput.value = '';
    
        fileInputHidden.files = dataTransfer.files;
        fileInput.files = dataTransfer.files;
        renderNewImage();
    }
    removeBtn.textContent = "Remove";
}


// this remove function is to remove an image it works fine but it need to update every time you delete an image and it's a no for me.
// removeBtn.addEventListener('click', async (e) => remove(e, i));
async function remove(e, i) {
    e.preventDefault();
    if(window.confirm("are you sure you want to delete this image? I would like to remind you that if you remove a image it would be automatically updated the product")){

        removeBtn.textContent = "Removing...";
        
        const li = document.querySelector("[data-active]");
        const liCount = document.querySelectorAll("li").length;
        if (liCount === 1) {
            console.log("no more");
            alert("Product image cannot be removed! The product should have at least one image.");
            return;
        }

        if (li) {
            const liValue = parseInt(li.getAttribute("data-current-slide")) - 1;

            if (i === liValue) {
                li.remove();

                const nextLi = li.nextElementSibling;
                if (nextLi) {
                    nextLi.setAttribute("data-current-slide", "");
                }
            }
        }
        
        let imageArray = [];
        const liImages = document.querySelectorAll("li");
        liImages.forEach((img) => {
            console.log("else");
            const image = img.querySelector("img");
            const src = image.getAttribute("src");
            console.log(src, "line 78");
            const filename = src.split("/").pop();
            console.log(filename, "filename");
            imageArray.push(filename);
        });
        
        console.log(imageArray, "line 77");

        const files = imageArray.map(async (filename) => {
            const imageUrl = `../../../Imgs/${filename}`;
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return new File([blob], filename);
        });
        
        Promise.all(files)
        .then((fileArray) => {
                console.log(fileArray);
                const dataTransfer = new DataTransfer();
                for (const file of fileArray) {
                    dataTransfer.items.add(file);
                }
                console.log(dataTransfer.files);
                fileInput.files = dataTransfer.files;
                hiddenFunctionIfImgDeleteUpdateTheProduct();
                // renderNewImage();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
            
            removeBtn.textContent = "Removing";
    }
}