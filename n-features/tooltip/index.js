// v.00 demo
class NTooltip {
    constructor(option) {
        this.trigger = document.querySelector(option.trigger);
        this.tooltip = document.querySelector(`${option.trigger} .n-tooltip`);
        this.init();
    }

    init() {

        this.trigger.addEventListener('mouseenter', () => this.show());
        this.trigger.addEventListener('mouseleave', () => this.hide());

        console.log('trigger element', this.trigger);
        console.log('tooltip element', this.tooltip);
        // this.trigger.addEventListener("mouseenter")
    }
    show() {
        this.tooltip.classList.add('n-tooltip__visible');
    }
    hide() {
        this.tooltip.classList.remove('n-tooltip__visible');
    }


}