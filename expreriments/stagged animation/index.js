class NStaggedAnimation {
    // v.01 developing
    constructor(cardSelector, options) {
        this.cards = document.querySelectorAll(cardSelector);
        this.init();
        this.timeGap = options.timeGap;
    }
    init() {
        this.parentEl = this.cards[0].parentElement;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.cards.forEach((card, index) => {
                        card.style.animation = 'n-staged-animation 1s ease-out forwards';
                        card.style.animationDelay = `${(index * this.timeGap) + 0.3}s`;
                    })
                }
            });
        });
        observer.observe(this.parentEl);
    }
}