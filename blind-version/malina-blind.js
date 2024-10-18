function setupComponents() {
    const navList = [
        '.nav__item>a', '.nav-dropdown__service a, .nav__item:nth-child(3) .nav-dropdown__item a'
    ]

    renderNavigation(navList);

    renderPage('/' , () => {
        renderSlider({
            collectionSelector: '.offers__card',
            sliderSelector: '.offers',
            skipStr: '.offers__card button'
        })
        renderBlock({
            title: '.title'
        })
        renderBlockAuto({
            selector: '.numbers'
        })
        renderBlock({
            title : '.our-services__title',
            content: ['.service-card__content li']
        })
        renderSlider({
            title: '.our-specialists__title',
            // collectionSelector: '.our-specialists .splide__slide',
            collectionSelector: '.spec-card',
        })
        renderBlock({
            title: '.about__title',
            content: '.about__content',
            img: '.about__img',
        })
        renderBlockAuto({
            selector: '.call-us__questions'
        })
        renderForm({
            selector: '.wpcf7-form'
        })
    })

    renderPage('/services/', () => {
        renderCardCollection({
            title: '.title',
            cardSelector: '.services__card-btn',
            skipStr: 'img'
        })
        renderBlock({
            title: '.need-advice__title',
            content: '.need-advice__sub-title',
        })
        renderForm({
            selector: '.need-advice .wpcf7-form'
        })
    })

    renderPage('/about/', () => {
        renderBlock({
            title: '.about__title',
            content: '.about__content',
            img: '.about__img',
            button: '.about__wrapper a'
        })
        renderBlockAuto({
            selector:'.numbers'
        })
        renderBlock({
            title: '.numbers+section h2',
            content: ['.green-card__content'],
        })
        renderSlider({
            title: '.reviews__title',
            collectionSelector: '.rev-card',
            skipStr: '.rev-card__more, .rev-card__doctu, .rev-card__stars-wr img'
        })
        renderBlock({
            title: '.need-advice__title',
            content: '.need-advice__sub-title',
        })
        renderForm({
            selector: '.need-advice .wpcf7-form'
        })
    })

    renderPage('/privacy/', () => {
        renderBlock({
            title: '.title',
        })
        renderFlat('.documentation .wrapper');
    })

    renderPage('/documentation/', () => {
        renderBlockAuto({
            title: '.title',
            selector: '.documentation__ac-container',
            skipStr: '.ac__arrow',
        })
    })

    renderPage('/doctors/', () => {
        renderCardCollection({
            title: '.title',
            cardSelector: '.spec-card__link-wrapper',
            skipStr: '.spec-card__btn'
        })
    })

    // price TO DO
    renderPage('/prices/', () => {
        blindOff();
        // setTimeout(() => {
        //     renderFlat('.price__ac-container')
        // }, 3000)
    })

    renderPage('/corporates/', () => {
        renderBlock({
            title: 'h1.title',
            content: '.corporates>div',
            img: '.corporates img',
        });
        renderBlock({
            title: 'h2.title',
            content: ['.green-card__content']
        })
        renderBlockAuto({
            selector: '.d-ask__content'
        })
    })

    renderPage('/contacts/', () => {
        renderBlockAuto({
            selector: '.contacts__info',
            skipStr: 'img',
        })
        renderFlat('.contacts__map')
    })

    renderSingle('/services/', () => {
        renderBlock({
            title: '.service-info h1',
            content: '.service-info__content ',
            button: '.service-info__btn',
            img: '.service-info__img'
        })
        renderBlock({
            img: '.services-continue__img',
            content: ['.services-continue li'],
            button: '.services-continue__btn'
        })
        renderBlock({
            content: ['.services-continue+section.wrapper :is(li, p)']
        })
        renderSlider({
            title: '.our-specialists__title',
            collectionSelector: '.spec-card',
        })
        renderBlock({
            title: '.indications__title',
            img: '.indications__img',
            content: ['.indications__content.lh22 :is(li,p)']
        })
        renderSlider({
            title: '.reviews__title',
            collectionSelector: '.rev-card',
            skipStr: '.rev-card img'
        })
        renderBlock({
            title: '.need-advice__title',
            content: '.need-advice__sub-title',
        })
        renderForm({
            selector: '.need-advice .wpcf7-form'
        })
    })

    renderBlockAuto({
        selector: '.footer__grid',
        skipStr: 'img',
    })
    renderBlockAuto({
        selector: '.footer__descr',
    })
    addModal(['.blind__slide button', '.blind__section button'], 'footer .wpcf7-form');
}




