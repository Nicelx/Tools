const config = {};
const css = `

`;

window.addEventListener("load", initWidget);

function initWidget() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    const img = document.querySelector('.malina__logo-img'); 
    const card = document.querySelector('.malina__card');

    img.addEventListener('click', () => {
        card.classList.toggle('malina__card--active');
        document.body.classList.toogle('malina__card--active');
    })

    const logoWr = document.querySelector('.malina__logo-wrapper'); 
    console.log(logoWr);
    // style.type = 'text/css';
    console.log(style);    


  // const
}
