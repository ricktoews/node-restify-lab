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
 * * Get the repeating part of the period. If it's an odd length, it's not complementary.
 * * Otherwise, split it in two, and add the two parts. If the sum is all 9s, it's complementary.
 * * UPDATE: Have proof that an even length period is complementary, so it's not necessary
 *           to check the sum of the two halves. I'm sure you're dying to know how we know this.
 *           More to the point, I'm dying to tell you. You'll find an explanation below.
 * * UPDATED UPDATE: The above is correct; however, it really only applies to prime numbers. Since
 *           we'll be checking periods of composite numbers, we might as well revert to the 
 *           original test.
 *
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

/*

How do we know that an even length period is complementary, you ask? Allow me to explain...

First, I should highlight an idea or two. The process of expanding the decimal begins with attempting to divide the denominator into the numerator and continues until one reaches a remainder that's equal to the initial numerator. At this point, further processing will yield the same sequence of digits one has already calculated. I find it useful to think of the numerator as simply the initial remainder.

Remainder complement: The remainder complement of a value is the denominator minus that value.

The period length is the minimum 10^x - 1 the prime denominator divides. Since the period has an even number of digits, x is even: so let's express it as 2n.
10^2n - 1 can be factored as (10^n + 1)(10^n - 1). Since 10^2n - 1 is the minimum 10^x - 1 the denominator divides, it cannot divide 10^n - 1. Therefore, it divides 10^n + 1.

Since the denominator divides 10^n + 1, it divides 10^n - (denominator - 1). This means that, with a numerator, or initial remainder, of 1, the process will encounter a remainder of (denominator - 1), and the second half of the expansion will complement the first half.


 */