window.addEventListener('DOMContentLoaded', () => {
    if (window.localStorage.getItem('isBlind') == 'true') {
        blindOn();
    } else {
        const btn = document.querySelector('.blind__btn');
        btn.addEventListener('click', blindOn);
    };
})

const { body } = document;
const blindEvent = new Event('blind-on');

let bodyTemplate = '';

function blindOff() {
    window.localStorage.setItem('isBlind', false);
    window.location.reload();
}

function blindOn(option) {
    window.localStorage.setItem('isBlind', true);
    renderPanel();
    setupComponents();

    document.body.innerHTML = '';
    document.body.innerHTML = bodyTemplate;
    window.dispatchEvent(blindEvent);
    loadVariables();


    const splideOption = {
        type: 'loop',
        perPage: 1,
    }


    const slides = document.querySelectorAll('.splide');
    if (slides) {
        slides.forEach(item => {
            new Splide(item, splideOption).mount();
        })
    }
    addVoice();
    doBraile();
}

function getImgData(imgSelector) {
    let imgElement = document.querySelector(imgSelector);
    let src = imgElement.getAttribute('src');
    let alt = imgElement.getAttribute('alt');

    return {
        src,
        alt
    }
}

function getElementContent(elSelector) {
    if (Array.isArray(elSelector)) {
        const elements = document.querySelectorAll(elSelector);
        let template = ``;
        elements.forEach(item => {
            template += `<p>${item.textContent}</p>`
        })
        return template;
    }
    if (!elSelector) return;

    let el = document.querySelector(elSelector);
    return el.textContent;
}

function renderSlider(option) {
    const { collectionSelector, sliderSelector, title, skipStr } = option;

    let itemListTemplate = ``;

    let sliderElements = document.querySelectorAll(collectionSelector);

    sliderElements.forEach(item => {

        itemListTemplate += `
            <li class = "splide__slide">
                <div class = "blind__slide">
                    ${buildTemplate(getItemData(item, skipStr))}
                </div>
                
            </li>
        `
    })

    let slideTemplate = ``;
    if (title) {
        const titleContent = document.querySelector(title).textContent;
        slideTemplate += `<h2 class = "blind__title">${titleContent}</h2>`
    };
    // sliderSelector = ``;
    // sliderSelector;
    // remove sliderSelector from here
    slideTemplate += `
        <div class = "splide">
            <div class = "splide__track">
                <ul class = "splide__list">
                    ${itemListTemplate}
                </ul>
            </div>
        </div>
    `;

    bodyTemplate += slideTemplate;
}

function getItemData(item, skipStr) {
    const allChilds = item.querySelectorAll(`*:not(:is(${skipStr}))`);
    const filteredData = [];

    allChilds.forEach(node => {
        const { tagName, textContent } = node;

        if (tagName == "DIV") return;
        if (tagName == "IMG") {
            filteredData.push({
                type: 'img',
                src: node.src,
                alt: node.alt
            })
            return;
        }
        if (tagName == "BUTTON") {
            if (textContent === '') return;

            filteredData.push({
                type: 'btn',
                textContent: textContent,
            })
            return;
        }
        if (tagName == "A") {
            if (!textContent) return;

            filteredData.push({
                type: 'link',
                textContent,
                href: node.href
            })
            return;
        }
        if (tagName == "P" || tagName == "SPAN") {
            if (!textContent) return;
            filteredData.push({
                type: 'p',
                textContent
            })
        }
    })
    return filteredData;
}

/*
*
*********************************** Components ***********************************************
*
*/

