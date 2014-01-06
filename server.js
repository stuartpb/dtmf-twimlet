var express = require('express');
var twilio = require('twilio');

var app = express();

app.use(express.bodyParser());

function response(req, res, next) {
  var twiml = new twilio.TwimlResponse();
  
  if (req.query.Digits) {
    twiml.play({digits: req.query.Digits});
  }

  return res.type('text/xml').send(twiml.toString());
}

app.get('/',response);
app.post('/',response);

app.use(function(req,res){return res.send(404)});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + (process.env.PORT || '3000'));
});
