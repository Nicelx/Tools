// n-ripple v.0 demo

const btn = document.querySelector('.ripple');
btn.addEventListener('click', function (e) {
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    this.style.setProperty('--ripple-top', `${offsetY}px`);
    this.style.setProperty('--ripple-left', `${offsetX}px`);
    
    this.style.setProperty('--ripple-animation', 'none');
    void this.offsetWidth; // Сбрасываем анимацию
    this.style.setProperty('--ripple-animation', 'ripple 500ms ease-in-out');
})


btn.addEventListener('mouseenter', function(e) {
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    this.style.setProperty('--ripple-top', `${offsetY}px`);
    this.style.setProperty('--ripple-left', `${offsetX}px`);
    
    this.style.setProperty('--ripple-animation', 'none');
    void this.offsetWidth; // Сбрасываем анимацию
    this.style.setProperty('--ripple-animation', 'ripple 500ms ease-in-out');
})
