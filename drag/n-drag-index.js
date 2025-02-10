//  TO DO:
// 
/*
    1) elastic borders. 
    2) multiple tracks, one instance??? to think
*/
class NDrag {
    // v.0.2 test 
    constructor(selector, options) {
        this.track = document.querySelector(selector + ' .n-drag__track');
        this.init();
    }

    init() {
        this.isDragging = false;
        this.startingX = 0;
        this.initialPosition = 0;

        this.track.addEventListener('mousedown', this.mouseDownHandler);
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler)
    }
    disable() {
        this.track.removeEventListener('mousedown', this.mouseDownHandler)
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler)
        this.track.style.transform = `translateX(0px)`;
    }
   

    mouseDownHandler = (e) => {
        this.isDragging = true;
        this.startingX = e.clientX;
    }
    
    mouseMoveHandler = (e) => {
        if (!this.isDragging) return;
        let delta;
        if (this.startingX == 0) {
            delta = 0;
        } else {
            delta = e.clientX - this.startingX;
        }

        this.track.style.transform = `translateX(${this.initialPosition + delta}px)`;
    }

    mouseUpHandler = (e) => {
        if (!this.isDragging) return;
        this.initialPosition = this.initialPosition + e.clientX - this.startingX;
        this.track.style.transform = `translateX(${this.initialPosition})`;
        this.startingX = 0;
        this.isDragging = false;
    }
}