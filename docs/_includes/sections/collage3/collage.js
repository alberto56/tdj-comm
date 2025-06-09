class MyCollage3 {
  constructor() {
    this._instance = null;
    this._lastScolledHeight = 0;
    this._justScrolled = false;
  }
  static instance() {
    if (!MyCollage3._instance) {
      MyCollage3._instance = new MyCollage3();
    }
    return MyCollage3._instance;
  }
  masonryLibraryIsLoaded() {
    return typeof Masonry !== 'undefined' && document.querySelector('.my-collage-3-put-blocks-here');
  }
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  showElement() {
    const random = this.rand(200, 400);
    const randomcindex = this.rand(1, 3);
    const randomc = ['red', 'yellow', 'green'][randomcindex - 1];
    var new_html = `<div class="card">
      <div class="card-body" style="background: ${randomc}; height: ${random}px">
        HELLO WORLD
      </div>
    </div>
    `;
    var new_elem = document.createElement('div');
    // .html(new_html)
    new_elem.classList.add('my-collage-3-card');
    new_elem.classList.add('col-12');
    new_elem.classList.add('col-md-6');
    new_elem.classList.add('col-lg-4');
    new_elem.classList.add('mb-4');
    new_elem.style.position = 'absolute';
    new_elem.style.left = '0%';
    new_elem.style.top = '0px';
    new_elem.innerHTML = new_html;
    // .append(element)
    const parent = document.querySelector('.my-collage-3-put-blocks-here');
    if (parent) {
      parent.appendChild(new_elem);
    }
    new Masonry('.my-collage-3-put-blocks-here').layout();
    const elemtop = new_elem.getBoundingClientRect().top;
    return elemtop < window.innerHeight;
  }
  scrolledToNewTerritory() {
    const previoslyScrolledHeight = this._lastScolledHeight;
    const currentWindowHeight = window.scrollY;

    return currentWindowHeight >= previoslyScrolledHeight;
  }
  addElementsWhileVisible() {
    let visible = false;
    do {
      visible = this.showElement();
    }
    while (visible);
  }
  addElementsWhileVisibleAndRecordLastWindowHeight() {
    // First, figure out if we have scrolled to new territory.
    if (this.scrolledToNewTerritory()) {
      // Remember where we have scrolle to, for next time.
      const height = window.scrollY;
      this._lastScolledHeight = Math.max(this._lastScolledHeight, height);
      // Add some elements until we run out of space.
      this.addElementsWhileVisible();
    }
  }
  monitorScroll() {
    if (this._justScrolled) {
      this.addElementsWhileVisibleAndRecordLastWindowHeight();
      this._justScrolled = false;
    }
    setTimeout(() => {
      this.monitorScroll();
    }, 1000);
  }
  init() {
    const that = this;
    if (this.masonryLibraryIsLoaded()) {
      that._justScrolled = true;
      addEventListener("scroll", (event) => {
        that._justScrolled = true;
      });
      that.monitorScroll();
    }
    else {
      setTimeout(function() {
        that.init()
      }, 1000);
    }
  }
}

MyCollage3.instance().init();
