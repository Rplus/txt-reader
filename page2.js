let p;
let br = [];
let ln;
let str;

function updateHash(p) {
  location.hash = `#p${p}`;
}

function goPrev() {
  updateHash(p - 1);
}
function goNext() {
  updateHash(p + 1);
}

function insetText(p = 0) {
  if (p < 0) { return; }
  let txt = str.slice(br[p * ln], br[(p + 1) * ln]) + `\n\n<hr>#p${p}`;
  if (window.strs) {
    for (let s in strs) {
      txt = txt.replace(strs[s][0], strs[s][1]);
    }
  }
  c2.innerHTML = txt;
  window.scrollTo(0, 0);
  // location.hash = `#${p}`;
}
function getPage(uri) {
  let n = +uri.replace('#p', '');
  return isNaN(n) ? 0 : n;
}

function initKeyEvent(argument) {
  window.addEventListener('hashchange', () => {
    console.log('_hashchange_');
    p = getPage(location.hash);
    insetText(p);
  });

  let scrollY = -1;
  document.documentElement.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
      case 'Escape':
        navctrl.checked = !navctrl.checked;
        if (document.querySelector(location.hash)) {
          document.querySelector(location.hash).scrollIntoView();
        }
        break;

      case 'End':
      case 'Home':
      case 'F12':
        // let gg = window.confirm(`go to ${e.key}?`);
        // if (!gg) { e.preventDefault(); }
        break;

      case 'ArrowLeft':
        if (p > 0) {
          p--;
        }
        updateHash(p);
        break;

      case 'Space':
      case ' ':
      case 'PageDown':
        if (scrollY === window.scrollY && window.scrollY !== 0) {
          p++;
          updateHash(p);
          e.preventDefault();
        }
        scrollY = window.scrollY;
        break;

      case 'ArrowRight':
        p++;
        updateHash(p);
        break;

      case 'ArrowUp':
      case 'ArrowDown':
        if (e.altKey) {
          updateLightness(e.key === 'ArrowUp');
          return;
        }

      default:
        scrollY = -1;
        break;
    }
  })
}

window.onload = () => {
  initTxt();
  initConfig();
  initCtrl();
  initKeyEvent();
};

function initConfig() {
  let qs = location.search ? new URLSearchParams(location.search) : null;

  ln = +(qs && qs.get('ln') || 200);
  p = getPage(location.hash);

  if (qs) {
    ['color', 'fz', 'bgc'].forEach((prop) => {
      if (qs.get(prop)) {
        document.body.style.setProperty(`--${prop}`, qs.get(prop));
      }
    });
  }
  insetText(p);
}

function initTxt() {
  str = c1.textContent;
  for(let i = 0; i < str.length; i++) {
    if (str[i] === '\n') br.push(i);
  }
}

function initCtrl() {
  let _fz = parseInt(window.getComputedStyle(c2).fontSize);
  let _color = rgb2hex(window.getComputedStyle(c2).color);
  let _bgc = rgb2hex(window.getComputedStyle(document.body).backgroundColor);

  c2.insertAdjacentHTML('afterend', `
    <input type="checkbox" id="navctrl">
    <nav id="nav">
      <div class="nav-btn">
        <button>L</button>
        <button>R</button>
      </div>
      <ul id="navul"></ul>
      <div class="configs">
        <input type="number" id="fz" value=${_fz} />
        <input type="color" id="color1" value=${_color} />
        <input type="color" id="color2" value=${_bgc} />
      </div>
    </nav>
    <label for="navctrl" class="navctrl-label"></label>
    <label for="navctrl" class="navctrl-overlay"></label>
  `);

  nav.querySelectorAll('button')[0].onclick = goPrev;
  nav.querySelectorAll('button')[1].onclick = goNext;

  color1.onchange = (e) => {
    document.body.style.setProperty(`--color`, e.target.value);
  }
  color2.onchange = (e) => {
    document.body.style.setProperty(`--bgc`, e.target.value);
  }
  fz.onchange = (e) => {
    document.body.style.setProperty(`--fz`, e.target.value);
  }

  navul.innerHTML = new Array(Math.ceil(br.length / ln))
    .fill(1).map((i, idx) => `<li><a id="p${idx}" href="#p${idx}">p${idx}</a></li>`).join('');

  c1.remove();
}

function updateLightness(up) {
  let colorHsl = rgb2hslObj(getRgbColor(c2));
  colorHsl.l = Math.max(0, colorHsl.l - 0.05 * (up ? -1 : 1));
  document.body.style.setProperty(`--color`, `hsl(${colorHsl.h}, ${colorHsl.s*100}%, ${colorHsl.l*100}%)`);
}

function rgb2hex(rgb) {
  return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
}

function rgb2hslObj(rgb) {
  let [r, g, b] = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(i => i / 255);

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  // return `hsl(${h}, ${s}%, ${l}%)`;
  return {h, s, l};
}

function getRgbColor(node) {
  return window.getComputedStyle(node).color;
}

function hsl2rgb(hslObj) {
  document.head.style.color = `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
  return getRgbColor(document.head);
}
