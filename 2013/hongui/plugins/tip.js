/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-22
 * Time: 下午3:40
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.tip = function(options){
        return $.hongui.run.call(this,"tip",options);
    }
    $.honguidefaults.tip = {
        width:200,
        text:"tip-content",
        items:[".tip1",".tip2"]
    };
    $.honguimethods.tip = {};
    $.hongui.controls.tip=function(element,options){
        return $.hongui.controls.tip.base.constructor.call(this,element,options);
    }
    $.hongui.controls.tip.honguiextend($.hongui.core.uicomponent,{
        __getType:function(){
            return "tip";
        },  
        __idPrev:function(){
          return "tip";
        },
        _extendmethods:function(){
            return $.honguimethods.tip;
        },
        _render:function(){
            var g = this, p = this.options;
            g.addtip(p.items);
     //   alert(1);
        },
        addtip:function(target){
           var g = this, p = this.options;
              $.each(target,function(key,item){

                   //多维
                 var items = $(item);
                   if(items.length > 0){

                      $.each(items,function(key,item){

                          var arr = [];
                          arr.push(item);
                            g. addonetip(item);
                        //  g.addtip(arr);
                        //   debugger;

                      })
                   }



              
                 /*var  tiphtml = $('<div class="tip"><span class="tip-text tip-icon"></span></div>');
                 var tiptext = $(".tip-text",tiphtml).html(p.text);
                 tiphtml.appendTo("body");
               
                 var left = $(item).offset().left +$(item).width();
                 var top =  $(item).offset().top;
                tiphtml.css({left:left,top:top,width:p.width,position:"absolute"});*/
            })
        },
        addonetip:function(item){
             var g = this, p = this.options;
            var  tiphtml = $('<div class="tip"><span class="tip-text tip-icon"></span></div>');
            var tiptext = $(".tip-text",tiphtml).html(p.text);
            tiphtml.appendTo("body");
             var left = $(item).offset().left +$(item).width();
                 var top =  $(item).offset().top;
                tiphtml.css({left:left,top:top,width:p.width,position:"absolute"});
        }

    });
})(jQuery);