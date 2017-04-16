(function($){
   $.fn.hongtab = function(options){
      
       return $.hongui.run.call(this,"hongtab",options);
   }
  $.honguidefaults.hongtab = {};
  $.honguimethods.hongtab = {};
    $.hongui.controls.hongtab =function (element,options){
        return $.hongui.controls.hongtab.base.constructor.call(this,element,options);
    };
    $.hongui.controls.hongtab.honguiextend($.hongui.core.uicomponent,{
        __getType: function() {
            return "hongtab";
        },
        __idPrev:function () {
            return "hongtab";
        },
        _extendmethods:function (){
            return $.hongui.controls.hongtab;
        },
        _render:function () {
            var g = this, p = this.options, selectedindex = 0;
            g.set(p);
            g.tab =$(this.element);
            g.tab.ul = $('<ul class="tab-list"></ul>');
            g.content = $('<div class="tab-content"></div>').appendTo(g.tab);
            $.each($("> div", g.tab),function (i,item) {

                var title = $(item).attr("title");
                if(!title) return;
                var li = $('<li><a ><span class="text"></span></a></li>');

                $(".text",li).html(title);
                li.appendTo(g.tab.ul);
                $(item).addClass("tab-item").appendTo(g.content);
            })
            g.tab.prepend(g.tab.ul.wrap('<div class="tab-header"><div class="tab-header-inner"></div></div>').parent().parent());
            $(".tab-content").appendTo(g.tab);
            $(".tab-list li:eq("+ selectedindex +")",g.tab).addClass("selected").show().siblings(".tab-list li").removeClass("selected");
            $(".tab-item:eq("+ selectedindex +")",g.tab).addClass("selected").attr("item-selected","true").show().siblings(".tab-item").hide();
            $(".tab-list li",g.tab).each(function(i,itemli){
                $(itemli).click(function(){
                    $(this).addClass("selected").siblings().removeClass("selected");
                    selectedindex = $(this).index();
                     $(".tab-item:eq("+ selectedindex +")",g.tab).addClass("selected").attr("item-selected","true").show().siblings(".tab-item").hide();
                });

            })

        }

    });

})(jQuery);