# readcsv

Parse CSV file with format detection for Node.js

[![Build Status](https://travis-ci.org/fvdm/nodejs-readcsv.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-readcsv)

[![Build Status](https://travis-ci.org/fvdm/nodejs-readcsv?branch=master)](https://travis-ci.org/fvdm/nodejs-readcsv)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-readcsv/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-readcsv?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/fvdm/nodejs-readcsv/badges/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-readcsv/develop/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/fvdm/nodejs-readcsv/badges/code.svg)](https://www.bithound.io/github/fvdm/nodejs-readcsv)

* [Node.js](https://nodejs.org/)


## Example

```js
const readcsv = require ('readcsv');

const file = '/path/to/file.csv';

readcsv (true, file, (err, data) => {
  if (err) {
    console.log (err);
    return;
  }

  console.log (data);
});
```

Input:

```txt
"One","Two","Three"
"Hello","World","!!"
```

Output:

```js
[
  {
    One: 'Hello',
    Two: 'World',
    Three: '!!'
  }
]
```


## Installation

`npm i readcsv --save`


## Usage

**readcsv ( [head], file, callback )**


#### Only parse the lines

Result: `array` with `array` items.

```js
readcsv ('file.csv', (err, data) => {
  if (err) { return console.log (err); }

  data.forEach ((line, i) => {
    console.log (i + ' - ' + line[0] + ' - ' + line[1]);
  });
});
```


#### Read the header from the first line

Result: `array` with `object` items.

```js
readcsv (true, 'file.csv', (err, data) => {
  if (err) { return console.log (err); }

  data.forEach (line => {
    console.log (line.Name + ' lives in ' + line.City);
  });
});
```


#### Set a custom header

Result: `array` with `object` items.

```js
const head = ['Name', 'City'];

readcsv (head, 'file.csv', (err, data) => {
  if (err) { return console.log (err); }

  data.forEach (line => {
    console.log (line.Name + ' lives in ' + line.City);
  });
});
```


License
-------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

[Franklin van de Meent](https://frankl.in)

[Buy me a coffee](https://ko-fi.com/franklin)
