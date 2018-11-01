var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var pythag = require('../scripts/pythag');
var divide = require('../scripts/decimals').divide;
var getPeriod = require('../scripts/decimals').getPeriod;

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
  });

  it('should return the period of 142857 for 1/7.', function() {
    var result = getPeriod(7, 1);
    expect(result.period).to.equal('142857');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6 });
  });

  it('should return the period of 076923 for 1/13.', function() {
    var result = getPeriod(13, 1);
    expect(result.period).to.equal('076923');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6 });
  });

  it('should return the period of 047619 for 1/21', function() {
    var result = getPeriod(21, 1);
    expect(result.period).to.equal('047619');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6 });
  });

  it('should return the period of 0588235294117647 for 1/17', function() {
    var result = getPeriod(17, 1);
    expect(result.period).to.equal('0588235294117647');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 16 });
  });

  it('should return the period of 125 for 1/8', function() {
    var result = getPeriod(8, 1);
    expect(result.period).to.equal('125');
    expect(result.stats).to.eql({ nonRepeating: 3, repeating: 0 });
  });

  it('should return the period of 0625 for 1/16', function() {
    var result = getPeriod(16, 1);
    expect(result.period).to.equal('0625');
    expect(result.stats).to.eql({ nonRepeating: 4, repeating: 0 });
  });

  it('should return the period of 083 for 1/12', function() {
    var result = getPeriod(12, 1);
    expect(result.period).to.equal('083');
    expect(result.stats).to.eql({ nonRepeating: 2, repeating: 1 });
  });

  it('should return an object with quotient 1, remainder 3 for divide(7, 1).', function() {
    var result = divide(7, 1);
    expect(result).to.eql({ quotient: 1, remainder: 3, shifts: 1 });
  });

  it('should return an object with quotient 7, remainder 9 for divide(13, 1).', function() {
    var result = divide(13, 1);
    expect(result).to.eql({ quotient: 7, remainder: 9, shifts: 2 });
  });

  it('should return an object with quotient 4, remainder 6 for divide(11, 5).', function() {
    var result = divide(11, 5);
    expect(result).to.eql({ quotient: 4, remainder: 6, shifts: 1 });
  });

});
