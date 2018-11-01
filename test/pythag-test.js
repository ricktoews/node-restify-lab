var expect = require('chai').expect;
var pythag = require('../scripts/pythag');

describe('Pythagorean triples tests', function() {
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
  });

  it('should return the first few Pythagorean triples with a corner of 9.', function() {
    var triple = pythag(9);
    var [ first, second, third, fourth, ...discard ] = triple;

    expect(first).to.have.members([8, 15, 17]);
    expect(second).to.have.members([20, 21, 29]);
    expect(third).to.have.members([33, 56, 65]);
  });

});
