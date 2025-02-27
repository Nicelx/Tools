// v.000 developing

class NVideoControls {
    constructor(option) {
        this.playEl = document.querySelector(option.playSelector);
        this.videoEl = document.querySelector(option.videoSelector);
        if (option.progressSelector) {
            this.isCustomProgress = true;
            this.progressEl = document.querySelector(option.progressSelector);
        }

        if (!this.playEl || !this.videoEl) return;

        this.init();
    }

    isCustomProgress = false;
    isPlay = false;
    playEl;
    videoEl;
    progressEl;

    init() {
        this.videoEl.addEventListener('click', () => {
            if (this.isPlay) {
                this.pause();
            } else {
                this.play()
            }
        });
        this.playEl.addEventListener('click', () => {
            this.play();
        })
        this.initProgress();
    }
    initProgress() {
        if (!this.isCustomProgress) return;

        const currentTimeEl = document.querySelector('.speaker__time-1');
        const durationEl = document.querySelector('.speaker__time-2');

        // let duration
        this.videoEl.addEventListener('loadedmetadata', () => {
            // duration = this.handleTime(this.videoEl.duration);
            durationEl.textContent = this.handleTime(this.videoEl.duration);
        })

        this.videoEl.addEventListener("timeupdate", () => {
            let calcPerc = this.videoEl.currentTime / this.videoEl.duration * 100 + "%";
            this.progressEl.style.setProperty('--range-fill', calcPerc);

            currentTimeEl.textContent = this.handleTime(this.videoEl.currentTime);
        })

        this.videoEl.addEventListener('mouseenter', () => {
            this.progressEl.classList.remove('n-hidden');
        })
        this.playEl.addEventListener('mouseenter', () => {
            this.progressEl.classList.remove('n-hidden');
        })
        this.videoEl.addEventListener('mouseleave', () => {
            this.progressEl.classList.add('n-hidden');
        })
        this.progressEl.addEventListener('click', (e) => {
            console.log('offsetX', typeof e.offsetX);
            console.log('offsetWidth', typeof e.target.offsetWidth);
            // console.log('duration', typeof duration, duration);

            
            const currentTime = e.offsetX / e.target.offsetWidth * this.videoEl.duration;
            console.log(currentTime);
            // console.log('currentTime ', currentTime )
            this.videoEl.currentTime = currentTime;
        })
    }


    handleTime(time) {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);

        return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    }

    play() {
        this.videoEl.play();
        this.isPlay = true;
        this.playEl.classList.add('n-hidden');
    }
    pause() {
        this.videoEl.pause();
        this.isPlay = false;
        this.playEl.classList.remove('n-hidden');
    }
}


