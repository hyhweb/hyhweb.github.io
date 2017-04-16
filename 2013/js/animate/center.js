// JavaScript Document
(function($){
	 
	$.fn.center=function(){
		 
		  return this.each(function() {    
          $this = $(this);    
		  var top=parseInt($(window).height()- $this.height())/2;
          var left=parseInt($(window).width()- $this.width())/2;
          $this.css({top:top+"px",left:left+"px"});	
		 
		  });
	};
		 
	
		  
		  
})(jQuery);