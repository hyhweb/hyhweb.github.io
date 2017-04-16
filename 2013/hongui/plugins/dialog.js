(function ($) {
    $.fn.dialog = function (options) {
      return  $.hongui.run.call(this,"dialog",options);
    };
    $.honguidefaults.dialog = {
        width:800,
        height:400,
        title:"dialog",
        content:null,
        button:{items:[{text:"确定",click:function () { alert("确定")}},{text:"取消",click:function () { alert("取消")}}]},
        url:"form.html"
    };
    $.honguimethods.dialog = {}

    $.hongui.controls.dialog = function (element,options) {
       return $.hongui.controls.dialog.base.constructor.call(this,element,options);
    }
    $.hongui.controls.dialog.honguiextend($.hongui.core.uicomponent,{
        __getType:function(){
            return "dialog";
        },
        __idPrev:function() {
            return "dialog";
        },
        _extendmethods:function (){
          return  $.hongui.controls.dialog;
        },
        _render:function(){
            var g = this, p = this.options;
             g.set(p);
            var dialog = $('<div class="dialog"><div class="dialog-header"><div class="dialog-header-body"><div class="dialog-header-inner"></div></div></div><div class="dialog-body"><div class="dialog-content"></div></div><div class="dialog-footer"><div class="dialog-footer-body"></div></div></div>');
            dialog.css({width:p.width,height:p.height}).appendTo("body");
           $('<div class="masker"></div>').appendTo("body");

            var header = $('.dialog-header-inner',dialog);
            if(p.title){header.html(p.title);}
            var content = $('.dialog-content',dialog);
            if(p.content){
                content.html(p.content);
            }
            var footer = $('.dialog-footer-body',dialog);
            var btn = new $.hongui.controls.button(footer, p.button);
            if(p.url && (p.content == null)){
                var iframe = $('<iframe width="100%" height="100%" frameborder="0" scrolling="no" name="iframe" id="iframe"></iframe>');
                iframe.attr("src",p.url);
                var d = window.top.frames.window.document,
                     h=$(".wrapper",d).height();
                 iframe.appendTo(content);
            }

                var left,top;
                left=($(window).width()-dialog.width())/2;
                top=($(window).height()-dialog.height())/8;
                dialog.css({left:left,top:top,position:"absolute"})

        }

    })

})(jQuery);