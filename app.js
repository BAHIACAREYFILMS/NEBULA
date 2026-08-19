const total = 17;
const image = document.querySelector('#current-slide');
const counter = document.querySelector('#slide-count');
const thumbs = document.querySelector('#thumbs');
let current = 1;

const pathFor = n => `assets/slides/source-slide-${String(n).padStart(2, '0')}.png`;

function showSlide(n) {
  current = ((n - 1 + total) % total) + 1;
  image.src = pathFor(current);
  image.alt = `Diapositiva ${current} de la presentación NEBULA`;
  counter.textContent = `${String(current).padStart(2, '0')} / ${total}`;
  document.querySelectorAll('.thumb').forEach((button, index) => {
    button.classList.toggle('active', index + 1 === current);
    button.setAttribute('aria-current', index + 1 === current ? 'true' : 'false');
  });
  document.querySelector(`.thumb:nth-child(${current})`)?.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
}

for (let n = 1; n <= total; n++) {
  const button = document.createElement('button');
  button.className = 'thumb';
  button.type = 'button';
  button.setAttribute('aria-label', `Ver diapositiva ${n}`);
  const thumb = document.createElement('img');
  thumb.src = pathFor(n);
  thumb.alt = '';
  thumb.loading = 'lazy';
  button.appendChild(thumb);
  button.addEventListener('click', () => showSlide(n));
  thumbs.appendChild(button);
}

document.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showSlide(current - 1);
  if (event.key === 'ArrowRight') showSlide(current + 1);
});

let touchStart = null;
image.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
image.addEventListener('touchend', event => {
  if (touchStart === null) return;
  const delta = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(delta) > 45) showSlide(current + (delta < 0 ? 1 : -1));
  touchStart = null;
}, {passive:true});

showSlide(1);
