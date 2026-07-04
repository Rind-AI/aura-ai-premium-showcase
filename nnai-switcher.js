/* NNAI Profile Switcher — floating "colour palette" that opens any of the 10 portfolio
   editions. Self-contained: injects its own styles + DOM, themes itself from the host
   page's CSS variables (--surface/--ink/--line/--acc), so it matches light + dark
   automatically. Bottom-left so it never collides with the chat bubble (bottom-right).
   Drop one line into any edition:  <script src="nnai-switcher.js"></script>          */
(function () {
  var PROFILES = [
    { key: 'lattice',  n: 'LATTICE',  role: 'The Signal',      file: 'lattice.html',  c: '#4F46E5' },
    { key: 'meridian', n: 'MERIDIAN', role: 'The Proof',       file: 'meridian.html', c: '#2563EB' },
    { key: 'nest',     n: 'NEST',     role: 'Foundations',     file: 'nest.html',     c: '#C05F3C' },
    { key: 'circuit',  n: 'CIRCUIT',  role: 'The Future',      file: 'circuit.html',  c: '#0891B2' },
    { key: 'noir',     n: 'NOIR',     role: 'The Craft',       file: 'noir.html',     c: '#FF5B2E' },
    { key: 'lagoon',   n: 'LAGOON',   role: 'The Local',       file: 'lagoon.html',   c: '#0E9F6E' },
    { key: 'aurum',    n: 'AURUM',    role: 'The Value',       file: 'aurum.html',    c: '#B0872E' },
    { key: 'gazette',  n: 'GAZETTE',  role: 'The Work',        file: 'gazette.html',  c: '#B23A2E' },
    { key: 'horizon',  n: 'HORIZON',  role: 'The Beginning',   file: 'horizon.html',  c: '#EA580C' },
    { key: 'terminal', n: 'TERMINAL', role: 'The Process',     file: 'terminal.html', c: '#16A34A' }
  ];

  // Which edition are we on?  index.html (the live homepage) is the LAGOON copy.
  var base = (location.pathname.split('/').pop() || '').toLowerCase().replace('.html', '');
  if (base === '' || base === 'index') base = 'lagoon';
  var current = base;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = ''
    + '.nnsw{position:fixed;left:22px;bottom:22px;z-index:9500;font-family:var(--fb,system-ui,sans-serif);}'
    + '.nnsw *{box-sizing:border-box;}'
    + '.nnsw-btn{display:inline-flex;align-items:center;gap:10px;padding:11px 16px 11px 13px;border-radius:100px;'
    +   'background:var(--surface,#fff);color:var(--ink,#14151A);border:1px solid var(--line,#e4e6ee);cursor:pointer;'
    +   'box-shadow:0 12px 34px -18px rgba(0,0,0,.5);' + (reduce ? '' : 'transition:transform .3s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .3s;') + '}'
    + '.nnsw-btn:hover{transform:translateY(-2px);border-color:var(--acc,#0E9F6E);box-shadow:0 18px 40px -18px rgba(0,0,0,.55);}'
    + '.nnsw-swatch{width:16px;height:16px;border-radius:50%;flex:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--acc,#0E9F6E) 22%,transparent);}'
    + '.nnsw-lab{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;line-height:1;}'
    + '.nnsw-lab small{display:block;font-size:9px;font-weight:600;letter-spacing:.14em;opacity:.55;margin-top:3px;}'
    + '.nnsw-ico{width:14px;height:14px;flex:none;opacity:.5;' + (reduce ? '' : 'transition:transform .35s cubic-bezier(.16,1,.3,1);') + '}'
    + '.nnsw.open .nnsw-ico{transform:rotate(45deg);opacity:.85;}'
    + '.nnsw-panel{position:absolute;left:0;bottom:calc(100% + 12px);width:290px;max-height:min(70vh,560px);overflow-y:auto;'
    +   'background:var(--surface,#fff);border:1px solid var(--line,#e4e6ee);border-radius:18px;padding:14px;'
    +   'box-shadow:0 30px 70px -30px rgba(0,0,0,.6);opacity:0;transform:translateY(10px) scale(.98);pointer-events:none;'
    +   (reduce ? '' : 'transition:opacity .28s ease,transform .28s cubic-bezier(.16,1,.3,1);') + '}'
    + '.nnsw.open .nnsw-panel{opacity:1;transform:none;pointer-events:auto;}'
    + '.nnsw-hd{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--dim,#8A8D99);padding:6px 8px 12px;}'
    + '.nnsw-it{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 10px;border:0;border-radius:12px;'
    +   'background:transparent;color:var(--ink,#14151A);cursor:pointer;' + (reduce ? '' : 'transition:background .2s;') + '}'
    + '.nnsw-it:hover{background:color-mix(in srgb,var(--ink,#14151A) 6%,transparent);}'
    + '.nnsw-it .d{width:18px;height:18px;border-radius:50%;flex:none;}'
    + '.nnsw-it .nm{font-size:13px;font-weight:700;letter-spacing:.04em;}'
    + '.nnsw-it .rl{font-size:11px;color:var(--dim,#8A8D99);margin-top:1px;font-weight:500;letter-spacing:normal;}'
    + '.nnsw-it .num{margin-left:auto;font-size:10px;font-weight:700;color:var(--dim,#8A8D99);letter-spacing:.1em;}'
    + '.nnsw-it.on{background:color-mix(in srgb,var(--acc,#0E9F6E) 14%,transparent);}'
    + '.nnsw-it.on .num{color:var(--acc,#0E9F6E);}'
    + '@media(max-width:520px){.nnsw{left:14px;bottom:14px;}.nnsw-panel{width:min(84vw,290px);}.nnsw-lab small{display:none;}}';

  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var cur = PROFILES.filter(function (p) { return p.key === current; })[0] || PROFILES[5];

    var wrap = document.createElement('div'); wrap.className = 'nnsw';
    var btn = document.createElement('button');
    btn.className = 'nnsw-btn'; btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Switch design edition');
    btn.innerHTML =
      '<span class="nnsw-swatch" style="background:' + cur.c + '"></span>'
      + '<span class="nnsw-lab">Design<small>' + cur.n + '</small></span>'
      + '<svg class="nnsw-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';

    var panel = document.createElement('div'); panel.className = 'nnsw-panel';
    var html = '<div class="nnsw-hd">Ten design personalities · pick one</div>';
    PROFILES.forEach(function (p, i) {
      var on = p.key === current ? ' on' : '';
      var num = ('0' + (i + 1)).slice(-2);
      html += '<button class="nnsw-it' + on + '" data-file="' + p.file + '">'
        + '<span class="d" style="background:' + p.c + '"></span>'
        + '<span><span class="nm">' + p.n + '</span><span class="rl">' + p.role + '</span></span>'
        + '<span class="num">' + num + '</span></button>';
    });
    panel.innerHTML = html;
    wrap.appendChild(panel); wrap.appendChild(btn);
    document.body.appendChild(wrap);

    function setOpen(o) { wrap.classList.toggle('open', o); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!wrap.classList.contains('open')); });
    panel.addEventListener('click', function (e) {
      var it = e.target.closest('.nnsw-it'); if (!it) return;
      var f = it.getAttribute('data-file');
      if (it.classList.contains('on')) { setOpen(false); return; }
      location.href = f;
    });
    document.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
