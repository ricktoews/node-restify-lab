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


/*
 * Determine whether the period is complementary or not. How, you ask?
 * * Get the repeating part of the period. If it's an odd length, it's no complementary.
 * * Otherwise, split it in two, and add the two parts. If the sum is all 9s, it's complementary.
 */
function isComplementary(period, nonRepeting, repeating) {
  var result = false;
  var r = period.substr(period.length - repeating);
  if (r.length % 2 === 0) {
    let partA = 1*r.substr(0, r.length / 2);
	let partB = 1*r.substr(r.length / 2);
    let sum = partA + partB;
	// The idea is to test the sum to see if it's all 9s.
	result = sum.toString().replace(/9/g, '').length === 0;
  }
  return result;
}

/*
 * Determine repeating and non-repeating numbers of digits.
 * First, get non-repeating by dividing out all factors of base.
 * Then, determine repeating, by subtracting non-repeating from period length.
 */
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
  var complementary = isComplementary(period, nonRepeating, repeating);
  var stats = { nonRepeating, repeating, complementary };
  return stats;
}


/*
 * Returns a string containing the digits in the period for the numerator and denominator.
 */
function getPeriod(denom, num) {
  var max = 1000;
  var remainders = []; // to keep track of remainders, to detect a repeat.
  var digits = []; // for collection the digits in the period.
  var startNum = num;
  var done = false;

  while (!done) {
    remainders.push(num);
    var { quotient: digit, remainder: num, shifts } = divide(denom, num);
    for (; shifts > 1; shifts--) digits.push(0); // insert 0s as needed.
    digits.push(digit);
	if (remainders.indexOf(num) !== -1 ||
	    num === 0 ||
		digits.length > max) {
	  done = true;
	}
  }

  return digits.join('');
}


function getDecimal(denom, num) {
  var period = getPeriod(denom, num);
  var stats = getStats(denom, num, period);
  var result = {
    period, stats
  };
  return result;
}


module.exports = { divide, getPeriod, getStats, getDecimal };
