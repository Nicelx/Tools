const obj = document.querySelector('.object');

document.addEventListener("mousemove", (event) => {
    posX = event.clientX - window.innerWidth / 2;
    posY = event.clientY - window.innerHeight / 2;

    contacts.style.transform = "translate(" + posX * 0.0006 + "%, " + posY * 0.0010 + "%)";
})