// JavaScript Document
(function ($){
    $.fn.pageInit=function(options){
                 var iframeparent = window.parent.document ;
                  var iframe = $(".dialog-content > #iframe",iframeparent);
                    iframe.height($("body > div:first").height());
    }
})(jQuery);