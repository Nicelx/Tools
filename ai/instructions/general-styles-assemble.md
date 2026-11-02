Это инструкция, как ты должен собирать общие стили. Цель собрать именно общие классы, которые будут использоваться везде.

# Порядок классов, блоков.

Используй /* #region  */ чтобы отделять блоки друг от друга. Вот следующие разделения
region base - переменные, подключения шрифтов, определения тэгов body, a, section
region utils - блок с мини классами. container, title, b, m1, m2, padding, center и другими подобными классами
region libs - блок с переопределениями стилями библиотек. Например переопределение точек для крошек библиотеку splide 
region medias - блок с @media  
Это будет файл styles.css

Отдельно будет файл components.css куда уже собирай что-то более компонентное. Об этом далее.


# Переменные:
В качестве переменных используется встроенный css механизм
:root {
    --content-width: 1240px;

    --color-primary: #112d63;
}

Должны быть выделены следующие переменные. 
--content-width: - ширина контентной области. Будет использоваться в классе container в основном 

--color-primary, --color-secondary, --color-tertiary, --color-dark - если сайт использует близкий к чёрному цвет, то же для около-белого
--color-gray-f8 - вариации серых цветов без фанатизма. В случае если вариаций серого более 5. Старайся игнорировать те, которые встречаются реже 3 раз(или просто специфичны для чего-то конкретного)

--padding - переменная внутренних отсупов. В случае если какой-то отсутп повторяется довольно часто, то эта переменная должна быть определена
--border-radius - переменная для свойства border-radius. В случае, если свойства скруглений секций повторяются, то эта переменная должна быть определена
--box-shadow - перменная для тени, которая повторяется.

Адаптируются именно переменные. Классы, которые будут использовать эти переменные, чаще всего без адаптива используется

# Контейнер:
класс контейнера .container. Внутри просто используем переменную --content-width
Мы используем прямое указание в px. Для мобилки можно указать в % 80-95% или 80-95vw
В media меняем переменную.

# Шрифты:
Выдели самые ходовые стилевые шрифты и определи их. Базовый шрифт текста я как правило задаю в body
для крупного текста выделяю класс title или к примеру title-24. 
Если на странице есть 1 крупный заголовок под h1, то лучше выдели его через title-h1. Класс title зарезервирован для ходовых заголовках блоков. Как правило h2. 
По шрифтам старайся сильно не зацикливаться на line-height. классов для шрифтов не должно быть больше, чем 5. 
В классах шрифтов в основном определяем размер и жирность. В редких случаях family.

# Отступы:
Как правило я использую отступы margin-bottom. Стараюсь не использовать отступы margin-top.
Выдели основные классы для отступов. К примеру .m3 - margin-bottom: 30px; 
Таких классов не должно быть больше, чем 5. Если отступ к примеру 35px можешь использовать m35 наименование.
Как правило у секций есть повторяющий отступ. Если он прослеживается, то задай для тэга section соответствующий margin-bottom

# Сетка блока и flex классы :
Чаще всего на сайтах в секциях 2 колонки, и можешь выделить .grid--even. Но в целом классы лэйаута уже предопределены и ничего придумывать не нужно

# Предопределённые классы:
Свойства классы менять не нужно. Они используются как есть
container, padding, row, col, col-g, center, img-cover, with-br, tac 
остальные могут менять значения к примеру .b может быть с разными цифрами. detail - может быть с разной прозрачностью. 


# Пример того, что ты должен создать
Проанализируй макет и по инструкциям нужно собрать стили. Вот минимальный пример. Старайся не копировать значения.  


/* #region base */
:root {
    --content-width: 1240px;
  
    --padding: 30px;

    --color-primary: #112d63;
    --base-fs: 16px;
    --gap: 20px;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
}

html {
    background-color: цвет если нужно переопределить.
}
body {
    font-size: var(--base-fs);
}
a,
button {
  cursor: pointer;
}
section {
  margin-bottom: 150px;
}

/* #endregion */


/* #region utils */
.container {
  width: var(--content-width);
  margin-inline: auto;
}

.title,
.title-24 {
  line-height: 100%;
}
.title {
  font-size: 40px;
  font-weight: 500;
}

.title-24 {
  font-size: 24px;
  font-weight: 600;
}

.b {
  font-weight: 600;
}
.m1 {
  margin-bottom: 10px;
}
.m2 {
  margin-bottom: 20px;
}
.m3 {
  margin-bottom: 30px;
}

.padding {
  padding: var(--padding);
}

.grid--even {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.col, .col-g {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.col-g {
    gap: var(--gap);
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-cover {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.with-br {
  white-space: pre-line;
}

.detail {
  text-decoration: underline;
  opacity: 50%;
}
.tac {
  text-align: center;
}

.close__modal {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 30px;
}
.address-icon {
      width: 25px;
      height: 25px;
      transition: .250s ease-in-out;
    }

/* #endregion */

/* #region libs */
.splide__pagination {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 101;
}
.splide__pagination__page {
  background-color: var(--color-primary);
  opacity: 40%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.splide__pagination__page.is-active {
  opacity: 100%;
}

/* #endregion */

/* #region medias */

/* start tablet */
@media (min-width: 2000px) {
  :root {
    --base-fs: 24px;
    --padding: 60px;
  }

  .grid--even {
    gap: 40px;
  }
}

@media (max-width: 1280px) {
  :root {
    --content-width: 1040px;
    --padding: 20px;
  }
  .title {
    font-size: 32px;
  }
  .title-24 {
    font-size: 21px;
  }
  section {
    margin-bottom: 64px;
  }
  .grid--even {
    align-items: center;
  }
}

@media (max-width: 1080px) {
  :root {
    --content-width: 728px;
  }
}

@media (max-width: 800px) {
  :root {
    --content-width: 580px;
  }
  body {
    font-size: 14px;
  }
  .title {
    font-size: 26px;
  }
  .title-24 {
    font-size: 18px;
  }
  section {
    margin-bottom: 64px;
  }
 
  .grid--even {
    display: flex;
    flex-direction: column;
  }
  .first-section {
    padding-top: 125px;
  }
  
}

@media (max-width: 600px) {
  :root {
    --content-width: 360px;
  }
}
@media (max-width: 380px) {
  :root {
    --content-width: 320px;
    --padding: 12px;
  }
}