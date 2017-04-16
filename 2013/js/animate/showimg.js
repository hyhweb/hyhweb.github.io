// JavaScript Document
(function($){
	$.fn.showimg=function(options){
		return this.each(function(){
			   var p=$.extend({},$.fn.showimg.defualts,options);
			   var g=$(this);
			   ul=$(">ul",g);
			   li=$(">ul li",g);
			   pic=$(">.pic",g);
			   pre=$(">.pre",g);
			   next=$(">.next",g);
			   ulwidth=$(">ul",g).width();
			   liwidth=$(">ul li",g).width();
			   leng=li.length;
			   var j=1;
				$(li).eq(1).css({"z-index":"1"}).siblings().css({"z-index":"1"});
				for(i=0; i<=leng;i++)
				{
					$(li).eq(i).css({"left":i*400,"opacity":"0.3"});
				}
				pic.css({"z-index":"2","opacity":"1"})
				$(li).eq(0).clone().appendTo(".pic");
				
				$("li",pic).css({"opacity":"1"});
		            $(pre).click(function(){	
						$(pic).html("");
						$(li).eq(j).clone().appendTo(".pic");
						$("li",pic).css({"opacity":"1"});	
						$(ul).animate({"left":-400*j});
						j++;
						if((j+2)>leng){
							
							j=0;
							}			  
					 });
                        $(next).click(function(){			
						$(pic).html("");
						$(li).eq(j).clone().appendTo(".pic");
						$("li",pic).css({"opacity":"1"});	
						$(ul).animate({"left":-400*j});
						j--;
						if(j<0){
							j=leng-2;
							}				  
					 });
		})
	};
	$.fn.showimg.defualts={
		width:'400',
		height:'300',
		autoplay:true
	}; 
})(jQuery);