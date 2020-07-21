## USAGE:

1. fill text in html div tasg: `id="c1"`
2. drag html file into browser.
3. change color by modifying url query string, see options below.

## CONTROL:

* `←`, `→`  
  prev page, next page
* `Page Down`, `Space`  
  scroll down, and it will go to next page when press agian at footer
* `Esc`  
  show sidebar with all links of page

## OPTIONS:

### by JS

#### `strs`

string Array to replace

e.q.

``` javascript
var strs = [
  [/魔法道具/g, '魔導具',],
  [/(妾身?)/g, '<ruby>我<rt>$1</rt></ruby>',],
];
```

### by URL (style)

`?color=%23FFF&fz=12px&bgc=pink`

* `color`: css font color
* `fz`: css font-size
* `bgc`: css background color

* `ln`: set how many line(s) per pages  
  default: 20 lines per page