function renderBlock(option, isReturn) {
    const { title, img, content, button, links } = option;
    const contentTemplate = getElementContent(content);
    // const {src, alt} = getImgData(img);


    let template = `
    <section class = "blind__section" tabindex="0">
    `
    if (title) {
        const titleContent = document.querySelector(title).textContent;
        template += `<h2 class = "blind__title">${titleContent}</h2>`
    };

    if (img){
        const {src, alt} = getImgData(img);
        template += `<img class = "blind__img" src = "${src}" alt = "${alt}">`;
    } 

    if (content) {
        template += `
        <div class = "blind__content">${contentTemplate}</div>
    `
    }

    if (button) {
        const btnContent = document.querySelector(button).textContent;
        template += `<button>${btnContent}</button>`;
    } 

    if (links) {
        links.forEach(link => {
            let linksElement = document.querySelectorAll(link);
            linksElement.forEach(linkElement => {
                template += `<a href = "${linkElement.href}">${linkElement.textContent}</a>
                `
            })
        })
    }

    template += `</section>`;

    if (isReturn) {
        return template;
    }
    bodyTemplate += template;
}

function renderBlockAuto(option) {
    const { title, selector, skipStr } = option
    const blockElement = document.querySelector(selector);

    let template = `
    <section class = "blind__section" tabindex="0">
    `
    if (title) {
        const titleContent = document.querySelector(title).textContent;
        template += `<h2 class = "blind__title" tabindex="0">${titleContent}</h2>`
    };

    template += buildTemplate(getItemData(blockElement, skipStr))

    template += `</section>`;
    bodyTemplate += template;

}

function renderForm(option) {
    const { selector } = option;
    const form = document.querySelector(selector);

    const removeClassRegEx = /class\s?=\s?"(.*?)"/g;
    const removeClassTemplate = form.innerHTML.replace(removeClassRegEx, "");

    const template = `<form action="${form.action}" method = "post" novalidate = "novalidate">
            ${removeClassTemplate.replace("disabled", "")}
        </form>`


    bodyTemplate += template;
    // ${form.innerHTML.replace(removeClassRegEx, "")}
}

function buildTemplate(filteredData) {
    let itemListTemplate = ``;
    filteredData.forEach(item => {
        switch (item.type) {
            case 'img': {
                itemListTemplate += `<img src = "${item.src}" alt = "${item.alt}">`;
                break;
            }
            case 'p': {
                itemListTemplate += `<p tabindex="0">${item.textContent}</p>`
                break;
            }
            case 'btn': {
                itemListTemplate += `<button tabindex="0">${item.textContent}</button>`
                break;
            }
            case 'link': {
                itemListTemplate += `<a href = "${item.href}">${item.textContent}</a>`
                break;
            }
        }
    })

    return itemListTemplate

}

function renderFlat(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        const template = `
            <section tabindex="0">
                ${container.innerHTML}
            </section>
    `
        bodyTemplate += template;
    }

}

function renderCardCollection(option) {
    const {cardSelector, title, skipStr} = option;
    let collectionTemplate = ``;

    if (cardSelector){
        const items = document.querySelectorAll(cardSelector);
        items.forEach(item => {
            itemData = getItemData(item, skipStr);
            collectionTemplate += `<a class = "blind__link-card" href = "${item.href}">`
            collectionTemplate += buildTemplate(itemData);
            collectionTemplate += `</a>`
        })
    }    


    let template = `
        <section class = "blind__card-collection" tabindex="0">`;
        if (title) {
            let titleElement = document.querySelector(title);
            template += `<h2 class = "blind__title">${titleElement.textContent}</h2>`
        }
   
        template += `<div>${collectionTemplate}</div>
        </section>
    `

    bodyTemplate += template;
}


