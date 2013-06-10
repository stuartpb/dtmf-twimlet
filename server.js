var cfg = require('envigor')();

require('./app.js')(cfg).listen(cfg.port || 3000,function(){
  console.log("Listening on port " + (cfg.port || '3000'));
});