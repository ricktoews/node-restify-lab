/*
 * Handlers for REST calls
 */
var getDecimal = require('./scripts/decimals').getDecimal;
var pythag = require('./scripts/pythag');
var getPhiPowers = require('./scripts/phi').getPhiPowers;

var handlers = {};

function parseNumerator(num, denom) {
  var num1, num2;
  var re = /^(\d+)-(\d+)$/;
  var match = re.exec(num);
  if (match) {
    num1 = match[1];
	num2 = match[2];
  } else if (parseInt(num, 10) > 0){
    num1 = num;
	num2 = num;
  } else {
    num1 = 1;
	num2 = denom - 1;
  }
  return { num1, num2 };
}

handlers.getDecimal = (req, res, next) => {
  var { num, denom } = req.params;
  var { num1, num2 } = parseNumerator(num, denom);
  var rows = [];
  while (num1 <= num2) {
    rows.push(getDecimal(denom, num1++));
  }
  res.header('content-type', 'json');
  res.send(rows);
  next();
};

handlers.getPythag = (req, res, next) => {
  var corner = req.params.corner;
  var data = pythag(corner);
  res.header('content-type', 'json');
  res.send(data);
  next();
};

handlers.getPhiPowers = (req, res, next) => {
  var power = req.params.power;
  var data = getPhiPowers(power);
  res.header('content-type', 'json');
  res.send(data);
  next();
};

module.exports = handlers;
