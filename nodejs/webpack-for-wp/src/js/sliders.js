const casesOption = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: 20,
    arrows: false,
  
};
const trustOption = {
    type: 'loop',
    perPage: 6,
    arrows: false,
    gap: 20,
    breakpoints: {
        1280 : {
            perPage: 4
        },
        720: {
            perPage: 2
        }
    }
}
const fourItem = {
    type: 'loop',
    perPage: 4,
    arrows: false,
    gap: 20,
    breakpoints: {
        1280 : {
            perPage: 2
        }
    }
}
const tariffsOption = {
    arrows: false,
    pagination: false,
    perPage: 3,
    gap: 20,
    breakpoints : {
        720 : {
            type: 'loop',
            perPage: 1,
            pagination: true,
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/') {
        new Splide('.cases__slider .splide', casesOption)?.mount();
        new Splide('.trust .splide', trustOption)?.mount();
        // new Splide('.certificates .splide', fourItem)?.mount();
    }
    
    if (checkSingle()) {
        new Splide('.cases__slider .splide', casesOption)?.mount();
        new Splide('.trust .splide', trustOption)?.mount();
        // try {
        //     const tariffs = new Splide('.tariffs .splide', tariffsOption);
        //     if (tariffs) tariffs.mount();
        // } catch {

        // }
        
    }
    if (checkSolution()) {
        new Splide('.cases__slider .splide', casesOption)?.mount();
        new Splide('.trust .splide', trustOption)?.mount();
        // new Splide('.certificates .splide', fourItem)?.mount();
        // new Splide('.tariffs .splide', tariffsOption).mount();
    }
    if (window.location.pathname === '/about/') {
        new Splide('.trust .splide', trustOption)?.mount();
    }
    if (window.location.pathname === '/dev-page/') {
        new Splide('.cases__slider .splide', casesOption).mount();
    }
})