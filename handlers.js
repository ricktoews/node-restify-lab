/*
 * Handlers for REST calls
 */
var dc = require('./scripts/dc');
var getDecimal = require('./scripts/decimals').getDecimal;
var pythag = require('./scripts/pythag');
var { getPhiPower, getPhiPowers } = require('./scripts/phi');

var handlers = {};

handlers.getDc = (req, res, next) => {
  res.send(dc(req.params.denom));
  next();
};

handlers.getPythag = (req, res, next) => {
  var corner = req.params.corner;
  var data = pythag(corner);
  res.header('content-type', 'json');
  res.send(data);
  next();
};

handlers.getPhiPower = (req, res, next) => {
  var power = req.params.power;
  var data = getPhiPower(power);
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
