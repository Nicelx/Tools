function n__inject(fromSelector, toSelector) {
    // v. 1.01
    const fromEl = document.querySelector(fromSelector);
    const toEl = document.querySelector(toSelector);

    toEl.innerHTML = fromEl.innerHTML;
}