/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-9
 * Time: 下午3:58
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.accorder=function(options){
        $.fn.defaults={
         width:200,
         blank:false,
         target:".main",
         datas:[{title:"animate", children:[
                                                  {text:"showimg",url:"animate/showimg.html",click:""},
                                                  {text:"zoom",url:"animate/zoom.html",click:""},
                                                  {text:"slide",url:"animate/slide.html",click:""},
                                                  {text:"randomimg",url:"animate/randomimg.html",click:""},
                                                  {text:"slidesong",url:"animate/song-example.html",click:""},
                                                  {text:"menusiza",url:"animate/menusiza.html",click:""},
                                                  {text:"center",url:"animate/center.html",click:""}
                                               ]
               },
             {title:"jqueryui", children:[
                                                  {text:"tabs",url:"animate/tab.html",click:""},
                                                  {text:"accorder",url:"animate/accorder.html",click:""},
                                                  {text:"drag",url:"animate/drag.html",click:""},
                                                  {text:"table",url:"animate/table.html",click:""},
                                                  {text:"autodataform-autodatagrid",url:"architectureDesign/test.html",click:""}
                                             ]
             },
             {title:"design", children:[
                 {text:"imgshow",url:"animate/imgshow.html",click:""}
             ]
             }
           ]
        };
        var p= $.extend({}, $.fn.defaults,options);
        var g=$(this);

        function init(p){
            g.box=$("<div class='accorderbox'></div>").css({width:p.width});
            g.box.appendTo(g);
            if(p.target ){
                g.frame=$("<iframe frameborder='0' width='100%' height='100%'></iframe>").appendTo($(p.target));
            }
            if(!p.datas) return;
            $.each(p.datas,function(i,item){
                additem(item);
            });
            $(g.box).find(".accorder-header").each(function(){
               $(this).click(function(){


                  // $(this).siblings().toggle();
                 if( $(this).siblings().is(":visible")){
                     hideall();
                     $(this).siblings().hide();
                 }else{
                     hideall();
                     $(this).siblings().show();
                 }
               });
            });
        };
        function additem(item){
            g.accorder=$("<div class='accorder'></div>");
            g.header=$("<div class='accorder-header'></div>").css({background:"#eee",cursor:"pointer",padding:"10px",borderBottom:"1px solid #fff"}).appendTo(g.accorder).html(item.title);
            g.content=$("<div class='accorder-content'></div>").appendTo(g.accorder).hide();
            if(item.children){
                $.each(item.children,function(key,value){
                    var link=$("<a></a>").html(value.text).css({display:"block",cursor:"pointer",padding:"10px",lineHeight:"20px"}).appendTo(g.content);
                    if(p.blank){
                        link.attr({href:value.url});
                    }else{
                           if(!p.target) return;
                         link.click(function(){
                             g.frame.attr({src:value.url});
                        })
                    }
                });
            };
            g.accorder.appendTo(g.box);
        };
        function hideall(){
            $(g.box).find(".accorder-content").each(function(){
                if($(this).is(":visible")){
                    $(this).hide();
                }
            });
        }
        init(p);
    }
})(jQuery);