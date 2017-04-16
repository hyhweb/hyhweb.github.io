(function($){
    Function.prototype.honguiextend = function(parent,ext){
     //保存父类的引用

     this.base = parent.prototype ;
     this.base.constructor = parent;
     //继承父类
     var f = new Function();
     f.prototype = parent.prototype;
     this.prototype =new f();
     this.prototype.constructor = this;

     if(ext) {  $.extend(this.prototype,ext);}
    };
    $.hong=$(window);
    window.hong = $.hongui = {
        version :"1.0",
        managers:{},
        managerCount:0,
        managerPrev:"hongui",
        iframeHeight:0,
        
        getId: function(prev){
          prev = prev || this.managerPrev;
           this.managerCount++;
          id = prev + this.managerCount;

          return id;
        },

        get:function(arg,managerid){
            managerid = managerid || "hongui";
            if(typeof arg == "string" || typeof arg =="number"){
                return $.hongui.managers[arg];
            };
            if(typeof arg == "object" || arg.length){
             return $.hongui.managers.arg[0][managerid];
            };
            return null;
        },

        add:function(manager){
            if(!manager.id){
                manager.id = this.getId( manager.__idPrev())  ;
            };
            if(this.managers[manager.id]){
                
                throw new Error("已经存在");
            };
            this.managers[manager.id] = manager;
        },

        remove:function(manager){
            if(typeof manager == "string" || typeof arg == "number"){
                delete $.hongui.managers[manager];
            }else if( typeof manager == "object" && manager instanceof $.hongui.core.component){
                delete $.hongui.managers[manager.id];
            };
        },

        find:function(type){
            var arr = [];
            for(var id in this.managers){
                var manager =this.managers[id];
                if( type instanceof Function){
                    if(manager instanceof type){
                        arr.push(manager);
                    }
                }
                else if(type instanceof Array){
                    if($.inArray(manager.__getType,type)){
                        arr.push(manager);
                    }
                }else{
                    if(manager.__getType == type){
                        arr.push(manager);
                    }
                }
            }
            return arr;
        },

        run:function(plugin,arguments,ext){

           ext = $.extend({
               defaultsnamespace:"honguidefaults",
               methodsnamespace:"honguimethods",
               controlnamespace:"controls",
               haselement:true,
               managerid:"hongui",
               isstatic:false
           },ext);
           //  debugger;
           if(this == null || this == window || ext.isstatic){
               if(!$.hongui.plugins[plugin]){

                   $.hongui.plugins[plugin] = {
                       fn:$[plugin],
                       isstatic:true
                   };
               };

               return new $.hongui[ext.controlnamespace][plugin]($.extend({},$[ext.defaultsnamespace][plugin]));
           };

           if(!$.hongui.plugins[plugin]){
               $.hongui.plugins[plugin] = {
                   fn:$.fn [plugin],
                   isstatic:false
               };
           };
            this.each(function (){
                var attributes = {};

                for (var name in  $.hongui.plugins[plugin].fn.arguments ){

                   attributes =  $.hongui.plugins[plugin].fn.arguments[name];
                }
             var p = $.extend({},$[ext.defaultsnamespace][plugin] || {},attributes);
             //  this.options = p;
             if(ext.haselement){
               new $.hongui[ext.controlnamespace][plugin](this,p);
             }
            })
        },

        defaults:{},

        methods:{},

        core:{},

        controls:{},

        plugins:{}
    };

    $.honguidefaults = {};

    $.honguimethods = {};

    $.hongui.defaults =  $.honguidefaults;

    $.hongui.methods = $.honguimethods;

    $.fn.hongui=function (plugin) {
        if(plugin){
            return $.hongui.run.call(this,plugin,arguments);
        } else{
          return $.hongui.get(this);
        };
    }

    $.hongui.core.component = function (options){
        this.events = this.events || {render:this.render};
        this.options = this.options  || {};
        this.children = {};
    };

    $.extend($.hongui.core.component.prototype,{
      __getType: function () {
          return '$.hongui.core.component';
      },
        __idPrev: function () {
            return 'hongui';
        },
        set:function(arg,value){

            if(!arg) return;
            if(typeof arg == "object"){
               var tmp;
                 //debugger;
                if( this.options != arg){
                    $.extend(this.options,arg);
                    tmp =arg;

                }
                else{
                    tmp = $.extend({},arg);
                };
                if(value == undefined || value ==true){
                    for(var p in tmp){
                        if(p.indexOf('on') == 0){
                           this.set(p,tmp[p]);
                        }
                    }
                }
                if(value == undefined || value == false){
                    for(var p in tmp){
                        if(p.indexOf('on') != 0){
                            this.set(p,tmp[p]);
                        }
                    }
                }

                return;


            };
            var name= arg;
            if(name.indexOf('on')==0){
                  if(typeof value == "function"){
                    this.bind(name.substr(2),value);
                      return;
                   }  
            };
            this.trigger('propertychange',arg,value);
            if(!this.options) this.options = {};
            this.options[name] =value;
            // debugger;
            var pn = '_set' + name.substr(0,1).toUpperCase() + name.substr(1);

            if(this[pn]){
                this[pn].call(this,value);
            };
           // this.trigger('propertychanged',arg,data);
              this.trigger('propertychanged',arg,value);


        },
        get:function(name){
            var pn ='_get' + name.substr(0,1).toUpperCase() + name.substr(1);
            if(this[pn]){
                return this[pn].call(this,name);
            };
            return this.options[name];
        },
        hasbind:function(arg){
            var name = arg.toLowerCase();
            var event = this.events[name];
            if(event && event.length) {
                return true;
            };
            return false;
        },
        trigger:function(arg,data){
           // debugger;
            var name = arg.toLowerCase();
            var event = this.events[name];
            if(!event) return;
            data =data || [];
            if((data instanceof Array) == false){
                data = [data];
            }

            for(var i = 0; i < event.length;i++){
                var ev = event[i];
                if(ev.handler.apply(ev.context,data) == false){
                    return false;
                }
            };
            return  event();
           

        },
        bind:function (arg,handler,context){
            if(typeof  arg == "object") {
                for (var p in arg){
                    this.bind(p,arg[p]);
                }
                return;
            };
            if(typeof handler != "function") return;
            var name = arg.toLowerCase();
            var event =this.events[name];
            context  = context || this;
            event.push({handler:handler,context:context});
            this.events[name] = event;

        },
        unbind:function(arg,handler){
            if(!arg){
                this.events = {};
                return;
            };
            var name = arg.toLowerCase();
            var event = this.events[name];
            if(!event || !event.length ){ return;};
            if(!handler){
                delete this.events[name];
            }
            else{
             for(var i =0;i < event.length; i++){
                 if(event[i].handler == handler){
                     event.splice(i,1);
                     break;
                 }
             }
            }
        },
        destroy:function(){
            $.hongui.remove(this);
        }

    });
    $.hongui.core.uicomponent = function(element,options) {
        $.hongui.core.uicomponent.base.constructor.call(this,options);
        var extendmethods =this._extendmethods();
        this.element = element;
        this._init();
        this.options = options;
      //  this.trigger('render');

        // debugger;
        this._render();

    };

    $.hongui.core.uicomponent.honguiextend($.hongui.core.component,{

        _init:function (){
           $.hongui.add(this);
             this.options = this.element.options;
            if(!this.element) return;
             this.bind("render");
        },

        _render: function (){},
        _rendered:function(){
            if(this.element){
                $(this.element).attr("hongui",this.id);
            }
        },
        attr: function ()
        {
            return [];
        },
        destroy:function(){
              if(this.element) $(this.element).remove();
            this.options=null;
            $.hongui.remove(this);
        }
    });

    $.hongui.controls.input = function (element,options) {
       $.hongui.controls.input.base.constructor.call(this,element,options);
    } ;
   $.hongui.controls.input.honguiextend($.hongui.core.uicomponent,{
       __getType: function (){
          return "$.hongui.controls.input";
        },
        attr: function (){
            return "nulltext";
        },
       setValue:function (value){
          return this.set("value",value);
        },
       getValue:function() {
           return this.get("value");
       },
       setEnabled:function(){
          return this.set("disabled",false);
       },
       setDisabled:function(){
           return this.set("disabled",true);
       },
       updateStyle:function() {
           
       }

   });

$.hongui.win = {
    top:false,
    mask:function (win){
        function setHeight(){
            if(!this.windowmask) return;
            var h =$(window).height()+$(window).scrollTop();
            $.hongui.win.windowmask.height(h);
        };
        if(!this.windowmask){
            this.windowmask = $("<div class='windowmask' style='display: block;'></div>").appendTo("body");
            $(window).bind("resize",setHeight());
            $(window).bind("scroll",setHeight());
        };
            this.windowmask.show();
            setHeight();
            this.masking = true;

    },
    unmak: function (){
        var jwins = $("body > .dialog:visible,body > .window:visible");
        for(var i = 0;i < jwins.length ; i++){
            var winid = jwins.eq(i).attr("honguiid");
            var winmanager = $.hongui.get(winid);
            if(win && win.id == winid) continue;

            var modal =winmanager.get("modal");
            if(modal) return;
        };
        if(this.windowmask){
            this.windowmask.hide();
        }
        this.masking = false;
    },
    createTaskbar:function (){
        if(!this.taskbar){
            this.taskbar = $('<div class="taskbar-tasks"><div class="clear"></div></div>').appendTo("body");
            if(this.top) this.taskbar.addClass("taskbar-top");
            this.taskbar.tasks = $("taskbar-tasks:first",this.taskbar);
            this.tasks = {};
        }
        this.taskbar.show();
        this.taskbar.animate({bottom:0});
        return this.taskbar;
    },
    removeTaskbar: function(){
       var self =this;
        self.taskbar.animate({bottom:-100},function(){self.taskbar.remove();self.taskbar = null});
    },
    activeTask:function(win){
        for(var winid in this.tasks){
            var t = this.tasks[winid];
            if(winid == win.id){
                t.addClass("taskbar-task-active");
            }
            else{
                t.removeClass("taskbar-task-active");
            }
        }
    },
    getTask:function(win){
        var self = this;
        if(!self.taskbar) return;
        if(self.tasks[win.id]) return self.tasks[win.id];
        return null;
    },
    addTask:function(win){
        var self = this;
        if(!self.taskbar) self.createTaskbar();
        if(self.tasks[win.id]) return self.tasks[win.id];
        var title = win.get('title');
        var task = self.tasks[win.id] = $('<div class="taskbar-task"><div class="taskbar-task-icon"><div class="taskbar-task-content">'+title+'</div></div></div>');
        self.taskbar.tasks.append(task);
        self.active(win);
        task.bind('click',function(){
            self.activeTask(win);
            if(win.actived)
            win.min()
            else
            win.active();

        }).hover(function(){
                $(this).addClass("taskbar-task-over");
            },function(){
                 $(this).removeClass("taskbar-task-over");
            });
        return task;
    },
    hasTask:function(){
        for(var p in this.tasks){
            if(this.tasks[p])
            return true;
        }
        return false;
    },
    removeTask:function(win){
        var self = this;
        if(!self.taskbar)  return;
        if(self.tasks[win.id]){
            self.tasks[win.id].unbind();
            self.tasks[win.id].remove();
            delete selft.tasks[win.id];
        };
        if(!self.hasTask()){
            self.removeTaskbar();
        }
    },
    setFront:function(win){
        var wins = $.hongui.find($.hongui.core.Win);
        for(var i in wins){
            var w = wins[i];
            if(w == win){
                $(w.element).css("z-index","9200");
                this.activeTask(w);
            }
            else{
                $(w.element).css("z-index","9100");
            }
        }
    }

};
$.hongui.core.Win =function (element,options){
    $.hongui.core.Win.base.constructor.call(this,element,options);
};
$.hongui.core.Win.honguiextend($.hongui.core.uicomponent,{
    __getType: function(){
        return "$.hongui.controls.Win";
    },
    mask:function(){
        if(this.options.modal){
            $.hongui.win.mask(this);
        }
    },
    unmask:function(){
        if(this.options.modal){
            $.hongui.unmask(this);
        }
    },
    min:function(){},
    max:function(){},
    active:function(){}
});
$.hongui.draggable = {
    dragging:false
};
$.hongui.resizable = {
    dragging:false
};

   $.hongui.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o)
    {
        var f = function (n)
        {
            return n < 10 ? '0' + n : n;
        },
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		quote = function (value)
		{
		    escapable.lastIndex = 0;
		    return escapable.test(value) ?
				'"' + value.replace(escapable, function (a)
				{
				    var c = meta[a];
				    return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' :
				'"' + value + '"';
		};
        if (o === null) return 'null';
        var type = typeof o;
        if (type === 'undefined') return undefined;
        if (type === 'string') return quote(o);
        if (type === 'number' || type === 'boolean') return '' + o;
        if (type === 'object')
        {
            if (typeof o.toJSON === 'function')
            {
                return $.hongui.toJSON(o.toJSON());
            }
            if (o.constructor === Date)
            {
                return isFinite(this.valueOf()) ?
                   this.getUTCFullYear() + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate()) + 'T' +
                 f(this.getUTCHours()) + ':' +
                 f(this.getUTCMinutes()) + ':' +
                 f(this.getUTCSeconds()) + 'Z' : null;
            }
            var pairs = [];
            if (o.constructor === Array)
            {
                for (var i = 0, l = o.length; i < l; i++)
                {
                    pairs.push($.hongui.toJSON(o[i]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }
            var name, val;
            for (var k in o)
            {
                type = typeof k;
                if (type === 'number')
                {
                    name = '"' + k + '"';
                } else if (type === 'string')
                {
                    name = quote(k);
                } else
                {
                    continue;
                }
                type = typeof o[k];
                if (type === 'function' || type === 'undefined')
                {
                    continue;
                }
                val = $.hongui.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };



    

})(jQuery);