function renderPanel() {
    const textNode = `
        <div class = "blind-panel" tabindex = 0>
            <div class = "blind-panel__visible">
                 <div class = "panel-block">
                    <span class = "panel__title">Шрифт</span>
                    <button class = "panel__btn" onclick = "setFontSize('S')">100%</button>
                    <button class = "panel__btn" onclick = "setFontSize('M')">150%</button>
                    <button class = "panel__btn" onclick = "setFontSize('B')">200%</button>
                </div>
                <div>    
                    <button class = "panel__btn" onclick = "expandBlind()">Расширенные настройки</button>
                    <button class = "panel__btn" onclick = "blindOff()">Обычная версия</button>
                </div>
            </div>
           
            <div class = "blind-panel__hidden">
                <div class = "panel-block">
                    <button class = "panel__btn panel__btn--WB" onclick = "selectColorScheme('WB')">Светлая</button>
                    <button class = "panel__btn panel__btn--BW" onclick = "selectColorScheme('BW')">Темная</button>
                    <button class = "panel__btn panel__btn--BB" onclick = "selectColorScheme('BB')">Голубая</button>
                    <button class = "panel__btn panel__btn--beige" onclick = "selectColorScheme('BEIGE')">Бежевая</button>
                    <button class = "panel__btn panel__btn--brown" onclick = "selectColorScheme('BROWN')">Коричневая</button>
                </div>
                <div class = "panel-block">
                    <button class = "panel__btn" onclick = "toggleImg()">Выключить изображения</button>
                    <button class = "panel__btn" onclick = "toggleBraile()">Шрифт Брайля</button> 
                    <button class = "panel__btn" onclick = "toggleVoice()">Голос ${(localStorage.getItem('isVoice') == 'true' ? 'вкл' : 'выкл')}</button>
                </div>
                <div class = "panel-block">
                    <span class = "panel__title">Кернинг</span>
                    <button class = "panel__btn" onclick = "kerning(1)">1</button>
                    <button class = "panel__btn" onclick = "kerning(2)">2</button>
                    <button class = "panel__btn" onclick = "kerning(4)">4</button>
                </div> 
                <div class = "panel-block">
                    <span class = "panel__title">Интервал</span>
                    <button class = "panel__btn" onclick = "spacing('100%')">100%</button>
                    <button class = "panel__btn" onclick = "spacing('120%')">120%</button>
                    <button class = "panel__btn" onclick = "spacing('160%')">160%</button>
                </div> 
            </div>
        </div>
    `;

    document.body.classList.add('blindEnabled');

    bodyTemplate += textNode;
}



function renderNavigation(navList) {
    const navItems = document.querySelectorAll(navList[0])

    let itemsString = '';
    navItems.forEach(item => {
        const { textContent } = item;
        const href = item.getAttribute('href');

        let innerItemsTemplate = '';
        if (navList[1]) {
            
            const innerItems = item.parentElement.querySelectorAll(navList[1]);
        
            if (innerItems.length > 0) {
                innerItemsTemplate += `<ul class = "blind__inner">
                    <a class = "blind__nav-link" href = "${href}">${textContent}</a>`
                innerItems.forEach(innerItem => {
                    let {href, textContent} = innerItem;
                    innerItemsTemplate += `
                        <li>
                            <a class = "blind__nav-link" href = "${href}">${textContent}</a>
                        </li>
                    `
                })
                innerItemsTemplate += '</ul>'
            }

           
        }
        if (href && innerItemsTemplate) {
            itemsString += `<li>
                <a class = "blind__nav-link">${textContent}</a>
                ${innerItemsTemplate && innerItemsTemplate}
            </li>`
        }
        if (href && !innerItemsTemplate) {
            itemsString += `<li>
            <a class = "blind__nav-link" href = "${href}">${textContent}</a>
        </li>`
        }

    })

    window.addEventListener('blind-on', () => {
        const headers = document.querySelectorAll(".blind__nav-link:not(.blind__nav-link[href])")
        headers.forEach(header => {
            header.addEventListener('click', e => {
               e.target.nextElementSibling.classList.toggle('blind__inner--open');
            })
        })
    })

    const navTemplate = `
        <nav class = "blind__nav" tabindex = "1">
            <h2 class="blind__title">Навигация</h2>
            <ul>
                <a class = "blind__nav-link" href = "/">Главная</a>
                ${itemsString}
            </ul>
        </nav>
    `
    bodyTemplate += navTemplate;
}

