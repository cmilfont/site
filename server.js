var express = require('express'),
  crypto = require('crypto');

var app = express.createServer();


app.set('views', __dirname + '/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');


app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session({ secret: 'milfont' }));

app.get('/', function(req, res) {
  var template = req.query['_escaped_fragment_'] || "home";
  res.render(template.replace('/',''));
});


app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));

app.listen(8000);
