const Throttle = (callback, delay = 1000) => {
    let shouldWait = false;
    let waitingArgs = null;

    const hang = () => { // hang for a period of time
        if(waitingArgs == null) { // if there's no called
            shouldWait = false;
            return;
        }
        
        callback(...waitingArgs);
        waitingArgs = null;
        setTimeout(hang, delay);
    }

    return (...args) => { // starts here
        if(shouldWait) {
            waitingArgs = args;
            return;
        }

        callback(...args);
        shouldWait = true;

        setTimeout(hang, delay);
    }
}

export default Throttle;