function renderPage(url, fun) {
    if (url !== window.location.pathname) return;

    fun();
}
function renderSingle(url, fun) {
    let { pathname } = window.location;

    const urlArray = url.split('/');
    urlArray.pop();
    const pathnameArray = pathname.split('/');
    pathnameArray.pop();

    if (pathnameArray.length - urlArray.length !== 1) {
        return;
    }
    pathnameArray.pop();

    for(let i = 0; i< pathnameArray.length; i++) {
        if (pathnameArray[i] !== urlArray[i]) return; 
    }

    fun();
}

function addModal(triggers, formSelector) {
    function openModal() {
        const backdrop = document.querySelector('.blind__backdrop');
        backdrop.classList.add('blind__backdrop--opened');
    }
    function closeModal() {
        const backdrop = document.querySelector('.blind__backdrop');
        backdrop.classList.remove('blind__backdrop--opened')
    }


    window.addEventListener('blind-on', () => {
        const btnClose = document.querySelector('.blind__close');
        const bp = document.querySelector('.blind__backdrop');
        btnClose.addEventListener('click', closeModal);
        bp.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
        bp.firstElementChild.addEventListener('click', (e) => {
            e.stopPropagation();
        })

        triggers.forEach(triggerSelector => {
            const triggerElements = document.querySelectorAll(triggerSelector);
            if (triggerElements) {
                triggerElements.forEach(elem => {
                    elem.addEventListener('click', openModal);
                })
            }
        })
    })


    bodyTemplate += `
        <div class = "blind__backdrop">
              <div class = "blind__modal">`;
    renderForm({ selector: formSelector });
    bodyTemplate += `<button tabindex = "0" class = "blind__close">Закрыть</button>   
            </div>
        </div>
      
    `
}
/*
*
*********************************** Blind features ***********************************************
*
*/

function loadVariables() {
    const blindBg = localStorage.getItem("--blind-bg");
    const blindText = localStorage.getItem("--blind-text");
    const fontSize = localStorage.getItem('--font-size');
    const sectionMargin = localStorage.getItem('--section-margin');
    const isImg = localStorage.getItem('--is-img');
    const kerning = localStorage.getItem('--kerning');
    const spacing = localStorage.getItem('--line-height');



    document.documentElement.style.setProperty("--is-img", isImg);
    document.documentElement.style.setProperty("--blind-bg", blindBg);
    document.documentElement.style.setProperty("--blind-text", blindText);
    document.documentElement.style.setProperty("--font-size", fontSize);
    document.documentElement.style.setProperty("--section-margin", sectionMargin);
    document.documentElement.style.setProperty("--kerning", kerning);
    document.documentElement.style.setProperty("--line-height", spacing);
}

function selectColorScheme(type) {
    // WB default
    // BW black white

    switch (type) {
        case 'WB': {
            localStorage.setItem('--blind-bg', 'white')
            localStorage.setItem('--blind-text', 'black')
            break;
        }
        case 'BW': {
            localStorage.setItem('--blind-bg', 'black')
            localStorage.setItem('--blind-text', 'white')
            break;
        }
        case 'BB': {
            localStorage.setItem('--blind-bg', '#9DD1FF')
            localStorage.setItem('--blind-text', '#063462')
            break;
        }
        case 'BEIGE': {
            localStorage.setItem('--blind-bg', '#f7f3d6')
            localStorage.setItem('--blind-text', '#4d4b43')
            break;
        }
        case 'BROWN': {
            localStorage.setItem('--blind-bg', '#3b2716')
            localStorage.setItem('--blind-text', '#a9e44d')
            break;
        }

    }
    loadVariables();
}

function setFontSize(type) {
    switch (type) {
        case 'S': {
            localStorage.setItem('--font-size', 'var(--font-base)')
            localStorage.setItem('--section-margin', '30px')
            break;
        }
        case 'M': {
            localStorage.setItem('--font-size', 'var(--font-medium)')
            localStorage.setItem('--section-margin', '45px')
            break;
        }
        case 'B': {
            localStorage.setItem('--font-size', 'var(--font-big)')
            localStorage.setItem('--section-margin', '60px')
            break;
        }
    }
    loadVariables();
}
function toggleImg() {
    const isImg = localStorage.getItem('--is-img');
    if (isImg == 'inline-block') {
        localStorage.setItem('--is-img', 'none');
    } else {
        localStorage.setItem('--is-img', 'inline-block');
    }
    loadVariables();
}

