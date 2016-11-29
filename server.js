var express = require("express"),
    favicon = require("serve-favicon"),
    path = require("path");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname,"public")));

app.get('/:date', function(req, res){
  var date,
  timestamp = req.params.date,
  options   = { year: 'numeric', month: 'long', day: 'numeric' };
  
  if(new Date(timestamp).getTime()) {
    date = new Date(timestamp);
  } else if(new Date(Number(timestamp)).getTime()){
    date = new Date(Number(timestamp));
  } else {
    date = null;
  }
  
  var json =  date ? { 'unix': date.getTime(), 'natural': date.toLocaleDateString("en-US", options) } : { 'unix': null, 'natural': null } ;
  res.send('<style>body{background: #fefefe;} p{font-weight: 500; text-align: center; font-family: monospace; word-wrap: break-word; color: #625e98; font-size: 25px; margin-top: 40vh;}</style><p>' + JSON.stringify(json) + '</p>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});