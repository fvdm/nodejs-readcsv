const dotest = require ('dotest');
const app = require ('./');

const customHead = ['Test', 'Times', 'Ahead'];


function testFileNohead (file, test) {
  app (file, (err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isArray ('fail', 'data[0]', data && data[0])
      .isExactly ('fail', 'data[0][0]', data && data[0] && data[0][0], 'One')
      .isExactly ('fail', 'data[0][1]', data && data[0] && data[0][1], 'Two')
      .isExactly ('fail', 'data[0][2]', data && data[0] && data[0][2], 'Three')
      .isArray ('fail', 'data[1]', data && data[1])
      .isExactly ('fail', 'data[1][0]', data && data[1] && data[1][0], 'Hello')
      .isExactly ('fail', 'data[1][1]', data && data[1] && data[1][1], 'World')
      .isExactly ('fail', 'data[1][2]', data && data[1] && data[1][2], '!!')
      .done();
  });
}

function testFileAuto (head, file, test) {
  app (head, file, (err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isExactly ('fail', 'data[0].One', data && data[0] && data[0].One, 'Hello')
      .isExactly ('fail', 'data[0].Two', data && data[0] && data[0].Two, 'World')
      .isExactly ('fail', 'data[0].Three', data && data[0] && data[0].Three, '!!')
      .done();
  });
}

function testFileCustom (head, file, test) {
  app (head, file, (err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isExactly ('fail', 'data[0].Test', data && data[0] && data[0].Test, 'One')
      .isExactly ('fail', 'data[0].Times', data && data[0] && data[0].Times, 'Two')
      .isExactly ('fail', 'data[0].Ahead', data && data[0] && data[0].Ahead, 'Three')
      .isObject ('fail', 'data[1]', data && data[1])
      .isExactly ('fail', 'data[1].Test', data && data[1] && data[1].Test, 'Hello')
      .isExactly ('fail', 'data[1].Times', data && data[1] && data[1].Times, 'World')
      .isExactly ('fail', 'data[1].Ahead', data && data[1] && data[1].Ahead, '!!')
      .done();
  });
}


dotest.add ('Module', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .done ();
});


dotest.add ('Comma-quoted - without head - dos linebreaks', test => {
  testFileNohead ('./test/test.comma-quoted-dos.csv', test);
});


dotest.add ('Comma-quoted - without head', test => {
  testFileNohead ('./test/test.comma-quoted.csv', test);
});

dotest.add ('Comma-quoted - auto head', test => {
  testFileAuto (true, './test/test.comma-quoted.csv', test);
});

dotest.add ('Comma-quoted - custom head', test => {
  testFileCustom (customHead, './test/test.comma-quoted.csv', test);
});


dotest.add ('Comma-single-quoted - without head', test => {
  testFileNohead ('./test/test.comma-single-quoted.csv', test);
});

dotest.add ('Comma-single-quoted - auto head', test => {
  testFileAuto (true, './test/test.comma-single-quoted.csv', test);
});

dotest.add ('Comma-single-quoted - custom head', test => {
  testFileCustom (customHead, './test/test.comma-single-quoted.csv', test);
});


dotest.add ('Semi-quoted - without head', test => {
  testFileNohead ('./test/test.semi-quoted.csv', test);
});

dotest.add ('Semi-quoted - auto head', test => {
  testFileAuto (true, './test/test.semi-quoted.csv', test);
});

dotest.add ('Semi-quoted - custom head', test => {
  testFileCustom (customHead, './test/test.semi-quoted.csv', test);
});


dotest.add ('Semi-single-quoted - without head', test => {
  testFileNohead ('./test/test.semi-single-quoted.csv', test);
});

dotest.add ('Semi-single-quoted - auto head', test => {
  testFileAuto (true, './test/test.semi-single-quoted.csv', test);
});

dotest.add ('Semi-single-quoted - custom head', test => {
  testFileCustom (customHead, './test/test.semi-single-quoted.csv', test);
});


dotest.add ('Error - invalid file', test => {
  app ('./invalid.file', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isUndefined ('fail', 'data', data)
      .done();
  });
});

dotest.add ('Error - cannot detect line format', test => {
  app ('./test/test.invalid-line-format.csv', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'cannot detect line format')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


dotest.run ();
