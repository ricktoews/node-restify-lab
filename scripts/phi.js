const sqrt_5 = Math.sqrt(5);
const phi = (1 + Math.sqrt(5)) / 2;

function phiPower(n) {
  var power = n === 0 ? 1 : { whole: 1, coef: 1, denom: 2 };
  var left, middle, right;
  for (let i = 1; i < n; i++) {
    var left = power.whole;
	var middle = power.whole + power.coef;
	var right = power.coef;
	var times5 = right * 5;
	var whole = left + times5;
	var coef = middle;
	power.whole = whole / 2;
	power.coef = coef / 2;
  }
  power.exponent = 1*n;
  power.real = Math.pow(phi, n);
  power.sqrt5 = power.coef * Math.sqrt(5);

  return power;
}

function getPhiPower(n) {
  var power = [];
  power.push(phiPower(n));
  return power;
}

function getPhiPowers(n) {
  var powers = [];
  for (let i = 1; i <= 12; i++) {
    powers.push(phiPower(i));
  }
  return powers;
}

module.exports = { getPhiPowers, getPhiPower };
