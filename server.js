var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname,"public")));

app.get('/:date', function(req, res){
  console.log(req.params.date);
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var date = isNaN(req.params.date) ? new Date((req.params.date)): new Date(Number(req.params.date));
  var json = date.getTime() ? { 'unix': date.getTime(), 'natural': date.toLocaleDateString("en-US", options) } : { 'unix': null, 'natural': null } ;
  res.send('<style>body{background: #fefefe;} p{font-weight: 700; text-align: center; font-family: monospace; word-wrap: break-word; color: #625e98; font-size: 25px; margin-top: 40vh;}</style><p>' + JSON.stringify(json) + '</p>');
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});