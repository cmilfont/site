(function($) {
  
  $(".card")
    .hover(function(){
      $(this).addClass("opacidade");
    })
    .mouseover(function(){
      $(this).removeClass("opacidade");
    });

  var selecionarServico = function(query) {
    $(".card").removeClass("selected");
    if(query) $("a[href='"+query+"']").children().addClass("selected");
  };
  
  var verificarRenderizacaoServidor = function(fn) {
    console.log("? ", app.contextMatchesOptions({verb: 'get', path: '/projetos'}, '/projetos') );
    
    fn();
  };
    
  var app = $.sammy('#nav', function() {
    
    var sammy = this;
    //this.use('GoogleAnalytics');
    //this.use(Sammy.PushLocationProxy);
    this.use(Sammy.Mustache, "html");
    
    sammy.get("/home", function() {

        $("#nav").html("").hide();
        selecionarServico();

    });
    
    sammy.get("/projetos", function() {
      
          $("#nav").html("").show();
          var url = 'https://github.com/api/v2/json/repos/show/milfont';
          this.load(url, {dataType: "jsonp"}, function(){
    
          }).then(function(){
            this.
                renderEach('views/projetos.html', this.content.repositories).
                appendTo('#nav');
            this.then(function(){
                $('<br/><a class="more" href="http://github.com/milfont" target="_blank">+ projetos</a>').appendTo('#nav');
            })
          });
    
          selecionarServico();

    });
    
    ['/consulting', '/eventos', '/universitas', '/mapa'].forEach(function(rota){

      sammy.get(rota, function() {
        this.partial('views'+rota+'.html');
        $("#nav").show();
        selecionarServico(this.path);
      });
    });
    
  });

  $(function() { app.run(); });
})(jQuery);