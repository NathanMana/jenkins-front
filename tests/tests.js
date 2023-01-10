var assert = require('assert');
const { helloWorld } = require('../public/js/randomJSFile');

describe('Random tests', function () {
  describe('Hello world', function () {
    it('should return "hello world"', function () {
        assert.equal(helloWorld(), 'Hello World');
    });

    it('should fail', function () {
        assert.equal(helloWorld(), 'Hellod');
    });
  });
});