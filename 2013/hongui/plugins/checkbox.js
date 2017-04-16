(function($){
    $.fn.checkbox = function (options){
        $.hongui.run.call(this,"checkbox",options);
    };
    $.honguidefaults.checkbox = {
        width:'auto',
        height:'auto'
    };
    $.honguimethods.checkbox ={};
    $.hongui.controls.checkbox = function(element,options){
        $.hongui.controls.checkbox.base.constructor.call(this,element,options);
    };
    $.hongui.controls.checkbox.honguiextend($.hongui.core.uicomponent,{
       __getType: function(){
           return "checkbox";
       },
        __idPrev: function() {
            return "checkbox";
        },
        _extendmethods: function() {
            return $.honguimethods.checkbox;
        },
        _render:function() {
            var g = this, p = this.options,value,lablel;
            g.input = $(g.element);
            lablel =$(g.input).siblings("label");
            value= lablel.html();
            $("<span></span>").html(value).appendTo(g.input.parent());
            lablel.remove();
            g.wrapper = g.input.parent();
            g.wrapper.prepend(g.input);

        }
    })
    
})(jQuery);