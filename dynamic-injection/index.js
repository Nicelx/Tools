// v1.0

function inject(fromSelector, toSelector) {
    const fromEl = document.querySelector(fromSelector);
    const toEl = document.querySelector(toSelector);


    console.log(fromEl, toEl);
    toEl.innerHTML = fromEl.innerHTML;
    console.log('inject()');
}