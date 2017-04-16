(function(){
    $.fn.Tree= function(object,options){
      var newtree;
        newtree = new $.fn.CreateObjectHtml.CreateTree(options);
        $(object).append(newtree);
        $(window).scrollTop

    }
})(jQuery);