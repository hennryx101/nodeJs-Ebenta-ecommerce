import renderImage from "../products/addProducts.js";

const buttons = document.querySelectorAll("[data-carousel-button]");

let i = 0;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        
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
        console.log(i);
    })
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = document.querySelector(".remove");
    deleteBtn.addEventListener('click', (e) => remove(e, i));
});


const fileInput = document.getElementById('files');
  function remove(e, removeIndex) {
    e.preventDefault();
    console.log("click");
    const myFiles = Array.from(fileInput.files);
    console.log(myFiles, "files here");
    myFiles.splice(removeIndex, 1);
  
    const dataTransfer = new DataTransfer();
    myFiles.forEach((file) => dataTransfer.items.add(file));

    fileInput.value = '';

    fileInput.files = dataTransfer.files;
    console.log(fileInput.files);

    renderImage();
  }
