// in development and testing Accordion v0

class NAccordion {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (this.container) {
      this.items = this.container.querySelectorAll(".n-accordion__item");

      this.items.forEach((item) => {
        item.addEventListener("click", () => {
          const panel = item.querySelector(".n-accordion__panel");

          if (item.classList.contains("n-accordion__item--opened")) {
            panel.style.height = "0px";
            item.classList.remove("n-accordion__item--opened");
            this.isSomethingOpen = false;
            return;
          } else {
            panel.style.height = `${panel.scrollHeight}px`;
            if (this.isSomethingOpen) {
              const opened = this.container.querySelector(
                ".n-accordion__item--opened"
              );
              const openedPanel = opened.querySelector(".n-accordion__panel");

              openedPanel.style.height = "0px";
              opened.classList.remove("n-accordion__item--opened");
            }
            item.classList.add("n-accordion__item--opened");
            this.isSomethingOpen = true;
          }
          // item.classList.toggle('n-accordion__item--opened')
        });
      });
    } else throw new Error("this.container is not defined");
  }
  isSomethingOpen = false;
}

console.log("hi");

window.addEventListener("DOMContentLoaded", () => {
  new NAccordion(".acc-container-selector");
});
