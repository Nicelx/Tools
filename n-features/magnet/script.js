// v0.00 demo testing
class NMagnet {
  constructor(option) {
    this.selector = option.selector;
    this.powerX = option.powerX ? option.powerX : 0.6 
    this.powerY = option.powerX ? option.powerY : 2
    this.init();
  }

  init() {
    const elems = document.querySelectorAll(this.selector);
    if (elems.length <= 0) return;

    elems.forEach((elem) => {
      let isMouseOver = false;
      let animationFrameId = null;

      elem.addEventListener("mouseenter", () => {
        isMouseOver = true;
        elem.style.transition = "transform 0.1s linear";
      });

      elem.addEventListener("mousemove", (e) => {
        if (!isMouseOver) return;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          let x = e.offsetX;
          let y = e.offsetY;
          let elemWidth = elem.clientWidth;
          let elemHeight = elem.clientHeight;
          let transX = (x - elemWidth / 2) * this.powerX; 
          let transY = (y - elemHeight / 2) * this.powerY;
          elem.style.transform = `translateX(${transX}px) translateY(${transY}px)`;
        });
      });

      elem.addEventListener("mouseleave", (e) => {
        isMouseOver = false;

         if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        elem.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
        elem.style.transform = "translateX(0) translateY(0)";
        setTimeout(() => {
          elem.style.transition = "transform 0.1s linear";
        }, 600);
      });
    });
  }
}