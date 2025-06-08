function my_collage_3_rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function my_collage_3_add_elements_until_visible() {
  let visible = false;
  do {
    visible = my_collage_3_create_colorblock();
  }
  while (visible);
}

function my_collage_3_create_colorblock() {
  const random = my_collage_3_rand(200, 400);
  const randomcindex = my_collage_3_rand(1, 3);
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
  const wbottom = console.log(window.innerHeight);
  return elemtop < window.innerHeight;
}

function my_collage_3_init() {
  if (typeof Masonry === 'undefined') {
    setTimeout(my_collage_3_init, 300);
  }
  else {
    my_collage_3_add_elements_until_visible();
    addEventListener("scroll", (event) => {
      my_collage_3_add_elements_until_visible();
    });
  }
}
my_collage_3_init();
