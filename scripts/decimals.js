const periods = ['142857', '285714', '428571', '571428', '714285', '857142'];

const BASE = 10;
var baseFactors = [2, 5];
/*
 * Perform a single step in the long division process, and return an object as the result:
 * { quotient, remainder, shifts }
 * Quotient and remainder are self-explanatory. Shifts is the number of times the numerator
 * must be adjusted (multipled by BASE) before it's greater than or equal to the denominator.
 */
function divide(denom, num) {
  var shifts = 0;
  while (denom > num) {
    shifts++;
    num *= BASE;
  }
  var quotient = Math.floor(num / denom);
  var remainder = num % denom;
  return { shifts, quotient, remainder };
}


function getStats(denom, num, period) {
  var count = [];
  baseFactors.forEach((f, ndx) => {
    count[ndx] = 0;
    while (denom % f === 0) {
      denom /= f;
      if (num % f !== 0) count[ndx]++;
      else num /= f;
    }
  });
  var nonRepeating = Math.max(...count);
  var repeating = period.length - nonRepeating;
  var stats = { nonRepeating, repeating };
  return stats;
}


/*
 * Returns a string containing the digits in the period for the numerator and denominator.
 */
function getPeriod(denom, num) {
  var max = 1000;
  var digits = []; // for collection the digits in the period.
  var lastRemainder = -1;
  var startNum = num;
  var done = false;

  while (!done) {
    var { quotient: digit, remainder: num, shifts } = divide(denom, num);
    for (; shifts > 1; shifts--) digits.push(0); // 
    digits.push(digit);
    done = num === startNum || num === 0 || num === lastRemainder || digits.length > max;
    lastRemainder = num;
  }

  var period = digits.join('');
  var stats = getStats(denom, startNum, period);
  var result = {
    period, stats
  };
  return result;
}


module.exports = { divide, getStats, getPeriod };
