(function($){
    $.fn.autoTree=function(options){
      var g=$(this),p= $.extend( $.fn.autoTree.defaults,options ||{});
        var autotree={
            create:function(data){
                data=p.data;
                autotree.treebox=$("<div class='treebox'></div>");
                g.append(autotree.treebox);
                $.each(data,function(i,item){
                    autotree.addItem(item,autotree.treebox);
                });
            },
            renderEvent:function(e){
                var e=e || window.event;
                var elem= e.target || e.srcElement;
                var childrens=$(elem).parent(".node").next(".children");
                if(childrens.css("display")=="none"){
                    $(childrens.find(".children")).each(function(){
                        $(this).hide();
                    });
                    childrens.css("display","block");
                }else {
                    childrens.css("display","none");
                };
            },
            addItem:function(item,box){
                var ditem=$("<div class='node' nodeleven=0 ></div>");
                var text=$("<span class='nodetext'></span>");
                ditem.append(text);
                var line=$("<span class='nodeline'></span>");
                if(item.icon){
                    var icon=$("<span class="+ item.icon+"></span>");
                };
                ditem.prepend(icon);
                ditem.prepend(line);
                ditem.append(text);
                text.html(item.text);
                box.append(ditem);
                if(item.children){
                    var nodesbox=$("<span class='children'></span>").css("display","none");
                    $.each(item.children,function(key,value){
                        autotree.addItem(value,nodesbox);
                    });
                    box.append(nodesbox);
                };
                if(ditem.next(".children")){
                    ditem.next(".children").find(".children").each(function(i,item){
                        ditem.next(".children").find(".children").each(function(key,value){
                            $(value).attr("nodeleven",key+1);
                            $(value).find(".node").each(function(){
                               $(this).attr("nodeleven",key+1);
                             //   $(this).prepend("<span class='nodeline'></span>");
                            });
                        });
                    }) ;
                };
/*                if(ditem.next().find(".children")){
                    alert( ditem.next().find(".children").length)
                    ditem.next().find(".children").each(function(){
                        var leven=$(this).attr("nodeleven");
                        if(leven==undefined) return;

                     //   alert(leven)
                 })

                }*/



                if(ditem.next(".children").find(".children").attr("nodeleven")){
                    ditem.next(".children").find(".children").each(function(){
                        var leven=$(this).attr("nodeleven");

                        $(this).find(".node").each(function(name,values){

                            var line1=$("<span class='nodeline'></span>");
                         //  alert(leven)
                            if(leven==undefined) return;
                           // for(var j=0;j<leven;j++){
                                $(values).prepend(line1);
                          //  }
                    })
                    });
                };

            },
            hideAllChildren:function(){
            },
            showChildren:function(){
            }
        }
      return this.each(function(e){
          autotree.create();
          $("body").click(function(){
              autotree.renderEvent(e);
          });
      });


    };
    $.fn.autoTree.defaults = {
        data:null
    };

})(jQuery);
