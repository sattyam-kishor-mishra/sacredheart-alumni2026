// Always open at the top; the page only moves when the visitor scrolls or clicks a link.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
// ---- Settings you can change ----
const EVENT_DATE = '2026-11-14T14:00:00+05:30';
const YOUTUBE_ID = '';          // e.g. 'abc123XYZ'. Leave empty to use videos/invite.mp4
// ---------------------------------
const $ = s => document.querySelector(s), pad = n => String(n).padStart(2, '0');
function tick() {
  let t = Math.max(0, new Date(EVENT_DATE) - Date.now());
  $('#d').textContent = Math.floor(t / 864e5);
  $('#h').textContent = pad(Math.floor(t / 36e5) % 24);
  $('#m').textContent = pad(Math.floor(t / 6e4) % 60);
  $('#s').textContent = pad(Math.floor(t / 1e3) % 60);
}
tick(); setInterval(tick, 1000);

// hero background crossfade
const hb = [...document.querySelectorAll('.hero-bg img')]; let hi = 0;
setInterval(() => { hb[hi].classList.remove('on'); hi = (hi + 1) % hb.length; hb[hi].classList.add('on'); }, 7000);

// memory slider
const sl = [...document.querySelectorAll('.slides figure')], th = $('#thumbs'); let si = 0, timer;
sl.forEach((f, i) => { const im = document.createElement('img'); im.src = f.querySelector('img').src; im.alt = ''; im.onclick = () => go(i); th.append(im); });
function go(n) {
  si = (n + sl.length) % sl.length;
  sl.forEach((f, i) => f.classList.toggle('on', i === si));
  [...th.children].forEach((t, i) => t.classList.toggle('on', i === si));
  const tn = th.children[si]; th.scrollLeft = tn.offsetLeft - (th.clientWidth - tn.clientWidth) / 2;   // moves only the thumbnail strip, never the page
  clearInterval(timer); timer = setInterval(() => go(si + 1), 6000);
}
$('.prev').onclick = () => go(si - 1); $('.next').onclick = () => go(si + 1);
document.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(si - 1); if (e.key === 'ArrowRight') go(si + 1); });
go(0);

// video: YouTube if ID set, otherwise local file with a friendly fallback
const box = $('#video'), vid = box.querySelector('video');
if (YOUTUBE_ID) box.innerHTML = `<iframe src="https://www.youtube.com/embed/${YOUTUBE_ID}" allowfullscreen></iframe>`;
else vid.querySelector('source').addEventListener('error', () => box.classList.add('empty'));
