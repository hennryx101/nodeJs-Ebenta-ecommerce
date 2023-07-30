
function ScrollFunction(isRun){
    const Run = isRun || true;
    if(Run){
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
        
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos >= currentScrollPos) {
                document.querySelector(".nav-container").style.top = "0";
            } else {
                document.querySelector(".nav-container").style.top = "-500px";
            }
            prevScrollpos = currentScrollPos;
        
            var navbar = document.querySelector(".left-column");
            var navbarright = document.querySelector(".right-column");
            var sticky = navbar.offsetTop;
        
            if (prevScrollpos >= sticky) {
                navbar.classList.add("sticky")
                navbarright.classList.add("stickyRight");
            } else {
                navbar.classList.remove("sticky");
                navbarright.classList.remove("stickyRight");
            }
        }

    }else{
        console.log("----");
        return;
    }
}

export default ScrollFunction;