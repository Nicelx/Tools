// v.1
const css = `
  .malina__card-link {
    display: block;
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
  // img.insertAdjacentHTML("beforebegin", cardTemplete);
  img.in

  const card = document.querySelector(".malina__card-link");
  const backdrop = document.querySelector(".malina__backdrop");

  card.addEventListener('click', (e) => {
    if (card.classList.contains('malina__card--active2')) {
      alert('contains')
    } else {
      e.preventDefault();
      alert('not contains');
    }
  })

  backdrop.addEventListener("click", () => {
    card.classList.remove("malina__card--active");
    backdrop.classList.remove("malina__backdrop--active");
  });

  img.addEventListener("click", () => {
    card.classList.toggle("malina__card--active");
    backdrop.classList.add("malina__backdrop--active");
  });
  img.addEventListener('mouseenter', () => {
    card.classList.add("malina__card--active");
    backdrop.classList.add("malina__backdrop--active");
  })
}