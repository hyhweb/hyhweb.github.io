/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-9
 * Time: 下午3:58
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.Slide=function(option){
        $.fn.defaults={
         wrapwidth:630,
         wrapheight:200,
         imgwidth:200,
         imgheight:200,
         shownum:3,
         datas:[{title:"title1",url:"img/1.jpg"},{title:"title2",url:"img/2.jpg"},{title:"title3",url:"img/3.jpg"},{title:"title1",url:"img/1.jpg"},{title:"title2",url:"img/2.jpg"},{title:"title3",url:"img/3.jpg"}]
        }
        var g = $(this),  i=1;;
        var p= $.extend({},$.fn.defaults,option);
         g.slidebox=$("<div class='box'></div>").css({position:"relative",overflow:"hidden",display:"inline-block",height:p.wrapheight,width:p.wrapwidth}).appendTo("body");
         g.slideul=$("<ul></ul>").css({position:"absolute"}).appendTo(g.slidebox);
         g.forearraw=$("<a class='fore'></a>").css({position:"absolute",left:20,top:p.imgheight/2}).appendTo(g.slidebox);
         g.nextarraw=$("<a class='next'></a>").css({position:"absolute",right:60,top:p.imgheight/2}).appendTo(g.slidebox);

        function init(p){
            $.each(p.datas,function(i,item){
                additem(item);
            });
            g.imgwidth=g.img.width();
            g.imglength= g.slideul.children().length;
            foreslide();
            nextslide();
        };
        function additem(item){
            g.slideli=$("<li class='imgitem'></li>").appendTo(g.slideul);
            g.img=$("<img>").appendTo(g.slideli);
            g.img.attr({src:item.url,alt:item.title,width:p.imgwidth,height:p.imgheight});
        };
       function  autoslide(){
       };
       function foreslide(){
           g.forearraw.click(function(){
               g.slideul.animate({left:g.imgwidth*(-1)*i});
               i++;
               if(i> g.imglength- p.shownum){
                   i=0;
               }
           })
       };
       function nextslide(){
           g.nextarraw.click(function(){
               if(i<=0){
                   i=g.imglength- p.shownum;
               }
               g.slideul.animate({left:g.imgwidth*(-1)*i});
               i--;
           })
       }
        init(p);
    }
})(jQuery);