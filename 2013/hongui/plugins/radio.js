(function($){
    $.fn.radio = function (options){
        $.hongui.run.call(this,"radio",options);
    };
    $.honguidefaults.radio = {
        width:'auto',
        height:'auto'
    };
    $.honguimethods.radio ={};
    $.hongui.controls.radio = function(element,options){
        $.hongui.controls.radio.base.constructor.call(this,element,options);
    };
    $.hongui.controls.radio.honguiextend($.hongui.core.uicomponent,{
       __getType: function(){
           return "radio";
       },
        __idPrev: function() {
            return "radio";
        },
        _extendmethods: function() {
            return $.honguimethods.radio;
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