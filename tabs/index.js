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