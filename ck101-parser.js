// 抓卡提諾文章
let getUrl = (page) => `https://ck101.com/forum.php?mod=viewthread&tid=1762239&extra=&page=${page}`;
let toTxt = (d) => d.text();
let hr = '\n\n=====\n\n';
let getContent = (html) => {
  let doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = html;
  return [...doc.querySelectorAll('.t_f')].map(i => i.textContent).join(hr);
};
let save = (page, text) => {
  console.log(`save page ${page}`);
  localStorage.setItem(`page-${page}`, text);
};

let pages = new Array(48).fill(1).map((i, index) => index + 1);

pages.forEach(index => {
  setTimeout(() => {
    fetch(getUrl(index))
    .then(toTxt)
    .then(getContent)
    .then(d => save(index, d));
  }, index * 500);
});

///
///

let allContents = pages.map(i => localStorage.getItem(`page-${i}`)).join(hr);
x = 123;

let file = new window.Blob([allContents], {type: 'text/plain'});
let downloadLink = document.createElement('a');
downloadLink.href = window.URL.createObjectURL(file);
downloadLink.innerHTML = `Download t.txt`;
downloadLink.onclick = () => {
  downloadLink.download = `t.txt`;
};

document.body.appendChild(downloadLink);
