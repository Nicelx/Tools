const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } 
        else {
            entry.target.classList.remove("show");
        }
        // console.log(entry);
    });
});
const hiddenElements = document.querySelectorAll(".hide");
hiddenElements.forEach((el) => observer.observe(el));