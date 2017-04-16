(function ($) {
    $.fn.imgsort=function(options){
        var g={};p= $.extend({},options);
        g.additem=function(item){
            g.ditem=$("<div class='img-item' record='0'><img><span></span></div>"),
            g.title=$("span", g.ditem);
            g.img=$("img", g.ditem);
            g.img.attr({"src":item.src});
            g.title.html(item.title);
            g.ditem.appendTo(g.imgwrap);
        };
        g.record=function(){
            $("img",g.imgwrap).each(function(){
                $(this).click(function(){
                    g.imgbox= $(this).parent();
                    g.num=g.imgbox.attr("record");
                    g.num++;
                    g.imgbox.attr("record",g.num);
                    var n=g.imgbox.attr("record");
                    $.each(g.imgbox.siblings(),function(i,item){
                         var m=$(item).attr("record");
                        if(n>=m){
                            g.imgbox.insertAfter($(item));
							$(".img-item").get().reverse();
                        }
						
                    });
					
					
					
					
               });
				

            });
        };
        g.rerend=function(){
            var items=$(".img-item");
            //items.sort();
            $.each(items,function(i,item){
             var n=  parseInt( $(this).attr("record"));
                $(this).siblings();
            });
        };

        this.each(function(){
            g.imgwrap=$("<div class='imgwrap'></div>");
            g.imgwrap.appendTo($(this));
            g.num=0;
            if(p.data){
                $.each(p.data,function(i,item){
                    g.additem(item);
                });
            };
            g.record();
        });
    };
})(jQuery);