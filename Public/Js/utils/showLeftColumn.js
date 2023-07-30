export function ShowLeftColumn(){
    const productsContainer = document.querySelector(".main-container");
    console.log(productsContainer);
    productsContainer.addEventListener('touchstart', handleTouchStart, false);        
    productsContainer.addEventListener('touchmove', handleTouchMove, false);
    
    var xDown = null;                                                        
    var yDown = null;
    
    function getTouches(evt) {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }
    
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
        
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */ 
                console.log("right");
                productsContainer.querySelector(".left-column").style.display = "block";
            } else {
                productsContainer.querySelector(".left-column").style.display = "none";
                console.log("left");
    
                /* left swipe */
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
}