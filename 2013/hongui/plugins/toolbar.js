(function($){
    $.fn.toolbar = function(options) {
        return $.hongui.run.call(this,"toolbar",options);
        
    }
    $.honguidefaults.toolbar = {
       items:[{text:"huang",line:true,icon:"toolbar-icon1",disabled:true,click:null}]
    };
    $.honguimethods.toolbar = {};
    $.hongui.controls.toolbar = function(element,options) {
        return $.hongui.controls.toolbar.base.constructor.call(this,element,options);
    };
    $.hongui.controls.toolbar.honguiextend($.hongui.core.uicomponent,{
        __getType:function() {
            return "toolbar";
        },
        __idPrev:function() {
            return "toolbar";
        },
        _extendmethods:function() {
            return $.honguimethods.toolbar;
        },
        _render:function() {
          
           var g = this, p = this.options;
           g.toolbar = $(this.element);
           g.toolbar.addClass("toolbar");
		   g.toolbar.body=$('<div class="toolbar-body"><div class="toolbar-inner"></div></div>');
		   g.toolbar.inner=$(".toolbar-inner",g.toolbar.body);
           g.toolbar.body.appendTo(g.toolbar);
           g.set(p);
        },
        _setItems:function(items) {
             var g = this;
            $.each(items,function(i,item) {
                g.addTtem(item);
               // debugger;
            });
            
        },
        addTtem:function(item) {
          
            var g = this, p = this.options;
            if(item.line){
                g.toolbar.inner.append('<div class="toolbar-separator"></div>');
               
            }
            var ditem = $('<a class="toolbar-item"><span class="toolbar-icon"><label class="toolbar-text"></label></span></a>');
            g.toolbar.inner.append(ditem);
            if(item.icon){
                $(".toolbar-icon",ditem).addClass(item.icon);
            };
            if(item.disabled){
                ditem.addClass("disabled");
            }
            $(".toolbar-text",ditem).html(item.text);

            ditem.click(function(){ item.click(item)});
            ditem.hover(function() {
                $(this).addClass("over");
            },function() {
                $(this).removeClass("over");
            })

        }
    })

})(jQuery);