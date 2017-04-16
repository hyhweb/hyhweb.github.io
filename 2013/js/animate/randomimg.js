// JavaScript Document
(function ($) {
$.fn.ramdanimg=function(options){
	var options=$.extend({},$.fn.ramdanimg.defaults,options);
	//alert($(window).width());
	$.fn.ramdanimg.randomnum(options);   	
};
$.fn.ramdanimg.defaults={
	cls:'imge',
	pageX:200,
	pageY:300,
	speed:'normal',
	arrow:'down'
	};

$.fn.ramdanimg.randomnum=function(options){
		var x=0;
		var y=0;
		var a=0;
		var step=1;
		var yin=true;
		var xin=true;
		var scrollfunction=function(){
			var r=$(window).width()-$("."+options.cls).width() +$(window).scrollLeft();
			var b=$(window).height()-$("."+options.cls).height() +$(window).scrollTop();
		     x=x+step*(xin?1:-1);
			 y=y+step*(yin?1:-1); 
			 if(x>=r){ xin=false};
			 if(x<=0){xin=true};
			 if(y>=b){yin=false};
			 if(y<=0){yin=true};
			$("."+options.cls).css({left:x,top:y});
            var mov=setTimeout(scrollfunction,10);
			 $("."+options.cls).hover(function(){ clearTimeout(mov);},function(){ var mov=setTimeout(scrollfunction,10);e.preventDefault();/*e.stopPropagation();*/});
			}

	    setTimeout(scrollfunction,10);
		    
		  
		
		
};	
	

})(jQuery);