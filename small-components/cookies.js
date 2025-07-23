(function () {
  const accept = localStorage.getItem("cookies_accept");

  if (accept) return;

  const string = `
    <div class="n-cookies">
        <style>
            .n-cookies {
                position: fixed;
                bottom: 0;
                left: 0;
                padding: 24px;
                background-color: black;
                color: white;
                text-align: center;
                width: 100%;
                box-sizing: border-box;
            }

            .n-cookies__link, a.n-cookies__link:visited, a.n-cookies__link:hover {
                margin: 8px;
                padding: 8px;
                background-color: white;
                color: var(--color-primary);
                display: inline-block;
                cursor: pointer;
            }
            
        </style>
        <p>
            Мы используем файлы «Cookie» для повышения качества предоставляемых услуг, аналитики, а также для настройки удобства пользователей.<br>
Нажимая кнопку «Принять» и продолжая пользоваться сайтом, вы соглашаетесь на обработку файлов «Cookie». <br>Если вы не согласны с использованием файлов «Cookie», пожалуйста, измените настройки браузера или прекратите использование сайта.
        </p>
        <div style = "margin-top: 20px">
            <a class = "n-cookies__link">Принять</a>
        </div>
    </div>
`;

  document.body.insertAdjacentHTML("beforeend", string);
  const nCookies = document.querySelector(".n-cookies");
  const close = document.querySelector(".n-cookies__link");

  close.addEventListener("click", () => {
    nCookies.style.display = "none";
    localStorage.setItem("cookies_accept", "1");
  });
})();
