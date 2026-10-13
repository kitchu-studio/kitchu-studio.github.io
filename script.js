// Language toggle. Both languages are in the HTML; CSS shows the one in <html data-lang>.
// Set LINE_ID to show a LINE button in the contact section (the part after "~" in your LINE URL).
const LINE_ID = '';

(function () {
  const root = document.documentElement;
  const titles = { th: 'kitchu studio · แอปมือถือสำหรับร้านขนาดเล็ก', en: 'kitchu studio · Mobile apps for small shops' };

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = titles[lang];
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage can be blocked */ }
  }

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* ignore */ }
  const initial = saved === 'th' || saved === 'en' ? saved : (navigator.language || '').toLowerCase().startsWith('th') ? 'th' : 'en';
  setLang(initial);

  document.getElementById('lang').addEventListener('click', function () {
    setLang(root.getAttribute('data-lang') === 'th' ? 'en' : 'th');
  });

  if (LINE_ID) {
    const a = document.createElement('a');
    a.className = 'btn btn-line';
    a.href = 'https://line.me/ti/p/~' + encodeURIComponent(LINE_ID);
    const k = document.createElement('span');
    k.className = 'k';
    k.textContent = 'line';
    a.append(k, LINE_ID);
    const box = document.getElementById('contact-links');
    box.insertBefore(a, box.children[1]);
  }
})();

// Motion: scroll progress bar and reveal-on-scroll. Skipped when the visitor prefers reduced motion.
(function () {
  const bar = document.querySelector('.progress');
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (h.scrollTop / max).toFixed(4) : 0);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { const on = x === t; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
      document.querySelectorAll('.chat-body').forEach(function (b) {
        const show = b.getAttribute('data-p') === t.getAttribute('data-p');
        b.hidden = !show;
        if (show) {
          b.querySelectorAll('.msg').forEach(function (m, i) {
            m.classList.remove('in'); m.style.setProperty('--d', (i * 0.45) + 's');
            void m.offsetWidth; m.classList.add('in');
          });
        }
      });
    });
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  const targets = document.querySelectorAll('.section h2, .section .note, .section .cmd, .project, .ai-list > li, .steps > li, .skills dl > div, .contact-links, .foot, .plan, .chat');
  targets.forEach(function (el) { el.classList.add('rv'); });
  document.querySelectorAll('.skills .chips').forEach(function (ul) {
    Array.from(ul.children).forEach(function (li, i) { li.classList.add('rv'); li.style.setProperty('--d', (i * 0.05) + 's'); });
  });
  document.querySelectorAll('.chat .msg').forEach(function (m, i) { m.classList.add('rv'); m.style.setProperty('--d', (0.5 + i * 0.55) + 's'); });
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
})();
