window.addEventListener('DOMContentLoaded', () => {
    new NModal({
        modal: '.in-dev.n-modal',
        triggers: ['.controls__theme', '.controls__profile', '.controls__lang', '.nav__item:nth-child(5)', '.nav__item:nth-child(6)', '.header__loc button'],
        closers: ['.in-dev .close-modal']
    });

    new NModal({
        modal: '.dialog-modal',
        triggers: ['.header__recall button',
            '.service-banner .button',
            '.banner__btn', '.small-banner__details',
            '.cases__btn a',
            '.solutions__card:not(.solutions__card:first-child)',
            '.business-test__btn',
            '.solution-banner .button',
            '.stages__last-card .button'
        ],
        closers: ['.dialog-modal .close-modal']
    });

    try {
        Fancybox.bind("[data-fancybox]", { Thumbs: false });
    } catch (error) {
        
    }


    new NTabs({ selector: '.header--mobile .abilities .n-tabs' })
    new Tabbar({ drop: '.tabbar__drop' });

    try {
        if (window.location.pathname === "/") {
            // new NMovingScroll('.n-moving-scroll');
            new NAccordion('.faq ');
            new NTabs({ selector: 'main .abilities .n-tabs' })
        }
        if (checkSingle()) {
            // new NMovingScroll('.n-moving-scroll');
            new NAccordion('.faq ');
        }
        if (checkSolution()) {
            new NAccordion('.faq ');
            switchBetterThan();
        }
        if (window.location.pathname === '/dev-page/') {
            const servicesTabs = new NTabs({ selector: 'main .n-tabs' })
        }
        if (window.location.pathname === '/services/') {
            const servicesTabs = new NTabs({ selector: 'main .abilities .n-tabs' })

            const urlParams = new URLSearchParams(window.location.search);
            const tabNum = urlParams.get('tab');

            if (tabNum) {
                servicesTabs.removeOpened();
                servicesTabs.selectItem(tabNum)
            }
        }
        if (window.location.pathname === '/cases/') {
            console.log('cases page');

            ndragInstance = new NDrag('.n-drag');
            sidebarHandler(ndragInstance);
        }
    } catch (error) {
        console.error(error);
    }



    // scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
            else {
                entry.target.classList.remove("show");
            }
            // console.log(entry);
        });
    });
    const hiddenElements = document.querySelectorAll(".hide");
    hiddenElements.forEach((el) => observer.observe(el));

    try {
        phoneMasks();
    } catch {
        console.log('phone mask is missing');
    }
})

function switchBetterThan() {
    const betterThanCardsElem = document.querySelector('.better-than__cards');
    if (betterThanCardsElem) {
        betterThanCardsElem.addEventListener('click', () => {
            betterThanCardsElem.classList.toggle('better-than--malina-active');
        })
    }
}

class Tabbar {
    constructor(options) {
        this.drop = document.querySelector(options.drop);
        this.closeEl = document.querySelector('.tabbar__close');
        this.openBtns = document.querySelectorAll('.tabbar__drop--trigger');
        this.init();
    }
    isOpen = false;
    init() {
        this.closeEl.addEventListener('click', () => {
            this.close();
            this.clearActive();

        });
        this.openBtns.forEach(item => {
            item.addEventListener('click', (event) => {
                this.open(event);
            })
        })
    }
    close() {
        this.drop.classList.remove('tabbar__drop--open');
    }
    open(event) {
        const tabbar__item = event.target.closest('.tabbar__item');
        if (this.isOpen) {
            if (tabbar__item.classList.contains('tabbar__item--active')) {
                this.close();
                this.clearActive();
                return;
            } else {
                this.clearActive();
                // tabbar__item.classList.add('tabbar__item--active');
                this.activateItem(tabbar__item);
            }
        }
        this.drop.classList.add('tabbar__drop--open');
        // tabbar__item.classList.add('tabbar__item--active');
        this.activateItem(tabbar__item);
        this.isOpen = true;
    }
    clearActive() {
        const openedBtn = document.querySelector('.tabbar__item--active');
        openedBtn.classList.remove('tabbar__item--active');
        this.isOpen = false;
    }
    activateItem(item) {
        const activeContent = document.querySelector('.tabbar__content--open');
        if (activeContent) {
            activeContent.classList.remove('tabbar__content--open');
        }
        item.classList.add('tabbar__item--active');
        const tablink = item.dataset.tabLink;
        const activeTabbarContent = document.querySelector(`.tabbar__drop div[data-tab-link="${tablink}"]`);
        activeTabbarContent.classList.add('tabbar__content--open');
        // this.drop.style.height = `${activeTabbarContent.scrollHeight+80}px`;

        // console.log(activeTabbarContent);

        // console.log('ish', item.style.height);

    }
}

function sidebarHandler(dragInstance) {
    const sidebar = document.querySelector('.sidebar');

    const sidebarTrigger = document.querySelector('.sidebar__trigger');
    sidebarTrigger.addEventListener('click', () => {
        if (window.innerWidth <= 1280) {
            sidebar.classList.add('sidebar--see-all');
            dragInstance.disable();
        }
    })
    const sidebarClose = sidebar.querySelector('.sidebar__close');
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('sidebar--see-all');
        dragInstance.init();
    })
}

// function 

function phoneMasks() {
    const telInputs = document.querySelectorAll(".wpcf7-tel");
    if (!telInputs) return;

    telInputs.forEach((field) => {
        var phoneMask = IMask(field, {
            mask: [
                {
                    mask: "0 (000) 000-00-00",
                    startsWith: "8",
                    lazy: true,
                    country: "Russia",
                },
                {
                    mask: "+{7} (000) 000-00-00",
                    startsWith: "",
                    lazy: true,
                    country: "Russia",
                },
            ],
            // minLength : 10,
            dispatch: function (appended, dynamicMasked) {
                var number = (dynamicMasked.value + appended).replace(/\D/g, "");
                return dynamicMasked.compiledMasks.find(function (m) {
                    return number.indexOf(m.startsWith) === 0;
                });
            },
        });
        field.addEventListener("focusout", () => {


            if (field.value.length < 18) {
                field.value = "";
                phoneMask.updateValue('');
            }
        });
    });
}