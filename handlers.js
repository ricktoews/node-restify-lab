/*
 * Handlers for REST calls
 */
var getDecimal = require('./scripts/decimals').getDecimal;

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

module.exports = handlers;
