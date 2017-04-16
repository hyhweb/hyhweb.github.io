(function ($) {
    $.fn.button=function (options) {

        $.hongui.run.call(this,"button",options);
 
    };
    $.honguidefaults.button = {
        height:"auto",
        width:"auto",
        items:[{text:"button",click:function () { alert("aa")}},{text:"button",click:function () { alert("bb")}}]
    };
    
    $.honguimethods.button = {};

    $.hongui.controls.button = function (element,options){
        $.hongui.controls.button.base.constructor.call(this,element,options) ;
    };
   
    $.hongui.controls.button.honguiextend($.hongui.core.uicomponent,{

       __getType: function () { return "button"},
        __idPrev: function(){return "button"},
        _extendmethods: function () {
            return $.honguimethods.button;
        },
        _render: function () {
            var g = this, p = this.options;
            
            for(var i= 0 ;i < p.items.length; i++){
               
               this.add(p.items[i]);
            };
     
        },
        add: function (item){
            var g = this, p = this.options;
            var button = $('<a class="button"><span><label></label></span></a>');
             $("label",button).html(item.text);
             $(this.element).append(button);
            button.click(item.click);
        }
    });

})(jQuery);