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
         blank:false,
         target:".main",
         datas:[
             {title:"web", children:[
                 {text:"page",url:"demo/defualt.html",click:""}
             ]
             },

             {title:"jquery ui", children:[

                                                    {text:"dataform",url:"demo/form.html",click:""},
                                                    {text:"datagrid",url:"demo/grid.html",click:""},
                                                    {text:"dialog",url:"demo/dialog.html",click:""},
                                                    {text:"accordion",url:"demo/accordion.html",click:""},
                                                    {text:"toolbar",url:"demo/toolbar.html",click:""},
                                                    {text:"tree",url:"demo/tree.html",click:""},
                                                    {text:"tabs",url:"demo/tabs.html",click:""},
                                                    {text:"button",url:"demo/button.html",click:""},
                                                    {text:"tip",url:"demo/tip.html",click:""},
                                                    {text:"drag",url:"../js/animate/drag.html",click:""}
                                             ]
             },

             {title:"design", children:[
                 {text:"imgshow",url:"../js/animate/imgshow.html",click:""}
             ]
             }, {title:"animate", children:[
                 {text:"showimg",url:"../js/animate/showimg.html",click:""},
                 {text:"zoom",url:"../js/animate/zoom.html",click:""},
                 {text:"slide",url:"../js/animate/slide.html",click:""},
                 {text:"randomimg",url:"../js/animate/randomimg.html",click:""},
                 {text:"slidesong",url:"../js/animate/song-example.html",click:""},
                 {text:"menusiza",url:"../js/animate/menusiza.html",click:""}
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
                g.frame=$("<iframe frameborder='0' width='100%' height='100%' src='demo/defualt.html'></iframe>").appendTo($(p.target));
            }
            if(!p.datas) return;
            $.each(p.datas,function(i,item){
                additem(item);
            });
            $(g.box).find(".accorder-header").each(function(){
               $(this).click(function(){
                 $(this).css({"fontWeight":"bolder"}).parent().siblings().find(".accorder-header").css({"fontWeight":"normal"});
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
            g.header=$("<div class='accorder-header'></div>").css({background:"#c7bca1",cursor:"pointer",padding:"10px",borderBottom:"1px solid #ccc7be"}).appendTo(g.accorder).html(item.title);
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