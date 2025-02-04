class NDrag {
    // v.0.1 test period
    constructor(selector, options) {
        this.track = document.querySelector(selector + ' .n-drag__track');
        this.track.addEventListener('mousedown', e => { this.mouseDownHandler(e) });
        document.addEventListener('mousemove', e => { this.mouseMoveHandler(e) });
        document.addEventListener('mouseup', e => {this.mouseUpHandler(e);})
        console.log(this.track);
    }
    isDragging = false;
    startingX = 0;
    initialPosition = 0;

    mouseDownHandler(e) {
        this.isDragging = true;
        // console.log(e.clientX);
        console.log('offset left', this.track.offsetLeft);
        this.startingX = e.clientX;
    }
    mouseMoveHandler(e) {
        if (!this.isDragging) return;
        let delta;
        if (this.startingX == 0) {
            delta = 0;
        } else {
            delta = e.clientX - this.startingX;
        }
        // let delta = this.startingX - e.clientX;

        this.track.style.transform = `translateX(${this.initialPosition + delta}px)`;
    }

    mouseUpHandler(e) {
        if (!this.isDragging) return;
        this.initialPosition = this.initialPosition + e.clientX - this.startingX;
        this.track.style.transform = `translateX(${this.initialPosition})`;
        this.startingX = 0;
        this.isDragging = false;
    }

    clear() {
        this.track.addEventListener('mousedown', e => { this.mouseDownHandler(e) });
        document.addEventListener('mousemove', e => { this.mouseMoveHandler(e) });
        document.addEventListener('mouseup', e => {this.mouseUpHandler(e);})
    }
}
