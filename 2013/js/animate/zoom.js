/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-9
 * Time: 下午3:58
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.zoom=function(options){
        $.fn.defaults={
          smallwidth:200,
          smallheight:200,
          maxwidth:1000,
          maxheight:1000,
          width:400,
          height:400,
          url:"img/large.jpg"
        };
           var p= $.extend({},$.fn.defaults,options );
           var g=this;
           function init(p){
           g.imgbox1=$("<a class='small'></a>").appendTo('body');
           g.imgbox2=$("<div class='zoom'></div>").css({width:p.width, height:p.height,position:"relative"}).appendTo('body');
           g.img1 = $("<img >").appendTo(g.imgbox1);
           g.img2 =  $("<img >").appendTo(g.imgbox2);
           g.img1.css({width:p.smallwidth,height:p.smallheight,cursor:"crosshair"}).attr("src", p.url);
           g.img2.css({width:p.maxwidth,height:p.maxheight,position:"absolute",left:0,top:0}).attr("src", p.url);
           g.w1=g.img1.width();
           g.h1=g.img1.height();
           g.w2=g.img2.width()-p.width;
           g.h2=g.img2.height()-p.height;
           g.rw= g.w2/g.w1;
           g.rh=g.h2/g.h1;
           g.imgbox2.hide();
           g.img1.hover(function(e){start(e)},function(){del()}).mousemove( function(e){ move(e)});
           };
           function start(e){
           g.imgbox2.show().css({position:"absolute",left:g.img1.offset().left+ g.w1+10,top:g.img1.offset().top});
           };
           function move(e){
            var offset=g.img1.offset();
            var difw= (e.clientX|| e.screenX -offset.left)* g.rw;
            var difh = (e.clientY || e.screenY - offset.top)* g.rh;
            difw =(difw > g.w2)? g.w2:difw;
            difh =(difh > g.h2)? g.h2:difh;
            g.img2.css({left:difw*(-1),top:difh*(-1)});
           };
            function del(){
             g.imgbox2.hide();
            };
           init(p);
    };
})(jQuery);