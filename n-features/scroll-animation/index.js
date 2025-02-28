// v0.01 testing
class NScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("n-scroll-animation__show");
                }
                else {
                    entry.target.classList.remove("n-scroll-animation__show");
                }
            });
        });
        const elements = document.querySelectorAll(".n-scroll-animation__hidden");
        elements.forEach((el) => observer.observe(el));
    }
}