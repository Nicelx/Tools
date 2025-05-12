class NStaggedAnimation {
    // v.0 developing
    constructor(cardSelector, options) {
        this.cards = document.querySelectorAll(cardSelector);
        this.init();
    }
    init() {
        this.parentEl = this.cards[0].parentElement;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.cards.forEach((card, index) => {
                        card.style.animation = 'n-staged-animation 1s ease-out forwards';
                        card.style.animationDelay = `${(index * 0.08) + 0.3}s`;
                    })
                }
            });
        });
        observer.observe(this.parentEl);
    }
}