var dotest = require ('dotest');
var app = require ('./');


dotest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .done ();
});


dotest.run ();