function addVoice() {
    if (localStorage.getItem('isVoice') != "true") {
        window.speechSynthesis.cancel();
        return;
    };
    const bodyChilds = document.querySelectorAll('body>*');

    let fullTextArray = [];
    bodyChilds.forEach((item, i) => {
        fullTextArray.push(item.textContent);

        function voiceCallback(e) {
            let text = fullTextArray.slice(i).join(' ');

            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 3;
            window.speechSynthesis.speak(utterance);
        }

        item.addEventListener('click', voiceCallback);
    });

}
function toggleVoice() {
    const toggleBtn = document.querySelector('button[onclick = "toggleVoice()"');

    if (localStorage.getItem('isVoice') == 'true') {
        localStorage.setItem('isVoice', 'false')
        toggleBtn.textContent = 'Голос выкл';
        window.location.reload();
    } else {
        localStorage.setItem('isVoice', 'true')
        toggleBtn.textContent = 'Голос вкл'
    }
    addVoice();
}

function braileConvert(someString) {
    const braileCode = ' ⠁⠃⠺⠛⠙⠑⠡⠚⠵⠊⠯⠅⠇⠍⠝⠕⠏⠗⠎⠞⠥⠋⠓⠉⠟⠱⠭⠷⠮⠾⠪⠳⠫⠲⠖⠤⠦⠴⠣⠜⠂⠢+++++⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠭⠽⠵⠺⠩'.split("");
    const braileCodeNums = '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚'.split("");
    const cyrillic = ' АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.!-«»(),?+++++ABCDEFGHIJKLMNOPQRSTUVXYZW@'.split("");
    const numbers = '1234567890'.split('');
    const map = [];
    const mapNums = [];


    for (let i = 0; i < braileCode.length; i++) {
        map.push([cyrillic[i], braileCode[i]])
    }
    const mapObj = new Map(map);

    for (let i = 0; i < braileCodeNums.length; i++) {
        mapNums.push([numbers[i], braileCodeNums[i]])
    }
    const mapNumsObj = new Map(mapNums);

    if (!someString) return;
    const filterChars = someString.toUpperCase().split("").map(char => {
        const braileChar = mapObj.get(char);
        if (braileChar) return braileChar
        return char
    });
    let isNumber = false;
    const filterNumbers = filterChars.map(char => {
        if (!isNaN(char) && char != ' ' && char != '\n' && char != '') {
            if (!mapNumsObj.get(char)) return;
            if (!isNumber) {
                isNumber = true;
                return '⠼' + mapNumsObj.get(char);
            }

            return mapNumsObj.get(char);
        } else {
            isNumber = false;
            return char
        }
    })

    return filterNumbers.join('');
    // return filterChars.join('');
}

function doBraile() {
    if (localStorage.getItem('isBraile') != 'true') return;
    const allP = document.querySelectorAll('body :is(p, span, a, h2,button:not(.panel__btn))');
    allP.forEach(p => {
        p.textContent = braileConvert(p.textContent);
    })
}
function toggleBraile() {
    const toggleBtn = document.querySelector('button[onlick = "toggleBraile()"');

    if (localStorage.getItem('isBraile') == 'true') {
        localStorage.setItem('isBraile', 'false');
        window.location.reload();
    } else {
        localStorage.setItem('isBraile', 'true');
    }
    doBraile();
}

function kerning(value) {
    localStorage.setItem('--kerning', value + 'px');
    document.documentElement.style.setProperty("--kerning", value + 'px');
}

function spacing(value) {
    localStorage.setItem('--line-height', value);
    document.documentElement.style.setProperty("--line-height", value);
}

function expandBlind() {
    const expand = document.querySelector('.blind-panel__hidden');
    const expandBtn = document.querySelector('button[onclick = "expandBlind()"]');
    if (expandBtn.textContent == "Расширенные настройки") {
        expandBtn.textContent = "Скрыть"
    } else {
        expandBtn.textContent = "Расширенные настройки"
    }
    expand.classList.toggle('blind__visible-flex');
}