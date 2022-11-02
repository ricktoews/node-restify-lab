var corsMiddleware = require('restify-cors-middleware');
var restify = require('restify');
var handlers = require('./handlers');

const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});

var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.get('/hello/:name', (req, res, next) => {
  req.data.name = req.params.name;
  res.send(req.data);
  next();
});


server.get('/dc/:denom', handlers.getDc);

server.get('/pythag/:corner', handlers.getPythag);

server.get('/phi/:power', handlers.getPhiPower);
server.get('/phiseries/:power', handlers.getPhiPowers);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
