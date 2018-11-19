var expect = require('chai').expect;
var divide = require('../scripts/decimals').divide;
var getDecimal = require('../scripts/decimals').getDecimal;

describe('Decimal calculator tests', function() {
  it('should return the period of 027 for 1/37, with 3 repeating digits; not 9s comp.', function() {
    var result = getDecimal(37, 1);
    expect(result.period).to.equal('027');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 3, complementary: false });
  });

  it('should return the period of 142857 for 1/7, with 6 repeating digits; 9s comp.', function() {
    var result = getDecimal(7, 1);
    expect(result.period).to.equal('142857');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6, complementary: true });
  });

  it('should return the period of 076923 for 1/13, with 6 repeating digits; 9s comp.', function() {
    var result = getDecimal(13, 1);
    expect(result.period).to.equal('076923');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6, complementary: true });
  });

  it('should return the period of 047619 for 1/21, with 6 repeating digits not 9s comp.', function() {
    var result = getDecimal(21, 1);
    expect(result.period).to.equal('047619');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 6, complementary: false });
  });

  it('should return the period of 0588235294117647 for 1/17, with 16 repeating digits; 9s comp.', function() {
    var result = getDecimal(17, 1);
    expect(result.period).to.equal('0588235294117647');
    expect(result.stats).to.eql({ nonRepeating: 0, repeating: 16, complementary: true });
  });

  it('should return the period of 125 for 1/8, with 3 non-repeating digits; not 9s comp.', function() {
    var result = getDecimal(8, 1);
    expect(result.period).to.equal('125');
    expect(result.stats).to.eql({ nonRepeating: 3, repeating: 0, complementary: false });
  });

  it('should return the period of 0625 for 1/16, with 4 non-repeating digits; not 9s comp.', function() {
    var result = getDecimal(16, 1);
    expect(result.period).to.equal('0625');
    expect(result.stats).to.eql({ nonRepeating: 4, repeating: 0, complementary: false });
  });

  it('should return the period of 083 for 1/12, with 2 non-repeating and 1 repeating digits; not 9s comp.', function() {
    var result = getDecimal(12, 1);
    expect(result.period).to.equal('083');
    expect(result.stats).to.eql({ nonRepeating: 2, repeating: 1, complementary: false });
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
