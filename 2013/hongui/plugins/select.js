(function($){
    $.fn.select = function (options){
        $.hongui.run.call(this,"select",options);
    };
    $.honguidefaults.select = {
        width:'auto',
        height:'auto'
    };
    $.honguimethods.select ={};
    $.hongui.controls.select = function(element,options){
        $.hongui.controls.select.base.constructor.call(this,element,options);
    };
    $.hongui.controls.select.honguiextend($.hongui.core.uicomponent,{
       __getType: function(){
           return "select";
       },
        __idPrev: function() {
            return "select";
        },
        _extendmethods: function() {
            return $.honguimethods.select;
        },
        _render:function() {
            var g = this, p = this.options;
            g.input = $(g.element);
            $(g.input).siblings("option").appendTo(g.input);


        }
    })
    
})(jQuery);