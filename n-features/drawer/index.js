// v.0 tests

class NDrawer {
        // {
        //     drawer : 'drawer selector'
        //     triggers : 'selector rule', 'another Selector rule if needed'
        //     direction : 'toTop | toBottom | toLeft | toRight | custom'
        // }
        constructor(options) {
          this.drawerEl = document.querySelector(options.drawer);
          this.triggers = document.querySelectorAll(options.triggers);
          this.direction = options.direction;
          this.backdrop = document.querySelector('.n-drawer__backdrop');

          this.init();
        }
        init() {
          this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
              console.log('trigger in init', trigger)
              this.open();
            })
          })
          this.backdrop.addEventListener('click', () => {
            this.close();
          })
        }
        open() {
          this.drawerEl.classList.add('n-drawer--open');
          this.drawerEl.classList.add('n-drawer--toBottom')
          this.backdrop.classList.add('n-drawer--open');
        }
        close() {
          this.drawerEl.classList.remove('n-drawer--open');
          this.backdrop.classList.remove('n-drawer--open');
        }
      }