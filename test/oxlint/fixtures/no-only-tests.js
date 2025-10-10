// This file should trigger the no-only-tests rule
describe.only('test suite', function() {
  it('test case', function() {
    // test code
  });
});

it.only('another test', function() {
  // test code
});
