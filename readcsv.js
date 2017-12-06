/*
Name:          readcsv.js
Description:   Parse CSV file with automatic format detection
Author:        Franklin van de Meent (https://frankl.in)
Source code:   https://github.com/fvdm/nodejs-readcsv
Feedback:      https://github.com/fvdm/nodejs-readcsv/issues
License:       Unlicense (Public Domain)
               (https://github.com/fvdm/nodejs-readcsv/raw/master/LICENSE)
*/

const fs = require ('fs');


/**
 * Parse plain text to lines
 * and detect CSV format
 *
 * @param   {string}  data  Plain text document
 * @return  {object}        props: lines, sep, quotes
 */

function parseText (data) {
  const linebreak = data.slice (-2) === '\r\n' ? '\r\n' : '\n';

  let result = {};

  result.lines = data
    .trim()
    .split (linebreak);

  if (result.lines[0].match ('\',\'')) {
    result.sep = ',';
    result.quotes = '\'';
  } else if (result.lines[0].match ('\';\'')) {
    result.sep = ';';
    result.quotes = '\'';
  } else if (result.lines[0].match ('","')) {
    result.sep = ',';
    result.quotes = '"';
  } else if (result.lines[0].match ('";"')) {
    result.sep = ';';
    result.quotes = '"';
  } else {
    result = null;
  }

  return result;
}


/**
 * Parse each line to their fields
 *
 * @param   {object}      data
 * @param   {array}       data.lines   Lines from the text file
 * @param   {string}      data.quotes  `'` or `"`
 * @param   {string}      data.sep     `,` or `;`
 * @param   {bool|array}  head         Fields: true = use first line, array is custom
 *
 * @return  {array}                    Parsed lines
 */

function parseLines (data, head) {
  let output = [];

  data.lines.forEach ((line, i) => {
    let tx = {};

    line = line.split (data.quotes + data.sep + data.quotes);
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

  return output;
}


/**
 * Read CSV file and parse to data
 *
 * @callback  callback

 * @param     {bool|array}  [head]    Read fieldnamed from first line (true) or custom
 * @param     {string}      file      Path the CSV file
 * @param     {function}    callback  `(err, data)`

 * @return    {void}
 */

module.exports = (head, file, callback) => {
  if (typeof file === 'function') {
    callback = file;
    file = head;
    head = false;
  }

  fs.readFile (file, { encoding: 'utf8' }, (err, text) => {
    let error;
    let result;
    let data;

    if (err) {
      callback (err);
      return;
    }

    data = parseText (text);

    if (data) {
      result = parseLines (data, head);
      callback (null, result);
    } else {
      error = new Error ('cannot detect line format');
      callback (error);
    }
  });
};

