
(function($){	  
	$.fn.showsong=function(options)
	{
	
	return this.each(function(){
			var p=$.extend({},$.fn.showsong.defaults,options);
		  	var g=$(this);
			var i=0;
			g.css({width:p.width,height:p.height,lineHeight:p.lineh+"px",left:p.left,top:p.top});	
			 var rows=Math.ceil(g.height()/p.lineh);
	  function slideup(){
          i++;
		g.animate({"top":-i*p.lineh});

		if(i > rows-1){i=0;}
	//	g.append('<p>'+i+'</p>');
		}
		if(p.autoplay){
		setInterval(slideup,p.speed);
		}				  
		 })
	};
	
   $.fn.showsong.defaults={
		height:'auto',
		width:'400',
		left:'0',
		top:'0',
		lineh:'30',
		speed:'1000',
		autoplay:true
	};
})(jQuery);