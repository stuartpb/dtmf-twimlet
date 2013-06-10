var express = require('express');
var twilio = require('twilio');
var redis = require('redis');

function playTones(twiml,tones){
  
  //allow array, string, and number input
  if(!Array.isArray(tones)){
    tones = tones.toString().split('');
  }
  
  for(var i = 0; i < tones.length; i++){
    var tone = tones[i];
    twiml.play('/dtmf/'
      + (tone == '#' ? 'pound' : tone == '*' ? 'star' : tone)
      + '.wav');
  }

  return twiml;
}

function playToneResponse(res,tones){
  res.type('text/xml').send(
    playTones(new twilio.TwimlResponse(), tones)
      .toString());
}

module.exports = function(cfg){
  var db = redis.createClient(cfg.redis.port, cfg.redis.hostname,
    {no_ready_check: true});
  db.auth(cfg.redis.password);
  var app = express();

  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use('/dtmf',express.static(__dirname+'/dtmf'));

  app.get('/',function(req,res){
    res.render('index.jade');
  });
  app.post('/',function(req,res,next){
    db.setex(req.body.number,req.body.sequence,300, function(err,status) {
      if (err) return next(err);
      if (status != 'OK') console.error('Redis returned status ' + status);
      res.redirect('/monitor?number=' + req.body.number);
    });
  });
  app.get('/monitor',function(req,res,next){
    db.multi()
      .get(req.query.number)
      .ttl(req.query.number)
      .exec(function(errs,resp) {
        if(errs) return next(errs);
        res.render('monitor.jade',{
          number: req.query.number,
          sequence: resp[0],
          seconds: resp[1]},
        function(err,text){
          if(!resp[0]) res.status(404);
          res.send(text);
        });
      });
  });
  app.post('/incoming',function(req,res,next){
    db.get(req.body.Called,function(err,sequence){
      if (err) return next(err);
      if (sequence) {
        playToneResponse(res, sequence);
      } else {
        res.send(404);
      }
    });
  });

  app.use(function(req,res){return res.send(404)});

  return app;
};