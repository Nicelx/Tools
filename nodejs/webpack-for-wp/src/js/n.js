class NMovingScroll {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.elements = this.container.querySelectorAll('.n-moving-scroll__track>*');
        this.track = document.querySelector('.n-moving-scroll__track');

        // console.log(this.track.innerHTML);
        this.track.innerHTML = this.track.innerHTML + this.track.innerHTML + this.track.innerHTML;
        let itemsArray = Array.from(this.elements);
        // console.log('elements', itemsArray);
    }

    // init() {
    //     this.container;
    // }
}

class NAccordion {
    // in development and testing
    constructor(selector) {
        this.container = document.querySelector(selector);
        if (this.container) {
            this.items = this.container.querySelectorAll('.n-accordion__item');

            this.items.forEach(item => {
                item.addEventListener('click', () => {
                    const panel = item.querySelector('.n-accordion__panel');

                    if (item.classList.contains('n-accordion__item--opened')) {
                        panel.style.height = '0px';
                        item.classList.remove('n-accordion__item--opened');
                        this.isSomethingOpen = false;
                        return;
                    } else {
                        panel.style.height = `${panel.scrollHeight}px`;
                        if (this.isSomethingOpen) {
                            const opened = this.container.querySelector('.n-accordion__item--opened');
                            const openedPanel = opened.querySelector('.n-accordion__panel')

                            openedPanel.style.height = '0px';
                            opened.classList.remove('n-accordion__item--opened');
                        }
                        item.classList.add('n-accordion__item--opened');
                        this.isSomethingOpen = true;
                    }
                    // item.classList.toggle('n-accordion__item--opened')
                })

            })

        } else throw new Error('this.container is not defined')
    }
    isSomethingOpen = false;
}

// scroll animation v0X


// drag content

class NDrag {
    // v.0.2 test 
    constructor(selector, options) {
        this.track = document.querySelector(selector + ' .n-drag__track');
        this.init();
    }

    init() {
        this.isDragging = false;
        this.startingX = 0;
        this.initialPosition = 0;

        // this.track.addEventListener('mousedown', this.mouseDownHandler);
        // this.track.addEventListener('touchdown', this.mouseDownHandler);
        this.track.addEventListener('pointerdown', this.mouseDownHandler);
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('touchmove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler)
        // document.addEventListener('touchup', this.mouseUpHandler)
    }
    disable() {
        this.track.removeEventListener('pointerdown', this.mouseDownHandler)
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler)
        this.track.style.transform = `translateX(0px)`;
    }


    mouseDownHandler = (e) => {
        this.isDragging = true;
        this.startingX = e.clientX;
        console.log('mouseDownHandler');
    }

    mouseMoveHandler = (e) => {
        console.log('mouseMoveHandler', e.clientX, e.pageX, e.touches.clientX);
        if (!this.isDragging) return;
        let delta;
        if (this.startingX == 0) {
            delta = 0;
        } else {
            // delta = e.clientX - this.startingX;
            // delta = e.pageX - this.startingX;
            delta = e.touches.clientX - this.startingX;

        }

        this.track.style.transform = `translateX(${this.initialPosition + delta}px)`;
    }

    mouseUpHandler = (e) => {
        if (!this.isDragging) return;
        // this.initialPosition = this.initialPosition + e.clientX - this.startingX;
        // this.initialPosition = this.initialPosition + e.pageX - this.startingX;
        this.initialPosition = this.initialPosition + e.touches.clientX - this.startingX;
        this.track.style.transform = `translateX(${this.initialPosition})`;
        this.startingX = 0;
        this.isDragging = false;
    }
}


class NWizardForm {
    // v.0 developing
    constructor(container) {
        // this.steps = [...document.querySelectorAll(container + ' .n-wizard-form__step')];
        this.steps = document.querySelectorAll(container + ' .n-wizard-form__step');

        this.nextBtns = document.querySelectorAll(container + ' .n-wizard-form__next');
        this.nextBtns.forEach(nextBtn => {
            nextBtn.addEventListener('click', this.updateStep);
        })
        // this.nextBtn.addEventListener('click', this.updateStep);

        this.steps[this.currentStep].classList.remove('n-wizard-form__step');
    }

    currentStep = 0;
    updateStep = () => {
        console.log(this);
        this.steps[this.currentStep].classList.add('n-wizard-form__step')
        this.currentStep++;
        console.log(this.currentStep);
        this.steps[this.currentStep].classList.remove('n-wizard-form__step');
    }
}

class NTabs {
    // v 0.1 testing
    constructor(option) {
        if (!option.selector) {
            console.error('NTabs selector is missing');
            return;
        }

        this.triggers = document.querySelectorAll(option.selector + ' .n-tabs__triggers .n-tabs__item')
        this.contentList = document.querySelectorAll(option.selector + ' .n-tabs__content .n-tabs__item')

        if (this.triggers && this.contentList) {
            this.init();
        }
    }

    triggers = [];
    contentList = [];

    init() {
        this.triggers[0].classList.add('n-tabs__active');
        this.contentList[0].classList.add('n-tabs__opened')

        this.triggers.forEach((item, index) => {
            if (index == 0) {
                item.classList.add('n-tabs__opened');
            }
            item.addEventListener('click', (e) => {
                this.removeOpened();
                this.selectItem(index);
            });
        })
    }
    removeOpened() {
        this.contentList.forEach(item => {
            item.classList.remove('n-tabs__opened');
        })
        this.triggers.forEach(item => {
            item.classList.remove('n-tabs__active');
        })
    }
    selectItem(index) {
        this.triggers[index].classList.add('n-tabs__active');
        this.contentList[index].classList.add('n-tabs__opened');
    }
}

class NModal {
    // v 1.1
    constructor(option) {
        if (!option.modal || !option.triggers) {
            console.error('modal and triggers fields are required');
        }

        this.modal = document.querySelector(option.modal);
        this.triggers = document.querySelectorAll(option.triggers);
        this.backdrop = this.modal.querySelector('.n-modal__backdrop');
        this.closers = option.closers;
        this.init();
    }
    isOpen = false;

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                this.open();
            })
        });
        if (this.closers) {
            this.closers.forEach(closer => {
                const closerElement = document.querySelector(closer);

                closerElement.addEventListener('click', () => {
                    this.close();
                })
            })
        }

        this.backdrop.addEventListener('click', () => {
            this.close();
        })
    }
    open() {
        this.modal.classList.add('n-modal__opened');
        // if (this.dynamic) {
        //     console.log('dynamic', this.modal.firstElementChild);
        // } else {
        //     console.log('not dynamic');
        // }
    }
    close() {
        this.modal.classList.remove('n-modal__opened');
    }
}

function onNRotate(card) {
    const innerCard = card.querySelector('.n-rotate__inner');
    innerCard.classList.toggle('n-rotate__flipped');
}
function checkSingle() {
    // v.000
    const regex = /^\/services\/.+/;
    return regex.test(window.location.pathname);
}
function checkSolution() {
    const regex = /^\/solutions\/.+/;
    return regex.test(window.location.pathname);
}