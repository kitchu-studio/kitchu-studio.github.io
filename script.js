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
    a.textContent = 'LINE';
    const box = document.getElementById('contact-links');
    box.insertBefore(a, box.children[1]);
  }
})();
