class Modal {
    constructor(option) {
        this.modal = document.querySelector(option.modal);
        this.backdrop = document.querySelector(option.backdrop);
        this.triggers = document.querySelectorAll(option.triggers);
        this.closers = document.querySelectorAll(option.closers);
        this.init();
    }
    isOpen = false;

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                console.log('trigger')
                this.open();
            })
        });
        this.closers.forEach(closer => {
            closer.addEventListener('click', () => {
                this.close();
            })
        })
        this.backdrop.addEventListener('click', () => {
            this.close();
        })
    }
    open() {
        this.modal.classList.add('opened');
        this.backdrop.classList.add('opened');
    }
    close() {
        this.modal.classList.remove('opened');
        this.backdrop.classList.remove('opened');
    }
}
