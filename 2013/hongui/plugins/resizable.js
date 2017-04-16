/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-26
 * Time: 下午4:46
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.resizable = function (options){
        return $.hongui.run.call(this,"resizable",options);
    };
    $.honguidefaults.resizable ={
        scope:10
    };
    $.honguimethods.resizable = {};
    $.hongui.controls.resizable = function(element,options){
        return $.hongui.controls.resizable.base.constructor.call(this,element,options);
    }
    $.hongui.controls.resizable.honguiextend($.hongui.core.uicomponent,{
        __getType:function(){
            return "resizable";
        },
        __idPrev:function(){
          return "resizable";
        },
        _extendmethods:function(){
          $.hongui.controls.resizable;
        },
        _render:function(){
            var g = this, p = this.options;
            g.set(p);
            g.stop();
            g.target = $(this.element);
            g.target.css({position:"absolute"});
            g.target.mousemove(function(e){
                  g.changecursor(e);
            }).mousedown(function(e){
                   var dir = g.getdir(e);
                  if(dir){
                    g.changecursor(e);
                    g.start(e);

                  }

             });
        },
        changecursor:function(e){
             var g = this, p = this.options;
             var dir =g.getdir(e);
                if(dir){
                   g.target.css({cursor:dir + "-resize"});
                } else{
                   g.target.css({cursor: "default"});
                }
        },
        getdir:function(e){
            var g = this, p = this.options;
            var dir = '';
            var offset = g.target.offset();
            var width = g.target.width();
            var height = g.target.height();
            var pageX = e.pageX || e.screenX;
            var pageY = e.pageY || e.screenY;
            if(pageY >= offset.top && pageY < offset.top +p.scope){
                dir +='n';
            } else if(pageY <=offset.top +height && pageY > offset.top +height - p.scope){
                dir +='s';
            }
            if(pageX >=  offset.left && pageX < offset.left + p.scope){
                dir +='w';
            }else if(pageX <= offset.left + width && pageX > offset.left + width - p.scope){
                dir +='e';
            }
            return dir;
        },
        start:function(e){
           var g = this, p = this.options;
            g.current = {
                target:g.target,
                width:g.target.width(),
                height:g.target.height(),
                left:g.target.offset().left,
                top:g.target.offset().top, 
                startX:e.pageX || e.screenX,
                startY:e.pageY || e.screenY
            }
            $(document).bind("selectstart",function(){ return false});
            $(document).bind("mouseup", function(e){
                    g.stop(e);
                })
            $(document).bind("mousemove",function(e){
                g.changecursor(e);
                g.drag(e);
            })
        },
        drag:function(e){
             var g = this, p = this.options;
           var pageX = e.pageX || e.screenX;
           var pageY = e.pageY || e.screenY;
            if(!g.current) return;
           g.current.diffX = pageX - g.current.startX;
           g.current.diffY = pageY - g.current.startY;
                 g.applyresibe(e);
        },
        applyresibe:function(e){
             var g = this, p = this.options;
               var dir = g.getdir(e);
                if(dir.indexOf("e") != -1){
                    if(g.current.diffX){
                     g.target.css({width:g.current.width +parseInt(g.current.diffX) });
                    }
                }
                if(dir.indexOf("w") != -1){
                    if(g.current.diffX){
                     g.target.css({left: g.current.left + parseInt(g.current.diffX) })
                     g.target.css({width:g.current.width - parseInt(g.current.diffX)});
                    }
                }
                  if(dir.indexOf("s")  != -1){
                    if(g.current.diffY){
                        g.target.css({height:g.current.height +  parseInt(g.current.diffY)});
                     }
                  }
                 if(dir.indexOf("n")  != -1){
                      if(g.current.diffY){
                        g.target.css({top:g.current.top + parseInt(g.current.diffY)});
                        g.target.css({height:g.current.height - parseInt(g.current.diffY)});
                      }
                  }
        },
         stop:function(e){
          $(document).unbind("selectstart");
          $(document).unbind("mousedown");
          $(document).unbind("mousemove");
         }

    })
})(jQuery);
