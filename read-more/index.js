class ReadMore {
    constructor(trigger, element) {
        this.trigger = document.querySelector(trigger);
        this.element = document.querySelector(element);
        this.init();
    }
    isOpen = false;
    height;
    triggerText;

    init() {
        if (!this.element || !this.trigger) return;

        this.height = this.element.style.height;
        this.triggerText = this.trigger.textContent;
        if (this.trigger) {
            this.trigger.addEventListener('click', () => {
                console.log('click')
                console.log(this);
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.close();
                }
            })
        }
    }
    open() {
        this.element.classList.add('read-more-expanded');
        this.trigger.textContent = "скрыть"
        this.isOpen = true;
    }
    close() {
        this.element.classList.remove('read-more-expanded');
        this.trigger.textContent = this.triggerText;
        this.isOpen = false;
    }

}