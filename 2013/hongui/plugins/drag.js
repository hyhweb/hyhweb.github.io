/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-26
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
(function($){
$.fn.drag = function(options){
    return $.hongui.run.call(this,"drag",options);
};
$.honguidefaults.drag = {};
$.honguimethods.drag = {};
$.hongui.controls.drag = function(element,options){
    return $.hongui.controls.drag.base.constructor.call(this,element,options);
}
$.hongui.controls.drag.honguiextend($.hongui.core.uicomponent,{
    __getType:function(){
        return "drag";
    },
    __idPrev:function(){
        return "drag";
    },
    _extendmethods:function(){
      return $.hongui.controls.drag;
    },
    _render:function(){
        var g = this, p = this.options;
        g.set(p);
        g.target = $(this.element);
       g.target.css({position:"absolute"});
        g.target.bind("mousedown",function(e){
          g.start(e);
        }).bind("mousemove",function(e){
             g.target.css({cursor:"move" });
         })
    },
    start:function(e){
       var g = this, p = this.options;
        g.current = {
            target:g.target,
            left:g.target.offset().left,
            top:g.target.offset().top,
            startX:e.pageX || e.screenX,
            startY:e.pageY || e.screenY
        };
        $(document).bind("selectstart",function(){ return false});
        $(document).bind("mousemove",function(e){
           g.drag(e);
        })
        $(document).bind("mouseup",function(e){
                g.stop(e);
         })
    },
    drag:function(e){
         var g = this, p = this.options;
         var pageX = e.pageX || e.screenX;
         var pageY = e.pageY || e.screenY;
         g.current.diffX = pageX - g.current.startX;
         g.current.diffY = pageY - g.current.startY;
           g.applydrag(e);
    },
    stop:function(e){
      $(document).unbind("mousedown");
      $(document).unbind("mousemove");
      $(document).unbind("selectstart");
    },
    applydrag:function(e){
        var g = this, p = this.options;
        if(g.current.diffX) {
           g.target.css({left:g.current.left + g.current.diffX});
        } 
        if(g.current.diffY){
            g.target.css({top:g.current.top + g.current.diffY});
        }
    }
})
})(jQuery);