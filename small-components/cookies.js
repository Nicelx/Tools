(function () {
    const accept = localStorage.getItem('cookies_accept')
    
    if (accept) return;

    const string = `
    <div class="n-cookies">
        <style>
            .n-cookies {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 8px 12px;
                background-color: black;
                color: white;
            }
            .n-cookies__close {
                position: absolute;
                font-size: 20px;
                top: 10px;
                right: 40px;
                cursor: pointer;
            }
        </style>
        <p>Наш сайт использует файлы куки для повышения качества предоставляемых услуг, аналитики, а также для настройки
            удобства пользователей. Продолжая использование сайта, вы автоматически соглашаетесь с использованием файлов
            cookie, что позволит нам улучшать наш сервис и предоставлять персонализированный опыт взаимодействия. Если
            вы не согласны с использованием файлов куки, пожалуйста, измените настройки браузера или прекратите
            использование сайта.</p>
        <div class = "n-cookies__close">
            &times;
        </div>
    </div>
`;
    document.body.insertAdjacentHTML('beforeend', string);

    const nCookies = document.querySelector('.n-cookies');
    const close = document.querySelector('.n-cookies__close');

    close.addEventListener('click', () => {
        nCookies.style.display = "none";
        localStorage.setItem('cookies_accept', '1');
    });
})()


