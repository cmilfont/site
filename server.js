/*
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

['/home', '/consulting', '/eventos', '/universitas', '/mapa'].forEach(function(rota){
  app.get(rota, function(req, res) {
    res.render(rota.replace('/',''));
  });
});

app.get("/projetos", function(req, res){
    var url = 'https://github.com/api/v2/json/repos/show/milfont';
    res.render("projetos");
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));

app.listen(8001);
*/


var express = require('express'),
  crypto = require('crypto');

var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.cookieParser());
    app.use(express.static(__dirname));

    app.use(express.session({ secret: 'milfont' }));

    app.set('views', __dirname + '/views');
    app.register('.html', require('ejs'));
    app.set('view engine', 'html');
    app.use(express.errorHandler({ showStack: true }));
});

app.get('/', function(req, res) {
  var template = req.query['_escaped_fragment_'] || "home";
  res.render(template.replace('/',''));
});

['/home', '/consulting', '/eventos', '/universitas', '/mapa'].forEach(function(rota){
  app.get(rota, function(req, res) {
    console.log("entrou?", req.params);
    res.render(rota.replace('/',''));
  });
});

app.get("/projetos", function(req, res){
    console.log("entrou em projeto? ", req.params);
    var url = 'https://github.com/api/v2/json/repos/show/milfont';
    res.render("projetos");
});


app.listen(8001);
