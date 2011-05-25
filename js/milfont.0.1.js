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
    
  var app = $.sammy('#nav', function() {
    
    var sammy = this;
    //this.use('GoogleAnalytics');
    
    sammy.get("#!/home", function() {
      $("#nav").html("").hide();
      selecionarServico();
    });
    
    ['consulting', 'eventos', 'universitas', 'mapa', 'projetos'].forEach(function(rota){
      sammy.get("#!/"+rota, function() {
        this.partial('views/'+rota+'.html');
        $("#nav").show();
        selecionarServico(this.path);
      });
    });
    
  });

  $(function() { app.run('#!/home'); });
})(jQuery);