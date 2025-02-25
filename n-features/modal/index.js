class NModal {
    // v 1.1
    constructor(option) {
        if (!option.modal || !option.triggers) {
            console.error('modal and triggers fields are required');
        }

        this.modal = document.querySelector(option.modal);
        this.triggers = document.querySelectorAll(option.triggers);
        this.backdrop = this.modal.querySelector('.n-modal__backdrop');
        this.closers = option.closers;
        this.init();
    }
    isOpen = false;

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                this.open();
            })
        });
        if (this.closers) {
            this.closers.forEach(closer => {
                const closerElement = document.querySelector(closer);

                closerElement.addEventListener('click', () => {
                    this.close();
                })
            })
        }

        this.backdrop.addEventListener('click', () => {
            this.close();
        })
    }
    open() {
        this.modal.classList.add('n-modal__opened');
        if (this.dynamic) {
            console.log('dynamic', this.modal.firstElementChild);
        } else {
            console.log('not dynamic');
        }
    }
    close() {
        this.modal.classList.remove('n-modal__opened');
    }
}