let p;

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
  if (strs) {
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

window.onload = () => {
  let qs = location.search ? new URLSearchParams(location.search) : null;

  ln = +(qs && qs.get('ln') || 200);
  str = c1.textContent;
  br = [];
  p = getPage(location.hash);


  if (qs) {
    ['color', 'fz', 'bgc'].forEach((prop) => {
      if (qs.get(prop)) {
        document.body.style.setProperty(`--${prop}`, qs.get(prop));
      }
    });
  }

  let scrollY = -1;

  for(let i = 0; i < str.length; i++) {
    if (str[i] === '\n') br.push(i);
  }

  navul.innerHTML = new Array(Math.ceil(br.length / ln))
    .fill(1).map((i, idx) => `<li><a id="p${idx}" href="#p${idx}">p${idx}</a></li>`).join('');

  c1.remove();
  insetText(p);


  window.addEventListener('hashchange', () => {
    console.log('_hashchange_');
    p = getPage(location.hash);
    insetText(p);
  });

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

      default:
        scrollY = -1;
        break;
    }
  })
};
