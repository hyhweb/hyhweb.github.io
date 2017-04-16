(function($){
    $.fn.btn = function (options){
        $.hongui.run.call(this,"btn",options);
    };
    $.honguidefaults.btn = {
        width:'auto',
        height:'auto'
    };
    $.honguimethods.btn ={};
    $.hongui.controls.btn = function(element,options){
        $.hongui.controls.btn.base.constructor.call(this,element,options);
    };
    $.hongui.controls.btn.honguiextend($.hongui.core.uicomponent,{
       __getType: function(){
           return "btn";
       },
        __idPrev: function() {
            return "btn";
        },
        _extendmethods: function() {
            return $.honguimethods.btn;
        },
        _render:function() {
            var g = this, p = this.options,lablel,button;
            g.input = $(g.element);
            lablel =$(g.input).siblings("label");
            lablel.remove();
            button = $('<a class="button" style="margin-left: 10px"><span><label></label></span></a>');
            $("label",button).html($(g.input).attr("value"));
            button.attr("click",$(g.input).attr("click"));
            button.appendTo($(g.input).parent());
            $(g.input).hide();

        }
    })
    
})(jQuery);