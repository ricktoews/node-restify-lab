var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var pythag = require('../scripts/pythag');

chai.should();

describe('Math stuff', function() {
  it('should return the first few Pythagorean triples with a corner of 1.', function() {
    var triple = pythag(1);
    var [ first, second, third, ...discard ] = triple;

    expect(first).to.have.members([3, 4, 5]);
    expect(second).to.have.members([5, 12, 13]);
    expect(third).to.have.members([7, 24, 25]);
  });

  it('should return the first few Pythagorean triples with a corner of 2.', function() {
    var triple = pythag(2);
    var [ first, second, third, ...discard ] = triple;

    expect(first).to.have.members([3, 4, 5]);
    expect(second).to.have.members([8, 15, 17]);
    expect(third).to.have.members([12, 35, 37]);
  })
});
