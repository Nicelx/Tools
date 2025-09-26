// v.1
const css = `
  
.malina__card-link {
    --height: 480px;
    --width: 280px;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    z-index: -10;
}
.malina__card-link.malina__card--active {
    transform: translate(0, -200px);
    width: var(--width);
    height: var(--height);
    visibility: visible;
    z-index: 10000;
    opacity: 1;
}
.malina__card-link img {
  width: 100%;
}

.malina__backdrop {
  transition: 0.8s ease-in-out;
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

.malina__logo-img {
    cursor: pointer;
}

.malina__card {
  width: var(--width);
  height: var(--height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  perspective: 2500px;
}

.malina__cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.malina__wrapper {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.malina__card--active .malina__wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
  box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.malina__wrapper::before,
.malina__wrapper::after {
  content: "";
  opacity: 0;
  width: 100%;
  height: 80px;
  transition: all 0.5s;
  position: absolute;
  left: 0;
}
.malina__wrapper::before {
  top: 0;
  height: 100%;
  background-image: linear-gradient(
    to top,
    transparent 46%,
    rgba(12, 13, 19, 0.5) 68%,
    rgba(12, 13, 19) 97%
  );
}
.malina__wrapper::after {
  bottom: 0;
  opacity: 1;
  background-image: linear-gradient(
    to bottom,
    transparent 16%,
    rgba(12, 13, 19, 0.1) 20%,
    rgba(12, 13, 19) 97%
  );
}

.malina__card--active .malina__wrapper::before,
.malina__wrapper::after {
  opacity: 1;
}

.malina__card--active .malina__wrapper::after {
  height: 120px;
}
.malina__title {
  width: 100%;
  transition: all 0.5s;
}
.malina__card--active .malina__title {
  transform: translate3d(0%, -10px, 100px) scale(1.4);
}

.malina__character {
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
}

.malina__card--active .malina__character {
  opacity: 1;
  transform: translate3d(0%, -42%, 100px) scale(1.4);
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  8% {
    transform: scale(1.1);
  }
  16% {
    transform: scale(1);
  }
  24% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.beat {
  animation: heartbeat 1800ms infinite;
}

`;

window.addEventListener("load", initWidget);

function initWidget() {
  const cardTemplete = `
        <a class = "malina__card-link" href="https://malina-clinic.ru" target="_blank">
          <div class = "malina__card">
            <div class = "malina__wrapper">
              <img src="https://malina-clinic.ru/wp-content/uploads/2025/09/bg2.png" class="malina__cover-image" />
            </div>

            <img src="https://malina-clinic.ru/wp-content/themes/malinaclinic/assets/delivery/you-want.svg" class="malina__title" />

            <img src="https://malina-clinic.ru/wp-content/uploads/2025/09/malena-full-opacity.webp" class="malina__character" loading = "lazy" decoding="async" />
          </div>
        </a>
    `;

  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  const img = document.querySelector(".malina__logo-img");
  img.insertAdjacentHTML("afterend", cardTemplete);

  const card = document.querySelector(".malina__card-link");
  const backdrop = document.querySelector(".malina__backdrop");

  backdrop.addEventListener("click", () => {
    console.log("backdrop click");
    card.classList.remove("malina__card--active");
    backdrop.classList.remove("malina__backdrop--active");
  });

  img.addEventListener("touchend", (e) => {
    e.preventDefault();
    card.classList.add("malina__card--active");
    backdrop.classList.add("malina__backdrop--active");
  });

  img.addEventListener("mouseenter", () => {
    card.classList.add("malina__card--active");
    backdrop.classList.add("malina__backdrop--active");
  });
}
