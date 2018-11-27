var restify = require('restify');
var handlers = require('./handlers');

var server = restify.createServer();
server.get('/hello/:name', (req, res, next) => {
  req.data.name = req.params.name;
  res.send(req.data);
  next();
});


server.get('/decimal/:denom', handlers.getDecimal);
server.get('/decimal/:denom/:num', handlers.getDecimal);

server.get('/pythag/:corner', handlers.getPythag);

server.get('/phi/:power', handlers.getPhiPowers);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
