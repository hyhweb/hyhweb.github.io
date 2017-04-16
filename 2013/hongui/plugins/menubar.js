(function($){
   $.fn.menubar = function(options) {
       return $.hongui.run.call(this,"menubar",options);
   };
   $.honguidefaults.menubar = {items:[{text:"menubar1",menu:{}},{text:"menubar2",menu:{},click:function(){$.hong.dialog();}}]};
    $.honguimethods.menubar = {};
    $.hongui.controls.menubar = function (element,options) {
     return   $.hongui.controls.menubar.base.constructor.call(this,element,options);
    };
    $.hongui.controls.menubar.honguiextend($.hongui.core.uicomponent,{
        __getType: function (){
            return "menubar";
        },
        __idPrev:function (){
          return "menubar";
        },
        _extendmethods:function(){
            return $.honguimethods.menubar;
        },
        _render:function (){
          var g = this, p = this.options;
            g.set(p);
            i=0;
            g.menubar = $(this.element);
            if(!g.menubar.hasClass("menubar")){g.menubar.addClass("menubar")}
            if(p.items){
               $.each(p.items,function(key,item){
                   g.additem(item);
                })
            };
        },
        additem:function(item){
            var g = this, p = this.options;
            var   ditem = $('<a class="menubar-item"><span><label class="item-text"></label></span></a>');
            ditem.attr("menubarid",i);
            $(".item-text",ditem).html(item.text);
            ditem.appendTo(g.menubar);
            ditem.hover(function(){$(this).addClass("item-over")},function(){ $(this).removeClass("item-over")}).click(function(){$(this).addClass("selected").siblings().removeClass("selected");})
            if(item.click){
                //  ditem.one("click",function(){item.click();});
            }
           /* if(item.data){
                var menu= new $.hongui.controls.menu(ditem, item.data);
                menu.id=i;
                menu.hideself();
                ditem.toggle(function(){ menu.showself(); },function(){menu.hideself();})
            }*/
            if (item.menu)
            {
                var menu =new $.hongui.controls.menu("body", item.menu);
                ditem.hover(function ()
                {
                    g.actionMenu && g.actionMenu.hideallmenus();
                    var left = $(this).offset().left;
                    var top = $(this).offset().top + $(this).height();
                    menu.show({ top: top, left: left });
                    g.actionMenu = menu;
                    $(this).addClass("menubar-over menubar-selected").siblings(".menubar-item").removeClass("menubar-selected");
                }, function ()
                {
                    $(this).removeClass("menubar-over");
                });
            }

            i++;
        }
    })
})(jQuery);