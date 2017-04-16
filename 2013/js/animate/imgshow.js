/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-9
 * Time: 下午3:58
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.imgshow=function(options){
        $.fn.defaults={
            maxwidth:200,
            overflow:false,
            parenturl:"../",
            datas:[
                {url:"Design/1.png"},
                {url:"Design/2.png"},
                {url:"Design/3.png"},
                {url:"Design/4.png"},
                {url:"Design/5.png"},
                {url:"Design/6.png"},
                {url:"Design/7.png"},
                {url:"Design/8.png"},
                {url:"Design/9.png"},
                {url:"Design/10.png"},
                {url:"Design/11.png"},
		{url:"Design/12.png"},
                {url:"Design/13.png"},
                {url:"Design/14.png"},
                {url:"Design/15.png"},
				{url:"Design/16.jpg"}
            ]
        }
        var p= $.extend({},$.fn.defaults,options);
        var g=$(this);
        function  init(p){
            var windowwidth=(p.overflow)?$(window.top).width():$(window).width();
            var windowheigth=(p.overflow)?$(window.top).height():$(window).height();
            g.imgpanel=$("<div class='imgpanel'></div>").appendTo("body");
            if(p.overflow){
                g.imgshadow=$("<div style='background:#000'></div>").appendTo(window.top.document.body).hide();
                g.imgshow=$("<img>").css({border:"3px solid #ccc","z-index":"1"}).appendTo(window.top.document.body).hide();
            }else{
                g.imgshadow=$("<div style='background:#000'></div>").appendTo("body").hide();
                g.imgshow=$("<img>").css({border:"3px solid #ccc","z-index":"1"}).appendTo("body").hide();
            }

            $.each(p.datas,function(key,value){
                additem(value);
            });
            $(".imgpanel img").each(function(key,value){
                $(this).click(function(){
                    g.imgshadow.fadeIn().css({width:windowwidth,height:windowheigth,position:"fixed",top:0});

                    if(p.overflow){
                        g.imgshow.attr({src:$(this).attr("src").substring($(this).attr("src").indexOf("/")+1)}).fadeIn(300);
                    }else{
                        g.imgshow.attr({src:$(this).attr("src")}).fadeIn(300);
                    }

                    g.imgshow.css({left:(windowwidth-g.imgshow.width())/2,top:(windowheigth-g.imgshow.height())/2,position:"absolute"})
                    if(windowheigth<g.imgshow.height()){
                        g.imgshow.css({top:0});
                    };
                    if(windowwidth<g.imgshow.width()){
                        g.imgshow.css({left:0});
                    };
                })
            });
            g.imgshow.click(function(){
                $(this).fadeOut();
                g.imgshadow.fadeOut();
            })
        };
        function additem(item){
         var imgbox=$("<a></a>").appendTo(g.imgpanel);
            var img=$("<img>").css({maxWidth:p.maxwidth,padding:"10px"}).appendTo(imgbox);
                img.attr({src:p.parenturl+p.parenturl+item.url});

        }
        init(p);
    }
})(jQuery);