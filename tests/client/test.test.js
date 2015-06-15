require('../client_setup');

suite('testoo', function() {
  var tests;
  setup(function(done) {
    testRequire(['js/test'], {}, function(Test) {
      tests = Test;
      done();
    });
  });

  suite('test', function() {
    test('test', function() {
      assert.equal(tests(), 2);
    });
  });
});
