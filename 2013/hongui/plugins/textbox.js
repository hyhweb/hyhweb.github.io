(function ($) {
    $.fn.textbox=function (options) {

        $.hongui.run.call(this,"textbox",options);
 
    };
    $.honguidefaults.textbox = {
        height:"auto",
        width:"auto",
        type:"text",
        value:"",
        text:"textbox"
    };
    
    $.honguimethods.textbox = {};

    $.hongui.controls.textbox = function (element,options){
        $.hongui.controls.textbox.base.constructor.call(this,element,options) ;
    };
   
    $.hongui.controls.textbox.honguiextend($.hongui.core.uicomponent,{

       __getType: function () { return "textbox"},
        __idPrev: function(){return "textbox"},
        _extendmethods: function () {
            return $.honguimethods.textbox;
        },
        _render: function () {
            var g = this, p = this.options;
            g.input = $(g.element);
         //   g.input.wrap('<div class="input"></div>');
        }
    });

})(jQuery);