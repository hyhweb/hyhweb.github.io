// JavaScript Document
(function($){

	$.fn.tab=function(options){
		var p=$.extend({},$.fn.tab.defaults,options);
		var tab=$(this);
		var tabs=tab.children();
		if(!tab.hasClass("tabs")){
			tab.addClass("tabs");
		}
		tab.ul=$("<ul></ul>");
		tab.prepend(tab.ul);
		tab.content=$('<div class="content"></div>');
		tab.content.appendTo('body');
		$('> div',tab).appendTo(tab.content);
		$('> div',tab.content).eq(0).show().siblings().hide();
		$.each(tabs,function(index,value){	
		    tab.li=$("<li></li>").css({padding:"0 10px",cursor:"pointer"});
			if($(tabs[index]).attr("title")){
				tab.li.html($(tabs[index]).attr("title"));
				tab.li.attr("id",index);
				$(tabs[index]).attr("title","");
				$(tabs[index]).attr("id",index);
				} 
			$(tab.ul).append(tab.li);
			
			tabid =tab.li.attr("id");
            tab.li.click(function(){
			$(tabs[index]).show().siblings().hide();				 
				});		 
		 });	
	};
	$.fn.tab.defaults={ 	
     };
	
})(jQuery);