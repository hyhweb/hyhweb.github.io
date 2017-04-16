/**
 * Created by JetBrains WebStorm.
 * User: huangyanghong
 * Date: 12-11-15
 * Time: 下午5:54
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.menu = function(options){
        return $.hongui.run.call(this,"menu",options);
    }
    $.honguidefaults.menu = {
        width:200,
        items:[{text:"menu1",children:[{text:"menu4"},{text:"menu5"}]},{text:"menu2"},{text:"menu3",children:[{text:"menu6"},{text:"menu7"}]}]
    };
    $.honguimethods.menu = {};
    $.hongui.controls.menu=function(element,options){
        return $.hongui.controls.menu.base.constructor.call(this,element,options);
    }
    $.hongui.controls.menu.honguiextend($.hongui.core.uicomponent,{
        __getType:function(){
            return "menu";
        },
        __idPrev:function(){
          return "menu";
        },
        _extendmethods:function(){
            return $.honguimethods.menu;
        },
        _render:function(){
         var g = this; p = this.options;
         g.set(p);
         g.createmenu();
            if(p.items){
                $.each(p.items,function(key,item){
                    g.additem(item);
                });
            }
            g.hideallmenu();
        },
        additem:function(item,menu){
            var g = this; p = this.options;
            if(!menu) menu = g.menubox;
            var ditem = $('<div class="menu-item"></div>').html(item.text);
            ditem.appendTo(menu);
            if(item.children){
                var   newmenu = new g.createmenu();
                g.menuitemid = newmenu.attr('menuid');
                ditem.attr('menuitemid',g.menuitemid);
                var left = ditem.offset().left + ditem.width();
                var top = ditem.offset().top;
                newmenu.css({left:left,top:top,position:"absolute"});
                $.each(item.children,function(key,item){
                    g.additem(item,newmenu);
                });
                newmenu.hover(function(){ $(this).show();},function(){ $(this).hide(); });
            };
            if(item.children){
                ditem.hover(
                function(){  g.hideallmenu(); g.ismenushow = true;var menuitemid = $(this).attr("menuitemid"); if(menuitemid){newmenu.show()}},
                function(){var menuitemid = $(this).attr("menuitemid"); g.hideallmenu(); }
                );
            };
        },
        show:function(left,top){
            var g = this; p = this.options;
            var menus = $('.menu');
            menus.css({left:left,top:top})
        },
        hideallmenu:function(){
          var g = this; p = this.options;
          var menus = $('.menu');
          menus.eq(0).siblings(".menu").hide();
         return  g.ismenushow = false;
        },
        hideallmenus:function(){
            var g = this; p = this.options;
            var menus = $('.menu');
            menus.eq(0).hide();
            menus.eq(0).siblings(".menu").hide();
            return  g.ismenushow = false;
        },
        showself:function(){
            var g = this; p = this.options;
            var menus = $('.menu');
            menus.eq(0).show();
        },
        hideself:function(){
            var g = this; p = this.options;
            var menus = $('.menu');
            menus.eq(0).hide();
        },
        hidemenu:function(menuid){
            if(!menuid) return;
            g.menubox.attr("menuid",menuid).hide();
        },
        showmenu:function(menuid){
             if(!menuid) return;
              g.menubox.attr("menuid",menuid).show();
        },
        createmenu:function(){
            var g = this; p = this.options;
            g.menubox = $('<div class="menu"></div>');
            g.menuid = (new Date()).getTime();
            g.menubox.attr("menuid",g.menuid);
            g.menubox.css({width:200});
            g.menubox.appendTo('body');
            return g.menubox;
        }
    });
})(jQuery);