var express = require('express');
var twilio = require('twilio');

var app = express();

app.use(express.bodyParser());
app.use('/dtmf',express.static(__dirname+'/dtmf'));

function response(req, res, next) {
  var twiml = new twilio.TwimlResponse();
  
  if (req.query.Digits) {
    var tones = req.query.Digits.toString().split('');
    for (var i = 0; i < tones.length; i++) {
      var tone = tones[i];
      if (tone == 'w') twiml.pause({length: 0.5});
      else twiml.play('/dtmf/'
        + (tone == '#' ? 'pound' : tone == '*' ? 'star' : tone)
        + '.wav');
    }
  }

  return res.type('text/xml').send(twiml.toString());
}

app.get('/',response);
app.post('/',response);

app.use(function(req,res){return res.send(404)});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + (process.env.PORT || '3000'));
});
