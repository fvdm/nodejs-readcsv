var dotest = require ('dotest');
var app = require ('./');

function testFile (file, test) {
  app (file, (err, data) => {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isExactly ('fail', 'data[0].One', data && data[0] && data[0].One, 'Hello')
      .isExactly ('fail', 'data[0].One', data && data[0] && data[0].Two, 'World')
      .isExactly ('fail', 'data[0].One', data && data[0] && data[0].Three, '!!')
      .done();
  });
}

dotest.add ('Module', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .done ();
});

dotest.add ('Comma-quoted', test => {
  testFile ('./test/test.comma-quoted.csv', test);
});

dotest.add ('Semi-quoted', test => {
  testFile ('./test/test.semi-quoted.csv', test);
});

dotest.run ();
