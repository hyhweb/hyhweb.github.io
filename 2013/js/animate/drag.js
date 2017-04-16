(function($){
$.fn.drag=function(){ 

     var g={
	
		start:function(e)
		{
			g.current={
			   target:g.target,
			   left:g.target.offset().left,
			   top:g.target.offset().top,
			   startX:e.pageX || e.screenX,
			   startY:e.pageY || e.screenY
			};
			$(document).bind("mouseup",g.stop);
			$(document).bind("mousemove",g.drag);
			
		},
		drag:function(e)
		{
			
			if(!g.current) return;
			var pageX=e.pageX || e.screenX;
			var pageY=e.pageY || e.clientY;
			g.current.difX=pageX-g.current.startX;
			g.current.difY=pageY-g.current.startY;
			g.apply();
			
			
		},
		stop:function(e){
			$(document).unbind("mouseup",g.stop);
			$(document).unbind("mousemove",g.drag);
			g.current=null;
			},
		apply:function(){ 
		
		if(g.current.difX)
		{g.target.css({left:g.current.left+g.current.difX})};
		if(g.current.difY)
		{g.target.css({top:g.current.top+g.current.difY})};
		
		} 
		
		
	};
	g.target=$(this) ;
	g.target.hover(function(){$("body").css("cursor","move");},function(){$("body").css("cursor","default");}).mousedown(function(e){g.start(e); return false;})

	
};


	
	
})(jQuery);