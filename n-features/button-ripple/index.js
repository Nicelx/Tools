// n-ripple v0.1 test

class NRipple {
    constructor() {
        this.init();
    }

    init() {
        this.elements = document.querySelectorAll('.n-ripple');
        this.elements.forEach(el => {
            el.addEventListener('click', this._handleEvent);
            el.addEventListener('mouseenter', this._handleEvent);
        })
    }

    _handleEvent(e) {
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;

        this.style.setProperty('--n-ripple-top', `${offsetY}px`);
        this.style.setProperty('--n-ripple-left', `${offsetX}px`);

        this.style.setProperty('--n-ripple-animation', 'none');
        void this.offsetWidth; // Сбрасываем анимацию
        this.style.setProperty('--n-ripple-animation', 'n-ripple var(--n-ripple-duration) ease-in-out');
    }
}