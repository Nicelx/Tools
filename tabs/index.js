class Tabs {
    constructor(option) {
        this.triggers = document.querySelectorAll(option.triggersList + ' .tab-item')
        this.contentList = document.querySelectorAll(option.contentList + ' .tab-item')

        if (this.triggers && this.contentList) {
            this.init();
        }
    }

    triggers = [];
    contentList = [];

    init() {
        this.triggers[0].classList.add('active-tab');
        this.contentList[0].classList.add('n__opened')
       
        this.triggers.forEach((item, index) => {
            if (index == 0) {
                item.classList.add('n__opened');
            }
            item.addEventListener('click', (e) => {
                this.removeOpened();
                e.target.classList.add('active-tab');
                this.selectItem(index);
            });
        })
    }
    removeOpened() {
        console.log('removeOpened');
        this.contentList.forEach(item => {
            item.classList.remove('n__opened');
        })
        this.triggers.forEach(item => {
            item.classList.remove('active-tab');
        })
    }
    selectItem(index) {
        this.contentList[index].classList.add('n__opened');
    }
}

// usage!!!!!!!!! 

new Tabs({
    triggersList: '.triggers',
    contentList: '.content',
} )