/*
Name:          readcsv.js
Description:   Parse CSV file with automatic format detection
Author:        Franklin van de Meent (https://frankl.in)
Source code:   https://github.com/fvdm/nodejs-readcsv
Feedback:      https://github.com/fvdm/nodejs-readcsv/issues
License:       Unlicense / Public Domain
               (https://github.com/fvdm/nodejs-readcsv/raw/master/LICENSE)
*/

var fs = require ('fs');

module.exports = (head, file, callback) => {
  if (typeof file === 'function') {
    callback = file;
    file = head;
    head = null;
  }

  fs.readFile (file, { encoding: 'utf8' }, (err, data) => {
    var output = [];
    var sep = ',';
    var quotes = '\'';
    var linebreak;

    if (err) {
      callback (err);
      return;
    }

    linebreak = data.slice (-2) === '\r\n' ? '\r\n' : '\n';
    data = data.trim()
      .split (linebreak);

    if (data[0].match ('\',\'')) {
      sep = ',';
      quotes = '\'';
    } else if (data[0].match ('\';\'')) {
      sep = ';';
      quotes = '\'';
    } else if (data[0].match ('","')) {
      sep = ',';
      quotes = '"';
    } else if (data[0].match ('";"')) {
      sep = ';';
      quotes = '"';
    } else {
      callback (new Error ('cannot detect line format'));
      return;
    }

    data.forEach ((line, i) => {
      var tx = {};

      line = line.split (quotes + sep + quotes);
      line[0] = line[0].slice (1);
      line[line.length - 1] = line[line.length - 1].slice (0, -1);

      if (head === true && i === 0) {
        head = line;
      } else if (head) {
        head.forEach ((name, key) => {
          tx[name] = line[key];
        });

        output.push (tx);
      } else {
        output.push (line);
      }
    });

    callback (null, output);
  });
};

