// v.1
const css = `
.malina__backdrop {
  transition: 1.4s ease-in-out;

}
.malina__backdrop.malina__backdrop--active {
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9998;
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}
.malina__logo-wrapper {
    position: relative;
    width: 40px;
}
.malina__logo-img {
    width: 100%;
    cursor: pointer;
}

.malina__card {
  position: absolute;
  visibility: hidden;
  top: -220px;
  left: -350px;
  perspective: 400px;
  width: 400px;
  height: 200px;
  transition: .5s ease-in-out;
  z-index: -1;
}

.malina__card.malina__card--active {
    visibility: visible;
    z-index: 10000;
}

.malina__card-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  --color-primary: dark;
  background-color: #1f1d1d;
  padding: 17px;
  border-radius: 2px;
  transition: all 0.4s ease-in-out;
  position: absolute;
  box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.malina__card-wrapper::after {
  content: "";
  position: absolute;
  --size: 160px;
  right: calc((var(--size) / -2));
  bottom: calc((var(--size) / -2));
  background-color: #e7e7e7;
  width: var(--size);
  height: var(--size);
  filter: blur(100px);
}

.malina__card-logo {
  opacity: 0;
  transition: 0.4s ease-in-out;
  position: absolute;
  width: 50px;
  z-index: 1;
}

.malina__card.malina__card--active .malina__card-logo {
  transform: scale(2) translate(30px, 20px);
  opacity: 1;
}

.malina__card.malina__card--active .malina__card-wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(15deg) translateZ(0);
}

.malina__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 35px;
  width: 163px;
  height: 41px;
  border-radius: 25px;
  background: linear-gradient(94.32deg, #e73a57 -9.18%, #52050f 134.29%);
  border: none;
  color: white;
  text-decoration: none;
  transform: scale(0.01) translate(-300px, -500px);
  transition: 0.6s 0.3s ease-in-out;
  opacity: 0;
}

.malina__card.malina__card--active .malina__btn {
  transform: scale(1) translate3d(0, 0, 30px);
  opacity: 1;
}

.malina__malena {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 182px;
  height: 200px;
  opacity: 0;
  transition: 0.4s 0.6s ease-in-out;
  transform: translate3d(0, 100px, -30px);
}

.malina__card.malina__card--active .malina__malena {
  opacity: 1;
  transform: translate3d(0, 0, 30px);
}

@media (max-width: 450px) {
  .malina__card {
    width: 280px;
    height: 160px;
  }
  .malina__malena {
    width: 120px;
    height: auto;
    right: 5px;
  }
  .malina__btn {
    width: 120px;
    height: 35px;
    left: 15px;
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  6% {
    transform: scale(1.3);
  }
  12% {
    transform: scale(1);
  }
  18% {
    transform: scale(1.5);
  }
  24% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.beat:hover {
  animation: heartbeat 1700ms infinite;
}
`;

window.addEventListener("load", initWidget);

function initWidget() {
  const cardTemplete = `
        <div class="malina__card">
        <img class="malina__card-logo" src="https://malina-clinic.ru/wp-content/themes/malinaclinic/assets/delivery/card-logo.svg" alt="" />
        <div class="malina__card-wrapper"></div>
        <a href="https://malina-clinic.ru" class="malina__btn" target="_blank"
          >Хочешь также?</a
        >
        <img class="malina__malena" src="https://malina-clinic.ru/wp-content/uploads/2025/09/malena.webp" alt="" />
      </div>
    `;

  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  const img = document.querySelector(".malina__logo-img");
  img.insertAdjacentHTML("beforebegin", cardTemplete);

  const card = document.querySelector(".malina__card");
  const backdrop = document.querySelector(".malina__backdrop");

  backdrop.addEventListener("click", () => {
    card.classList.remove("malina__card--active");
    backdrop.classList.remove("malina__backdrop--active");
  });

  img.addEventListener("click", () => {
    card.classList.toggle("malina__card--active");
    backdrop.classList.add("malina__backdrop--active");
  });
}
