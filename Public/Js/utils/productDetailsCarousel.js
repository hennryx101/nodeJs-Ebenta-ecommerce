
function Carousel(){
    const buttons = document.querySelectorAll("[data-carousel-button]");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            console.log("-------");
    
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
        });
    });
}

export default Carousel;